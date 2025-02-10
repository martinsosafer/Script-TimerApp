import { useCallback, useEffect, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";

// Constants
const CHUNK_DURATION = 30; // 30 seconds per chunk (to stay under Vercel's 4.5MB limit)
const MAX_FILE_SIZE = 4.5 * 1024 * 1024; // 4.5MB in bytes

export function useAudioRecorder(
  userId: string | undefined,
  audioDurationLimit: number,
) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [timer, setTimer] = useState(0);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [isProcessingWhisper, setIsProcessingWhisper] = useState(false);
  const [whisperTranscription, setWhisperTranscription] = useState<
    string | null
  >(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTimerUpdateRef = useRef<number>(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedMicrophone, setSelectedMicrophone] = useState<string | null>(
    null,
  );

  // Utility to split audio into chunks
  const splitAudioBuffer = (buffer: AudioBuffer): AudioBuffer[] => {
    const chunks: AudioBuffer[] = [];
    const chunkSamples = CHUNK_DURATION * buffer.sampleRate;
    const totalChunks = Math.ceil(buffer.length / chunkSamples);

    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSamples;
      const end = Math.min((i + 1) * chunkSamples, buffer.length);
      const chunkBuffer = new AudioContext().createBuffer(
        1, // Mono audio
        end - start,
        buffer.sampleRate,
      );

      // Mix down to mono
      const mixedData = new Float32Array(end - start);
      for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
        const channelData = buffer.getChannelData(channel).subarray(start, end);
        for (let j = 0; j < channelData.length; j++) {
          mixedData[j] += channelData[j];
        }
      }

      // Normalize and copy to mono channel
      const monoChannel = chunkBuffer.getChannelData(0);
      for (let j = 0; j < mixedData.length; j++) {
        monoChannel[j] = mixedData[j] / buffer.numberOfChannels;
      }

      chunks.push(chunkBuffer);
    }

    return chunks;
  };

  // Convert AudioBuffer to WAV Blob
  const audioBufferToWav = (buffer: AudioBuffer): Promise<Blob> => {
    return new Promise((resolve) => {
      const numberOfChannels = buffer.numberOfChannels;
      const sampleRate = buffer.sampleRate;
      const length = buffer.length * numberOfChannels * 2;
      const data = new DataView(new ArrayBuffer(44 + length));

      // WAV header
      writeString(data, 0, "RIFF");
      data.setUint32(4, 36 + length, true);
      writeString(data, 8, "WAVE");
      writeString(data, 12, "fmt ");
      data.setUint32(16, 16, true);
      data.setUint16(20, 1, true);
      data.setUint16(22, numberOfChannels, true);
      data.setUint32(24, sampleRate, true);
      data.setUint32(28, sampleRate * numberOfChannels * 2, true);
      data.setUint16(32, numberOfChannels * 2, true);
      data.setUint16(34, 16, true);
      writeString(data, 36, "data");
      data.setUint32(40, length, true);

      // WAV data
      let offset = 44;
      for (let i = 0; i < buffer.length; i++) {
        for (let channel = 0; channel < numberOfChannels; channel++) {
          const sample = buffer.getChannelData(channel)[i];
          data.setInt16(
            offset,
            sample < 0 ? sample * 0x8000 : sample * 0x7fff,
            true,
          );
          offset += 2;
        }
      }

      resolve(new Blob([data], { type: "audio/wav" }));
    });
  };

  // Utility to write strings to DataView
  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  // Transcribe a single audio chunk
  const transcribeAudioChunk = async (chunk: Blob): Promise<string> => {
    const formData = new FormData();
    formData.append("file", chunk, "chunk.wav");

    const response = await fetch("/api/live-transcription", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error(await response.text());

    const result = await response.json();
    return result.transcription;
  };

  // Start recording
  const startRecording = useCallback(() => {
    setIsRecording(true);
    setIsPaused(false);
    setTimer(0);
    startTimer();

    const constraints = {
      audio: selectedMicrophone
        ? { deviceId: { exact: selectedMicrophone } }
        : true,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        setStream(mediaStream);
        mediaRecorderRef.current = new MediaRecorder(mediaStream, {
          mimeType: "audio/webm",
        });
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });
          setAudioBlob(audioBlob);
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(audioUrl);
        };

        mediaRecorderRef.current.start();
      })
      .catch((error) => {
        console.error("Microphone access error: ", error);
        alert("Microphone access is required to record audio.");
        setIsRecording(false);
        stopTimer();
      });
  }, [selectedMicrophone, startTimer]);

  // Stop recording and process audio
  const stopRecording = useCallback(async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      stopTimer();

      await new Promise<void>((resolve) => {
        mediaRecorderRef.current!.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });
          setAudioBlob(audioBlob);
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(audioUrl);

          setIsProcessingWhisper(true);
          try {
            const audioContext = new AudioContext();
            const audioBuffer = await audioContext.decodeAudioData(
              await audioBlob.arrayBuffer(),
            );

            const audioChunks = splitAudioBuffer(audioBuffer);
            let fullTranscription = "";

            for (const chunk of audioChunks) {
              const wavBlob = await audioBufferToWav(chunk);
              if (wavBlob.size > MAX_FILE_SIZE) {
                throw new Error(
                  `Chunk size ${wavBlob.size} exceeds Vercel limit.`,
                );
              }
              const chunkTranscription = await transcribeAudioChunk(wavBlob);
              fullTranscription += chunkTranscription + " ";
            }

            setWhisperTranscription(fullTranscription.trim());
          } catch (error) {
            console.error("Audio processing failed:", error);
            alert(`Processing error: ${error.message}`);
          } finally {
            setIsProcessingWhisper(false);
          }

          resolve();
        };
      });
    }
  }, [stopTimer]);

  // Upload to Vercel Blob
  const uploadToVercelBlob = useCallback(
    async (blob: Blob, customName: string) => {
      try {
        const sanitizedName = customName.replace(/[^a-zA-Z0-9]/g, "_");
        const filename = `RecordedAudio/${userId}/${sanitizedName}.mp4`;

        const uploadedFile = await upload(filename, blob, {
          access: "public",
          handleUploadUrl: "/api/uploadspeech",
        });

        setUploadUrl(uploadedFile.url);
        return uploadedFile.url;
      } catch (error) {
        console.error("Error uploading to Vercel Blob:", error);
        alert("Failed to upload recording. Please try again.");
        return null;
      }
    },
    [userId],
  );

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Stop recording if duration limit is reached
  useEffect(() => {
    if (isRecording && !isPaused && timer >= audioDurationLimit) {
      stopRecording();
    }
  }, [timer, isRecording, isPaused, audioDurationLimit, stopRecording]);

  return {
    isRecording,
    audioUrl,
    audioBlob,
    timer,
    uploadUrl,
    isProcessingWhisper,
    startRecording,
    whisperTranscription,
    stopRecording,
    uploadToVercelBlob,
    selectedMicrophone,
    setSelectedMicrophone,
    stream,
    pauseRecording,
    resumeRecording,
    isPaused,
    setWhisperTranscription,
    setIsProcessingWhisper,
  };
}
