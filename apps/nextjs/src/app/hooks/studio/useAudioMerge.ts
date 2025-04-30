"use client";

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

      // Sort actors by their original order (assuming the order in the array is the intended sequence)
      const sortedActors = [...actorsWithAudio];

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

    // First, decode all audio buffers
    for (const actor of sortedActors) {
      if (!actor.audioBlob) continue;
      const arrayBuffer = await actor.audioBlob.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      audioBuffers.push(audioBuffer);
      volumes.push(actor.muted ? 0 : actor.volume);
    }

    // Calculate the start times for each actor based on the previous actor's end time
    const startTimes: number[] = [];
    let currentTime = 0;

    for (let i = 0; i < sortedActors.length; i++) {
      if (i === 0) {
        // First actor always starts at 0
        startTimes.push(0);
        currentTime = audioBuffers[0].duration * 1000; // Convert to ms
      } else {
        // Calculate when this actor should start based on previous actor's end time
        const previousEndTime =
          startTimes[i - 1] + audioBuffers[i - 1].duration * 1000;

        // Apply the delay (can be negative for overlap)
        const delay = sortedActors[i].delay;
        const startTime = previousEndTime + delay;

        // Ensure we don't have a negative start time
        startTimes.push(Math.max(0, startTime));

        // Update current time to the end of this actor's audio
        currentTime = startTimes[i] + audioBuffers[i].duration * 1000;
      }
    }

    // Convert start times from ms to seconds
    const startTimesInSeconds = startTimes.map((time) => time / 1000);

    // Calculate total length needed for the merged buffer
    const totalDuration = Math.max(
      ...startTimesInSeconds.map(
        (startTime, i) => startTime + audioBuffers[i].duration,
      ),
    );

    const sampleRate = audioBuffers[0].sampleRate;
    const numberOfChannels = audioBuffers[0].numberOfChannels;

    // Create buffer with enough space for all audio
    const totalLengthInSamples = Math.ceil(totalDuration * sampleRate);
    const mergedBuffer = audioContext.createBuffer(
      numberOfChannels,
      totalLengthInSamples,
      sampleRate,
    );

    // Mix all audio at their respective positions
    for (let i = 0; i < audioBuffers.length; i++) {
      const buffer = audioBuffers[i];
      const volume = volumes[i];
      const startSample = Math.floor(startTimesInSeconds[i] * sampleRate);

      for (let channel = 0; channel < numberOfChannels; channel++) {
        const mergedChannelData = mergedBuffer.getChannelData(channel);
        const bufferChannelData = buffer.getChannelData(channel);

        for (let j = 0; j < bufferChannelData.length; j++) {
          if (
            startSample + j >= 0 &&
            startSample + j < mergedChannelData.length
          ) {
            mergedChannelData[startSample + j] +=
              bufferChannelData[j] * volume * masterVolume;
          }
        }
      }
    }

    // Normalize audio to prevent clipping
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

  const mergeWithOverlap = async (
    sortedActors: ActorSection[],
    audioContext: AudioContext,
    overlapDuration: number,
  ): Promise<Blob> => {
    // For the overlap mode, we'll use the same sequential logic but with the specified overlap duration
    const audioBuffers: AudioBuffer[] = [];
    const volumes: number[] = [];

    // First, decode all audio buffers
    for (const actor of sortedActors) {
      if (!actor.audioBlob) continue;
      const arrayBuffer = await actor.audioBlob.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      audioBuffers.push(audioBuffer);
      volumes.push(actor.muted ? 0 : actor.volume);
    }

    // Calculate the start times for each actor based on the previous actor's end time
    const startTimes: number[] = [];
    let currentTime = 0;

    for (let i = 0; i < sortedActors.length; i++) {
      if (i === 0) {
        // First actor always starts at 0
        startTimes.push(0);
        currentTime = audioBuffers[0].duration * 1000; // Convert to ms
      } else {
        // Calculate when this actor should start based on previous actor's end time
        const previousEndTime =
          startTimes[i - 1] + audioBuffers[i - 1].duration * 1000;

        // Apply the delay (can be negative for overlap) or use the specified overlap
        const delay =
          sortedActors[i].delay !== 0
            ? sortedActors[i].delay
            : -overlapDuration;
        const startTime = previousEndTime + delay;

        // Ensure we don't have a negative start time
        startTimes.push(Math.max(0, startTime));

        // Update current time to the end of this actor's audio
        currentTime = startTimes[i] + audioBuffers[i].duration * 1000;
      }
    }

    // Convert start times from ms to seconds
    const startTimesInSeconds = startTimes.map((time) => time / 1000);

    // Calculate total length needed for the merged buffer
    const totalDuration = Math.max(
      ...startTimesInSeconds.map(
        (startTime, i) => startTime + audioBuffers[i].duration,
      ),
    );

    const sampleRate = audioBuffers[0].sampleRate;
    const numberOfChannels = audioBuffers[0].numberOfChannels;

    // Create buffer with enough space for all audio
    const totalLengthInSamples = Math.ceil(totalDuration * sampleRate);
    const mergedBuffer = audioContext.createBuffer(
      numberOfChannels,
      totalLengthInSamples,
      sampleRate,
    );

    // Mix all audio at their respective positions
    for (let i = 0; i < audioBuffers.length; i++) {
      const buffer = audioBuffers[i];
      const volume = volumes[i];
      const startSample = Math.floor(startTimesInSeconds[i] * sampleRate);

      for (let channel = 0; channel < numberOfChannels; channel++) {
        const mergedChannelData = mergedBuffer.getChannelData(channel);
        const bufferChannelData = buffer.getChannelData(channel);

        for (let j = 0; j < bufferChannelData.length; j++) {
          if (
            startSample + j >= 0 &&
            startSample + j < mergedChannelData.length
          ) {
            mergedChannelData[startSample + j] +=
              bufferChannelData[j] * volume * masterVolume;
          }
        }
      }
    }

    // Normalize audio to prevent clipping
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
