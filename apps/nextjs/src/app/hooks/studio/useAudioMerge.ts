import { useState } from "react";

import type { ActorSection, MergeType } from "~/constants/types/voice";

interface UseAudioMergeProps {
  actors: ActorSection[];
  masterVolume: number;
}

export function useAudioMerge({ actors, masterVolume }: UseAudioMergeProps) {
  const [isMergingAudio, setIsMergingAudio] = useState(false);
  const [mergedAudioUrl, setMergedAudioUrl] = useState<string | null>(null);

  const mergeAudioFiles = async (
    mergeType: MergeType,
    overlapDuration: number,
    onWaveformReady?: (blob: Blob) => void,
  ) => {
    const actorsWithAudio = actors.filter((actor) => actor.audioBlob);
    if (actorsWithAudio.length < 2) {
      console.error("Need at least two audio files to merge");
      return null;
    }

    setIsMergingAudio(true);

    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();

      const sortedActors = [...actorsWithAudio].sort(
        (a, b) => a.delay - b.delay,
      );

      let result: Blob;
      if (mergeType === "sequential") {
        result = await mergeSequential(sortedActors, audioContext);
      } else {
        result = await mergeWithOverlap(
          sortedActors,
          audioContext,
          overlapDuration,
        );
      }

      if (mergedAudioUrl) URL.revokeObjectURL(mergedAudioUrl);
      const url = URL.createObjectURL(result);
      setMergedAudioUrl(url);

      if (onWaveformReady) {
        setTimeout(() => {
          onWaveformReady(result);
        }, 500);
      }

      return url;
    } catch (error) {
      console.error("Error merging audio:", error);
      return null;
    } finally {
      setIsMergingAudio(false);
    }
  };

  const mergeSequential = async (
    sortedActors: ActorSection[],
    audioContext: AudioContext,
  ): Promise<Blob> => {
    const audioBuffers: AudioBuffer[] = [];
    const volumes: number[] = [];

    for (const actor of sortedActors) {
      if (!actor.audioBlob) continue;
      const arrayBuffer = await actor.audioBlob.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      audioBuffers.push(audioBuffer);
      volumes.push(actor.muted ? 0 : actor.volume);
    }

    let totalLength = 0;
    for (let i = 0; i < sortedActors.length; i++) {
      if (i === 0) {
        totalLength += audioBuffers[i].duration;
      } else {
        const delayInSeconds =
          (sortedActors[i].delay - sortedActors[i - 1].delay) / 1000;
        totalLength += Math.max(0, delayInSeconds) + audioBuffers[i].duration;
      }
    }

    const sampleRate = audioBuffers[0].sampleRate;
    const numberOfChannels = audioBuffers[0].numberOfChannels;

    const mergedBuffer = audioContext.createBuffer(
      numberOfChannels,
      totalLength * sampleRate,
      sampleRate,
    );

    let offset = 0;
    for (let i = 0; i < audioBuffers.length; i++) {
      const buffer = audioBuffers[i];
      const volume = volumes[i];

      if (i > 0) {
        const delayInSeconds =
          (sortedActors[i].delay - sortedActors[i - 1].delay) / 1000;
        if (delayInSeconds > 0) {
          offset += delayInSeconds * sampleRate;
        }
      }

      for (let channel = 0; channel < numberOfChannels; channel++) {
        const mergedChannelData = mergedBuffer.getChannelData(channel);
        const bufferChannelData = buffer.getChannelData(channel);

        for (let j = 0; j < bufferChannelData.length; j++) {
          mergedChannelData[j + offset] =
            bufferChannelData[j] * volume * masterVolume;
        }
      }

      offset += buffer.length;
    }

    return finalizeMergedAudio(mergedBuffer);
  };

  const mergeWithOverlap = async (
    sortedActors: ActorSection[],
    audioContext: AudioContext,
    overlapDuration: number,
  ): Promise<Blob> => {
    const audioBuffers: AudioBuffer[] = [];
    const volumes: number[] = [];
    const delays: number[] = [];

    for (const actor of sortedActors) {
      if (!actor.audioBlob) continue;
      const arrayBuffer = await actor.audioBlob.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      audioBuffers.push(audioBuffer);
      volumes.push(actor.muted ? 0 : actor.volume);
      delays.push(actor.delay);
    }

    let maxEndTime = 0;
    for (let i = 0; i < audioBuffers.length; i++) {
      const endTime = delays[i] / 1000 + audioBuffers[i].duration;
      if (endTime > maxEndTime) {
        maxEndTime = endTime;
      }
    }

    const sampleRate = audioBuffers[0].sampleRate;
    const numberOfChannels = audioBuffers[0].numberOfChannels;

    const mergedBuffer = audioContext.createBuffer(
      numberOfChannels,
      maxEndTime * sampleRate,
      sampleRate,
    );

    for (let i = 0; i < audioBuffers.length; i++) {
      const buffer = audioBuffers[i];
      const volume = volumes[i];
      const delayInSamples = Math.floor((delays[i] / 1000) * sampleRate);

      for (let channel = 0; channel < numberOfChannels; channel++) {
        const mergedChannelData = mergedBuffer.getChannelData(channel);
        const bufferChannelData = buffer.getChannelData(channel);

        for (let j = 0; j < bufferChannelData.length; j++) {
          mergedChannelData[j + delayInSamples] +=
            bufferChannelData[j] * volume * masterVolume;
        }
      }
    }

    for (let channel = 0; channel < numberOfChannels; channel++) {
      const mergedChannelData = mergedBuffer.getChannelData(channel);
      let max = 0;

      for (let i = 0; i < mergedChannelData.length; i++) {
        const abs = Math.abs(mergedChannelData[i]);
        if (abs > max) {
          max = abs;
        }
      }

      if (max > 1) {
        const gain = 0.9 / max;
        for (let i = 0; i < mergedChannelData.length; i++) {
          mergedChannelData[i] *= gain;
        }
      }
    }

    return finalizeMergedAudio(mergedBuffer);
  };

  const finalizeMergedAudio = async (
    mergedBuffer: AudioBuffer,
  ): Promise<Blob> => {
    const offlineContext = new OfflineAudioContext(
      mergedBuffer.numberOfChannels,
      mergedBuffer.length,
      mergedBuffer.sampleRate,
    );

    const source = offlineContext.createBufferSource();
    source.buffer = mergedBuffer;
    source.connect(offlineContext.destination);
    source.start(0);

    const renderedBuffer = await offlineContext.startRendering();
    return bufferToWave(renderedBuffer, renderedBuffer.length);
  };

  const bufferToWave = (abuffer: AudioBuffer, len: number): Blob => {
    const numOfChan = abuffer.numberOfChannels;
    const length = len * numOfChan * 2 + 44;
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);
    let i;
    let sample;
    let offset = 0;
    let pos = 0;

    setUint32(0x46464952);
    setUint32(length - 8);
    setUint32(0x45564157);
    setUint32(0x20746d66);
    setUint32(16);
    setUint16(1);
    setUint16(numOfChan);
    setUint32(abuffer.sampleRate);
    setUint32(abuffer.sampleRate * 2 * numOfChan);
    setUint16(numOfChan * 2);
    setUint16(16);
    setUint32(0x61746164);
    setUint32(length - pos - 4);

    const channels = [];
    for (i = 0; i < abuffer.numberOfChannels; i++) {
      channels.push(abuffer.getChannelData(i));
    }

    while (pos < length) {
      for (i = 0; i < numOfChan; i++) {
        sample = Math.max(-1, Math.min(1, channels[i][offset]));
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
        view.setInt16(pos, sample, true);
        pos += 2;
      }
      offset++;
    }

    function setUint16(data: number) {
      view.setUint16(pos, data, true);
      pos += 2;
    }

    function setUint32(data: number) {
      view.setUint32(pos, data, true);
      pos += 4;
    }

    return new Blob([buffer], { type: "audio/wav" });
  };

  const cleanupMergedAudio = () => {
    if (mergedAudioUrl) {
      URL.revokeObjectURL(mergedAudioUrl);
      setMergedAudioUrl(null);
    }
  };

  return {
    isMergingAudio,
    mergedAudioUrl,
    mergeAudioFiles,
    cleanupMergedAudio,
  };
}
