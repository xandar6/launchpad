import { Button } from "@/components/ui/button";
import { Boxes } from "@/components/ui/background-boxes";
import styles from "./Hero.module.css";

export default function HeroSectionSimpleCentred() {
  return (
    <>
      {/* Hero */}
      <section
        className={`${styles.heroSectionMasked} bg-launchpad-navy min-h-[70vh] relative z-1 flex flex-col justify-center`}>
        <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px] relative z-10">
          {/* Announcement Banner */}
          {/* <div className="flex justify-center">
            <a
              className="inline-flex items-center gap-x-2 rounded-full border p-1 ps-3 text-sm transition text-neutral-100"
              href="#">
              PRO release - Join to waitlist
              <span className="bg-white/15 inline-flex items-center justify-center gap-x-2 rounded-full px-2.5 py-1.5 text-sm font-semibold">
                <svg
                  className="h-4 w-4 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </a>
          </div> */}
          {/* End Announcement Banner */}
          {/* Title */}
          <div className="mx-auto mt-5 max-w-2xl text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white">
              Launch Your Web Presence with Confidence
            </h1>
          </div>
          {/* End Title */}
          <div className="mx-auto mt-5 max-w-3xl text-center">
            <p className="text-neutral-300 text-xl">
              Affordable, modern websites and web apps for small and medium
              businesses. Built with React, styled with Tailwind, and tailored
              to your exact needs.
            </p>
          </div>
          {/* Buttons */}
          <div className="mt-8 flex justify-center gap-3">
            <Button size={"lg"}>Get started</Button>
            {/* <Button size={"lg"} variant={"outline"}>
              Learn more
            </Button> */}
          </div>
          {/* End Buttons */}
          {/* <div className="mt-5 flex items-center justify-center gap-x-1 sm:gap-x-3">
            <span className="text-neutral-300 text-sm">Package Manager:</span>
            <span className="text-sm font-bold text-neutral-100">npm </span>
            <svg
              className="text-neutral-300 h-5 w-5"
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true">
              <path
                d="M6 13L10 3"
                stroke="currentColor"
                strokeLinecap="round"
              />
            </svg>
            <a
              className="inline-flex items-center gap-x-1 text-sm font-medium decoration-2 hover:underline text-blue-300 hover:text-blue-200"
              href="#">
              Installation Guide
              <ChevronRightIcon className="h-4 w-4 flex-shrink-0" />
            </a>
          </div> */}
        </div>
        <Boxes />
      </section>
      {/* End Hero */}
    </>
  );
}
