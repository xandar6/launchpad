import React from "react";
import { motion } from "framer-motion"; // Added motion import
import { Search, NotebookPen, MonitorSmartphone, Rocket } from "lucide-react";
import processBg from "../../assets/images/process/process_bg.jpg";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility for classnames
import styles from "../Hero/Hero.module.css"; // Added import for Hero styles

const processSteps = [
  {
    stepNumber: 1,
    icon: Search,
    title: "Discovery",
    label: "We learn about your business",
    text: "Tell us what you do, what your goals are, and we’ll help you decide what kind of website is right for you.",
  },
  {
    stepNumber: 2,
    icon: NotebookPen,
    title: "Plan & Quote",
    label: "You get a plan & a fixed price",
    text: "We suggest the best solution, walk you through features, and give you a clear quote — no tech jargon or surprises.",
  },
  {
    stepNumber: 3,
    icon: MonitorSmartphone,
    title: "Build & Preview",
    label: "We build it, you preview it",
    text: "We design and develop your site. You get to review everything on a real preview link and suggest changes.",
  },
  {
    stepNumber: 4,
    icon: Rocket,
    title: "Launch & Support",
    label: "We launch it and support you",
    text: "Once you're happy, we go live! We’ll stay around to help with updates, fixes, or improvements when you need us.",
  },
];

// Copied from Hero.tsx for consistent button animation
const buttonAppearFromBottomVariants = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay },
  },
});

const Process: React.FC = () => {
  return (
    <section
      id="process"
      className="py-40 px-6" // Changed padding to py-40
      style={{
        backgroundImage: `url(${processBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="max-w-screen-lg mx-auto">
        {" "}
        {/* Widened container */}
        <h2 className="text-4xl font-semibold text-center mb-20 text-[var(--launchpad-navy)] font-[var(--launchpad-poppins-font)]">
          How Does It Work?
        </h2>
        <div className="relative">
          {/* Timeline line - Centered on desktop */}
          <div className="absolute top-0 bottom-0 w-0.5 bg-[var(--launchpad-blue)] left-3 md:left-1/2 md:-translate-x-1/2" />

          {processSteps.map(
            (
              { icon: Icon, title, label, text },
              index // Removed stepNumber
            ) => (
              <div
                key={index}
                // Base relative positioning, padding for mobile
                className="relative pb-12 last:pb-0 pl-10 md:pl-0">
                {/* Timeline Icon - Centered on desktop */}
                <div className="absolute top-0 h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-full bg-[var(--launchpad-navy)] border-2 border-[var(--launchpad-blue)] left-3 -translate-x-[calc(50%-1px)] md:left-1/2 md:-translate-x-1/2">
                  <Icon className="h-5 w-5 md:h-6 md:w-6 text-[var(--launchpad-white)]" />
                </div>

                {/* Content - Alternating position and alignment */}
                <div
                  className={cn(
                    "space-y-2 md:space-y-3",
                    // Desktop positioning: right for even, left for odd
                    index % 2 === 0
                      ? "md:pl-[calc(50%+2.5rem)]" // Position right of center + gap (increased gap)
                      : "md:pr-[calc(50%+2.5rem)] md:text-right" // Position left of center + gap, align text right (increased gap)
                  )}>
                  <h3 className="text-xl sm:text-2xl font-semibold text-[var(--launchpad-navy)] font-[var(--launchpad-poppins-font)]">
                    {title}
                  </h3>
                  <p className="text-md sm:text-lg font-medium text-primary font-[var(--launchpad-poppins-font)]">
                    {label}
                  </p>
                  <p className="text-sm sm:text-base text-launchpad-navy/50 font-[var(--launchpad-poppins-font)]">
                    {text}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
        {/* Centered Button */}
        <div className="mt-16 flex justify-center">
          <motion.a
            href="#contact"
            className={styles.gradientButtonWrapper}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={buttonAppearFromBottomVariants(0.2)} // Small delay after steps
          >
            <span className={styles.gradientButtonContent}>Get in Touch</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Process;
