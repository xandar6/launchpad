import React from "react";
import BackgroundOverlayCard from "@/components/ui/background-overlay-card";

const Projects: React.FC = () => {
  return (
    <section
      id="projects"
      className="py-40 px-4 md:px-8 lg:px-16 bg-[var(--launchpad-navy)] text-white">
      <div className="container mx-auto">
        {/* Adjusted margin-bottom for heading to complement section padding */}
        <h2 className="text-4xl md:text-5xl font-bold mb-20 text-center">
          Our Work
        </h2>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <BackgroundOverlayCard
            imageUrl="/src/assets/images/projects/nwt.jpg"
            hoverImageUrl="/src/assets/images/projects/nwt.gif"
            title="Project Title Placeholder 1"
            description="This is a placeholder description for the project. More details will be added soon."
            className="w-full"
          />
          <BackgroundOverlayCard
            imageUrl="/src/assets/images/projects/nwt.jpg"
            hoverImageUrl="/src/assets/images/projects/nwt.gif"
            title="Project Title Placeholder 2"
            description="This is a placeholder description for the project. More details will be added soon."
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;
