import React from "react";
import { motion } from "framer-motion";
import BackgroundOverlayCard from "@/components/ui/background-overlay-card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Slightly more stagger
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 }, // Slightly more y offset
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80, // Softer spring
      damping: 15,
    },
  },
};

const Projects: React.FC = () => {
  return (
    <section
      id="projects"
      className="py-20 md:py-40 px-4 md:px-8 lg:px-16 bg-[var(--launchpad-navy)] text-white">
      <div className="container mx-auto">
        {/* Adjusted margin-bottom for heading to complement section padding */}
        <h2 className="text-4xl font-semibold mb-20 text-center font-overpass">
          Our Work
        </h2>
        <motion.div
          className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }} // Trigger when 15% is visible
        >
          <motion.div variants={itemVariants}>
            <BackgroundOverlayCard
              imageUrl="/src/assets/images/projects/nwt.jpg"
              hoverImageUrl="/src/assets/images/projects/nwt.gif"
              // title="Project Title Placeholder 1"
              // description="This is a placeholder description for the project. More details will be added soon."
              className="w-full"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <BackgroundOverlayCard
              imageUrl="/src/assets/images/projects/tamarind.jpg"
              hoverImageUrl="/src/assets/images/projects/tamarind.gif"
              // title="Project Title Placeholder 2"
              // description="This is a placeholder description for the project. More details will be added soon."
              className="w-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
