import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@voiceai/ui/@/components/ui/select";

interface DeviceSelectorProps {
  kind: "videoinput" | "audioinput";
  onDeviceChange: (deviceId: string) => void;
}

export function DeviceSelector({ kind, onDeviceChange }: DeviceSelectorProps) {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    async function getDevices() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      setDevices(devices.filter((device) => device.kind === kind));
    }
    getDevices();
  }, [kind]);

  return (
    <Select onValueChange={onDeviceChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue
          placeholder={
            kind === "videoinput" ? "Select webcam" : "Select microphone"
          }
        />
      </SelectTrigger>
      <SelectContent>
        {devices.map((device) => (
          <SelectItem key={device.deviceId} value={device.deviceId}>
            {device.label ||
              `${kind === "videoinput" ? "Webcam" : "Microphone"} ${devices.indexOf(device) + 1}`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
