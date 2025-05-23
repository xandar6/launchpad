import React from "react";
import { motion } from "framer-motion"; // For entry animations
import MouseIcon from "@/components/ui/MouseIcon";
// Removed HoverBorderGradient import

const valueCardsData = [
  { icon: "/src/assets/images/intro/1.svg", label: "Budget-Friendly" },
  { icon: "/src/assets/images/intro/2.svg", label: "Clean & Fast" },
  { icon: "/src/assets/images/intro/3.svg", label: "Modern & Scalable" },
  { icon: "/src/assets/images/intro/4.svg", label: "Tailored to Your Needs" },
  {
    icon: "/src/assets/images/intro/5.svg",
    label: "Built with React & Tailwind",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const Intro: React.FC = () => {
  return (
    <section
      style={{
        backgroundImage: `url("/src/assets/images/intro/intro_bg_2.webp")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="mt-0 lg:-mt-[56px] flex-grow flex flex-col justify-center pb-0 sm:pb-24 pt-0 sm:pt-[151px] text-white relative z-0">
      {/* MouseIcon remains unchanged as per current scope */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-5 sm:top-5 z-20 hidden lg:block"
        style={{
          width: "24px",
          height: "36px",
          color: "var(--launchpad-navy)",
        }}
        animate={{ y: ["0px", "3px", "0px"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
        <MouseIcon className="w-full h-full" />
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 justify-items-center gap-4 sm:gap-8 py-12" // Increased gap, adjusted grid for more items
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% of the element is in view, only once
        >
          {valueCardsData.map((cardItem, index) => {
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="w-full sm:max-w-[200px] min-h-0 sm:min-h-[220px] flex flex-row items-center sm:flex-col sm:justify-center sm:items-center cursor-pointer p-4">
                {/* Sizing is maintained on this outer motion.div, added justify-center, items-center and p-4 here */}
                {/* Card Content - Card visual wrapper removed */}
                <img
                  src={cardItem.icon}
                  alt={cardItem.label}
                  className="w-20 h-20 mr-4 sm:w-40 sm:h-40 sm:mb-4 sm:mr-0" /* Increased size and margin slightly */
                />
                <h3 className="flex flex-1 items-center text-lg text-left sm:block sm:text-center font-medium text-launchpad-navy">
                  {" "}
                  {/* Increased font size and weight slightly */}
                  {cardItem.label}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Intro;
