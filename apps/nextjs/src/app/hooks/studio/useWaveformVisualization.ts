import { useRef } from "react";

export function useWaveformVisualization() {
  const waveformCanvasRefs = useRef<Record<string, HTMLCanvasElement | null>>(
    {},
  );
  const mergedWaveformCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawWaveform = async (
    actorId: string,
    audioBlob: Blob,
    color: string = "#4f46e5",
  ) => {
    const canvas = waveformCanvasRefs.current[actorId];
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const width = canvas.width;
    const height = canvas.height;
    const channelData = audioBuffer.getChannelData(0);
    const step = Math.ceil(channelData.length / width);

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;

    for (let i = 0; i < width; i++) {
      const start = Math.floor(i * step);
      const end = Math.floor((i + 1) * step);
      let min = channelData[start];
      let max = channelData[start];

      for (let j = start; j < end; j++) {
        if (channelData[j] < min) min = channelData[j];
        if (channelData[j] > max) max = channelData[j];
      }

      const barHeight = ((Math.abs(min) + Math.abs(max)) * height) / 2;
      ctx.fillRect(i, (height - barHeight) / 2, 1, barHeight);
    }
  };

  const drawMergedWaveform = async (audioBlob: Blob) => {
    const canvas = mergedWaveformCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const width = canvas.width;
    const height = canvas.height;
    const channelData = audioBuffer.getChannelData(0);
    const step = Math.ceil(channelData.length / width);

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#22c55e";

    for (let i = 0; i < width; i++) {
      const start = Math.floor(i * step);
      const end = Math.floor((i + 1) * step);
      let min = channelData[start];
      let max = channelData[start];

      for (let j = start; j < end; j++) {
        if (channelData[j] < min) min = channelData[j];
        if (channelData[j] > max) max = channelData[j];
      }

      const barHeight = ((Math.abs(min) + Math.abs(max)) * height) / 2;
      ctx.fillRect(i, (height - barHeight) / 2, 1, barHeight);
    }
  };

  return {
    waveformCanvasRefs,
    mergedWaveformCanvasRef,
    drawWaveform,
    drawMergedWaveform,
  };
}
