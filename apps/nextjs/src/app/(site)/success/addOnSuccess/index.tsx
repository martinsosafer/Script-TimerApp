import { Button } from "@voiceai/ui";
import { CheckIcon as Check } from "@voiceai/ui/@/icons/icons";

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 p-6 text-white">
      <div className="relative mx-auto max-w-5xl">
        {/* Triangle Banner */}
        <div className="absolute -right-6 -top-6 h-32 w-32">
          <div
            className="absolute h-full w-full bg-orange-400 shadow-lg"
            style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
          >
            <span className="absolute right-8 top-12 -rotate-45 transform text-sm font-bold text-white">
              TODAY ONLY
            </span>
          </div>
        </div>

        <div className="space-y-6 p-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-orange-300">
              Ensure originality with this powerful add-on!
            </h2>
            <h1 className="text-4xl font-bold">Plagiarism & AI Detection</h1>
            <p className="mt-2 text-blue-100">
              For professionals focused on SEO, professors, students and anyone
              that needs original and clean copy.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid gap-8 lg:grid-cols-[1fr,auto]">
            {/* Features Table */}
            <div className="overflow-hidden rounded-lg">
              <div className="grid">
                <div className="grid grid-cols-2 bg-blue-600/40 p-4">
                  <span>Included words per month</span>
                  <span className="text-right">15,000</span>
                </div>
                <div className="grid grid-cols-2 bg-blue-500/20 p-4">
                  <span>Plagiarism & AI detection</span>
                  <Check className="ml-auto h-5 w-5 text-cyan-300" />
                </div>
                <div className="grid grid-cols-2 bg-blue-600/40 p-4">
                  <span>Source links to original</span>
                  <Check className="ml-auto h-5 w-5 text-cyan-300" />
                </div>
                <div className="grid grid-cols-2 bg-blue-500/20 p-4">
                  <span>GPT, Claude, Gemini</span>
                  <Check className="ml-auto h-5 w-5 text-cyan-300" />
                </div>
                <div className="grid grid-cols-2 bg-blue-600/40 p-4">
                  <span>Over 100 languages</span>
                  <Check className="ml-auto h-5 w-5 text-cyan-300" />
                </div>
                <div className="grid grid-cols-2 bg-blue-500/20 p-4">
                  <span>Paraphrasing detection</span>
                  <Check className="ml-auto h-5 w-5 text-cyan-300" />
                </div>
              </div>
            </div>

            {/* Pricing Plans */}
            <div className="flex flex-col justify-center gap-8">
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-emerald-300">
                  Yearly Plan
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">$11</span>
                  <span className="text-gray-300">/month</span>
                </div>
                <div className="text-gray-300">$132/year</div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  BUY NOW
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-medium text-emerald-300">
                  Monthly Plan
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">$14</span>
                  <span className="text-gray-300">/month</span>
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  BUY NOW
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
