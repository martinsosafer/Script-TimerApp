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
        <div className="w-full overflow-hidden">
          <SelectValue
            className="block w-full truncate"
            placeholder={
              kind === "videoinput" ? "Select webcam" : "Select microphone"
            }
          />
        </div>
      </SelectTrigger>
      <SelectContent>
        {devices.map((device) => (
          <SelectItem
            key={device.deviceId}
            value={device.deviceId}
            className="max-w-[180px] truncate"
          >
            {device.label ||
              `${kind === "videoinput" ? "Webcam" : "Microphone"} ${devices.indexOf(device) + 1}`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default DeviceSelector;
