import { useCallback, useEffect, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";

// Reduce chunk duration to keep WAV files under Vercel's 4.5MB limit
const CHUNK_DURATION = 30; // Reduced from 60 to 30 seconds

// Modified splitAudioBuffer to create mono audio
function splitAudioBuffer(buffer: AudioBuffer): AudioBuffer[] {
  const chunks: AudioBuffer[] = [];
  const chunkSamples = CHUNK_DURATION * buffer.sampleRate;
  const totalChunks = Math.ceil(buffer.length / chunkSamples);

  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSamples;
    const end = Math.min((i + 1) * chunkSamples, buffer.length);

    // Create mono buffer instead of multi-channel
    const chunkBuffer = new AudioContext().createBuffer(
      1, // MONO
      end - start,
      buffer.sampleRate,
    );

    // Mix down all channels to mono
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
}
async function validateChunkSize(wavBlob: Blob) {
  if (wavBlob.size > 4 * 1024 * 1024) {
    throw new Error(
      `Chunk size ${wavBlob.size} exceeds Vercel limit. Reduce chunk duration.`,
    );
  }
}
async function transcribeAudioChunk(chunk: Blob): Promise<string> {
  const formData = new FormData();
  formData.append("file", chunk, "chunk.wav");

  const response = await fetch("/api/live-transcription", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error(await response.text());

  const result = await response.json();
  return result.transcription;
}

export function useWebcamRecorder(userId: string | undefined) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const [timer, setTimer] = useState(0);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [isProcessingWhisper, setIsProcessingWhisper] = useState(false);
  const [whisperTranscription, setWhisperTranscription] = useState<
    string | null
  >(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTimerUpdateRef = useRef<number>(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedWebcam, setSelectedWebcam] = useState<string | null>(null);
  const [selectedMicrophone, setSelectedMicrophone] = useState<string | null>(
    null,
  );
  const [isRendering, setIsRendering] = useState(false);
  useEffect(() => {
    const constraints = {
      audio: selectedMicrophone
        ? { deviceId: { exact: selectedMicrophone } }
        : true,
      video: selectedWebcam ? { deviceId: { exact: selectedWebcam } } : true,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        setStream(mediaStream);
      })
      .catch((error) => {
        console.error("Webcam access error:", error);
      });

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [selectedMicrophone, selectedWebcam]);

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    lastTimerUpdateRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastTimerUpdateRef.current;
      setTimer((prevTimer) => prevTimer + Math.floor(elapsed / 1000));
      lastTimerUpdateRef.current = now;
    }, 1000);
  }, []);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  const resumeTimer = useCallback(() => {
    lastTimerUpdateRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastTimerUpdateRef.current;
      setTimer((prevTimer) => prevTimer + Math.floor(elapsed / 1000));
      lastTimerUpdateRef.current = now;
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setTimer(0);
  }, []);

  const startRecording = useCallback(() => {
    setIsRecording(true);
    setIsPaused(false);
    setTimer(0);
    startTimer();

    const constraints = {
      audio: selectedMicrophone
        ? { deviceId: { exact: selectedMicrophone } }
        : true,
      video: selectedWebcam ? { deviceId: { exact: selectedWebcam } } : true,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        setStream(mediaStream);
        mediaRecorderRef.current = new MediaRecorder(mediaStream, {
          mimeType: "video/webm",
        });
        recordingChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          recordingChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
          const recordingBlob = new Blob(recordingChunksRef.current, {
            type: "video/webm",
          });
          setRecordingBlob(recordingBlob);
          const recordingUrl = URL.createObjectURL(recordingBlob);
          setRecordingUrl(recordingUrl);
        };

        mediaRecorderRef.current.start();
      })
      .catch((error) => {
        console.error("Webcam and microphone access error: ", error);
        alert("Webcam and microphone access is required to record.");
        setIsRecording(false);
        stopTimer();
      });
  }, [selectedWebcam, selectedMicrophone, startTimer]);

  const pauseRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      pauseTimer();
    }
  }, [pauseTimer]);

  const resumeRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "paused"
    ) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      resumeTimer();
    }
  }, [resumeTimer]);

  const stopRecording = useCallback(async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      stopTimer();
      setIsRendering(true);

      await new Promise<void>((resolve) => {
        mediaRecorderRef.current!.onstop = async () => {
          const recordingBlob = new Blob(recordingChunksRef.current, {
            type: "video/webm",
          });

          // Immediately create and set video URL
          setRecordingBlob(recordingBlob);
          const videoUrl = URL.createObjectURL(recordingBlob);
          setRecordingUrl(videoUrl);
          setIsRendering(false);

          // Process audio separately after video is rendered
          const processAudio = async () => {
            setIsProcessingWhisper(true);
            try {
              const audioContext = new AudioContext();
              const audioBuffer = await audioContext.decodeAudioData(
                await recordingBlob.arrayBuffer(),
              );

              const audioChunks = splitAudioBuffer(audioBuffer);
              let fullTranscription = "";

              for (const chunk of audioChunks) {
                const wavBlob = await audioBufferToWav(chunk);
                await validateChunkSize(wavBlob); // Check size before sending

                // Add random prefix to avoid cached responses
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
          };
          // Start audio processing without blocking video rendering
          processAudio();
          resolve();
        };
      });
    }
  }, [stopTimer]);

  const uploadToVercelBlob = useCallback(
    async (blob: Blob, customName: string) => {
      try {
        // Sanitize the custom name to remove invalid characters
        const sanitizedName = customName.replace(/[^a-zA-Z0-9]/g, "_");
        const filename = `RecordedWebcam/${userId}/${sanitizedName}.mp4`;

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
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const convertToMP3 = async (audioBuffer: AudioBuffer): Promise<Blob> => {
    // This is a placeholder. You'll need to implement MP3 encoding.
    // Consider using a library like lamejs for client-side MP3 encoding.
    // For now, we'll just return the audio as a WAV file.
    const wavBlob = await audioBufferToWav(audioBuffer);
    return new Blob([wavBlob], { type: "audio/wav" });
  };

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

  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  return {
    isRecording,
    recordingUrl,
    recordingBlob,
    timer,
    uploadUrl,
    isProcessingWhisper,
    startRecording,
    whisperTranscription,
    stopRecording,
    uploadToVercelBlob,
    selectedWebcam,
    setSelectedWebcam,
    selectedMicrophone,
    setSelectedMicrophone,
    stream,
    pauseRecording,
    resumeRecording,
    isPaused,
    isRendering,
    setWhisperTranscription,
    setIsProcessingWhisper,
  };
}
