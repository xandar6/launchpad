import React from "react";
import { motion } from "framer-motion"; // For entry animations
import MouseIcon from "@/components/ui/MouseIcon";
import { DollarSign, Zap, Rocket, Settings, Code } from "lucide-react";
// Removed HoverBorderGradient import

const valueCardsData = [
  { icon: DollarSign, label: "Budget-Friendly" },
  { icon: Zap, label: "Clean & Fast" },
  { icon: Rocket, label: "Modern & Scalable" },
  { icon: Settings, label: "Tailored to Your Needs" },
  { icon: Code, label: "Built with React & Tailwind" },
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
        backgroundImage: `url("/src/assets/images/intro/intro_bg_1.webp")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="-mt-[56px] flex-grow flex flex-col justify-center pb-16 sm:pb-24 pt-[119px] sm:pt-[151px] text-white relative z-0">
      {/* MouseIcon remains unchanged as per current scope */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-5 sm:top-5 z-20"
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 justify-items-center gap-8 py-12" // Increased gap, adjusted grid for more items
          variants={containerVariants}
          initial="hidden"
          animate="visible">
          {valueCardsData.map((cardItem, index) => {
            const IconComponent = cardItem.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="w-full max-w-[200px] min-h-[220px] flex flex-col cursor-pointer">
                {/* Sizing is maintained on this outer motion.div */}
                <div className="w-full h-full rounded-xl bg-[var(--launchpad-navy-overlay)] p-4 flex flex-col justify-center items-center border border-[var(--launchpad-navy-overlay)]">
                  {/* Removed corner border elements. Added standard border. Removed relative and overflow-hidden as they are not strictly needed for this simple border. */}
                  {/* Card Content */}
                  <IconComponent className="w-10 h-10 mb-3 text-launchpad-blue" />{" "}
                  {/* Removed z-20 */}
                  <h3 className="text-base text-center font-normal text-launchpad-white">
                    {" "}
                    {/* Removed z-20 */}
                    {cardItem.label}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Intro;
