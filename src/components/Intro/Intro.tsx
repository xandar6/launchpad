import React from "react";
import { Button } from "@/components/ui/button";
import introBg from "@/assets/images/1.png"; // Import the image
import { motion } from "framer-motion"; // Import motion
import MouseIcon from "@/components/ui/MouseIcon"; // Import the new MouseIcon component

const Intro: React.FC = () => {
  return (
    <section
      style={{
        backgroundImage: `url(${introBg})`, // Applied via inline style
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="-mt-[56px] flex-grow flex flex-col justify-center pb-16 sm:pb-24 pt-[119px] sm:pt-[151px] text-center text-white relative z-0">
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-5 sm:top-5 z-20" // Adjusted top, increased z-index
        style={{
          width: "24px", // Corresponds to ~40% of original 60px height for SVG
          height: "36px", // Corresponds to ~40% of original 60px height for SVG
          color: "white", // This will be inherited by MouseIcon's currentColor
        }}
        animate={{
          y: ["0px", "3px", "0px"], // Subtle up and down movement
        }}
        transition={{
          duration: 2, // Duration of one cycle
          repeat: Infinity, // Repeat indefinitely
          ease: "easeInOut", // Smooth easing
        }}>
        <MouseIcon className="w-full h-full" />
      </motion.div>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          We are the one of the most effective Web Design Companies
        </h2>
        <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto">
          Getting online is easy. Succeeding online is a different story. You’ll
          need more than just a beautiful website to stand out these days.
          Online marketing solutions. Conversion-based web design coupled with a
          lead generating marketing plan, your online success is inevitable.
        </p>
        <Button
          size="lg"
          className="bg-launchpad-blue hover:bg-launchpad-blue-hover text-white">
          Get Started
        </Button>
      </div>
    </section>
  );
};

export default Intro;
