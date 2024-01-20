import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Script Timer",
  description: "Welcome to Script Timer",
};

export default function LandingPage() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-primary sm:text-5xl xl:text-6xl/none">
                Welcome!
              </h1>
              <p className="max-w-[600px] text-primary dark:text-gray-400 md:text-xl">
                Learn the newest capabilities to make you the ultimate creator &
                presenter.
              </p>
            </div>
            <iframe
              src="https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
              frameBorder="0"
              className="h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              // style="position:absolute;top:0;left:0;width:100%;height:100%;"
              title="Script-Timer Ai_ On boarding video (Short version) (1)"
            />
            <div className="space-x-4">
              <p className="inline-flex font-bold text-primary">Skip to:</p>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                More Training
              </Link>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Script Coach
              </Link>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Text2Speech
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
