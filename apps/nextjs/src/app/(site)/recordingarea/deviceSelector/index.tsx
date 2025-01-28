import React, { useEffect, useState } from "react";

interface DeviceSelectorProps {
  kind: "videoinput" | "audioinput";
  onDeviceChange: (deviceId: string) => void;
  disabled?: boolean;
}

export function DeviceSelector({
  kind,
  onDeviceChange,
  disabled = false,
}: DeviceSelectorProps) {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [hoveredDevice, setHoveredDevice] = useState<string | null>(null);

  useEffect(() => {
    async function getDevices() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      setDevices(devices.filter((device) => device.kind === kind));
    }
    getDevices();
  }, [kind]);

  const handleDeviceChange = (deviceId: string) => {
    setSelectedDevice(deviceId);
    onDeviceChange(deviceId);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <div className="relative w-[180px]">
      {/* Select Trigger */}
      <div
        className={`flex w-full items-center justify-between rounded-md border p-2 ${
          disabled
            ? "cursor-not-allowed bg-gray-100 opacity-50"
            : "cursor-pointer bg-white"
        }`}
        onClick={toggleDropdown}
      >
        <span className="truncate">
          {selectedDevice
            ? devices.find((device) => device.deviceId === selectedDevice)
                ?.label || `${kind === "videoinput" ? "Webcam" : "Microphone"}`
            : kind === "videoinput"
              ? "Select webcam"
              : "Select microphone"}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Dropdown Options */}
      {isDropdownOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg">
          {devices.map((device) => (
            <div
              key={device.deviceId}
              className="relative cursor-pointer truncate p-2 hover:bg-gray-100"
              onClick={() => handleDeviceChange(device.deviceId)}
              onMouseEnter={() => setHoveredDevice(device.deviceId)}
              onMouseLeave={() => setHoveredDevice(null)}
            >
              {device.label ||
                `${kind === "videoinput" ? "Webcam" : "Microphone"} ${devices.indexOf(device) + 1}`}
              {/* Tooltip for hovered device */}
              {hoveredDevice === device.deviceId && (
                <div className="absolute left-full top-0 ml-2 rounded-md bg-black px-2 py-1 text-sm text-white">
                  {device.label ||
                    `${kind === "videoinput" ? "Webcam" : "Microphone"} ${devices.indexOf(device) + 1}`}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DeviceSelector;
