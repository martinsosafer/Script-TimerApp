import { IconXCircle } from "@voiceai/ui/@/components/ui/icons";
import { CheckIcon } from "@voiceai/ui/@/icons/icons";

const capabilities = [
  "Idea Generation",
  "Content Creation",
  "Voice Overs",
  "Voice to Text",
  "Plagiarism Check",
  "AI Check",
  "Editor",
  "Translation to over 30+ languages",
  "Text to Voice",
  "Voice Cloning",
  "Masterclasses",
  "Celebrity voices",
  "Word and Character Counter",
];

const otherSoftwarePrices = [
  20, 50, 100, 12, 40, 30, 20, 15, 25, 20, 100, 25, 15,
];

export default function ComparativeBoard() {
  return (
    <div className=" w-full max-w-[1060px] items-center rounded-xl bg-white p-6 py-10 text-center ">
      <div className="mb-20">
        <h1 className="mb-8 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-4xl font-bold text-transparent">
          Co-Producer Market Comparison
        </h1>
        <p className="mx-auto mb-8 mt-4 w-full text-xl font-semibold text-black xl:w-[600px]">
          Compare the benefits your Co-Producer
          <br /> Co-Producer gives you <br /> compared to the tools it replaces.
        </p>
        <span className="font-base mt-2 block text-lg text-black">
          Start below and save time, expenses, and increase your productivity.
        </span>
      </div>
      <div className="grid w-full max-w-6xl grid-cols-3 gap-8">
        {/* First Column: Left-aligned text */}
        <div className="rounded-lg bg-gradient-to-b from-blue-600 to-cyan-500 p-4 text-left text-white">
          <h2 className="mb-16 text-xl font-semibold">Capabilities</h2>
          {capabilities.map((capability, index) => (
            <p key={index} className="mb-2 border-b pb-2 text-sm">
              {capability}
            </p>
          ))}
        </div>

        {/* Second Column: Centered Check Icon */}
        <div className="rounded-lg bg-gradient-to-b from-blue-600 to-cyan-500 p-4 text-white">
          <div className="mb-4 rounded-lg bg-white p-2 text-blue-600">
            <h2 className="text-xl font-semibold">Co-Producer</h2>
            <p className="text-2xl font-bold">$9-39 /Mo</p>
          </div>
          {capabilities.map((_, index) => (
            <div
              key={index}
              className="mb-2 flex items-center justify-center border-b pb-2"
            >
              <CheckIcon className="mr-2 h-5 w-5 text-green-300" />
            </div>
          ))}
        </div>

        <div className="rounded-lg bg-gradient-to-b from-red-500 to-purple-600 p-4 text-white">
          <div className="mb-4 rounded-lg bg-white p-2 text-red-600">
            <h2 className="text-xl font-semibold">Other Software:</h2>
            <p className="text-2xl font-bold">$448+ / Mo</p>
          </div>
          {otherSoftwarePrices.map((price, index) => (
            <p key={index} className="mb-2 border-b pb-2 text-sm">
              <span>${price}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
