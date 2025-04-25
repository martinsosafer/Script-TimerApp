import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";

import { IconPlay } from "@voiceai/ui/@/components/ui/icons";

interface SpeedButtonProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  buttonStyle: React.CSSProperties;
  buttonHoverStyle: React.CSSProperties;
  disabledButtonStyle: React.CSSProperties;
}

export const SpeedButton = ({
  audioRef,
  buttonStyle,
  buttonHoverStyle,
  disabledButtonStyle,
}: SpeedButtonProps) => {
  const [selectedSpeed, setSelectedSpeed] = useState("1x");

  const handleSpeedChange = (speed: string) => {
    setSelectedSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = parseFloat(speed);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          style={buttonStyle}
          className="text-sm"
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor =
              buttonHoverStyle.backgroundColor!;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor =
              buttonStyle.backgroundColor!;
          }}
        >
          {selectedSpeed} <IconPlay className="ml-1 h-5 w-5" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute w-16 rounded-md bg-tertiary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          style={{
            right: 0,
            bottom: "100%",
            transform: "translateY(-10px)",
          }}
        >
          {["0.5x", "0.75x", "1x", "1.25x", "1.5x", "2x"].map((speed) => (
            <Menu.Item key={speed}>
              {({ active }) => (
                <button
                  onClick={() => handleSpeedChange(speed)}
                  className={`${
                    active ? "bg-orange-400" : ""
                  } block px-4 py-2 text-sm text-white`}
                >
                  {speed}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
