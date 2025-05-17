import React from "react";
import { motion } from "framer-motion";
import { Card, CardTitle } from "@/components/ui/card"; // Removed CardHeader and CardContent as we'll simplify
import { ArrowRight } from "lucide-react";
import styles from "../Hero/Hero.module.css"; // Added import for Hero styles

// Import SVGs
import landingPageSvg from "@/assets/images/about/landing_page.svg";
import multiPageSvg from "@/assets/images/about/multi_page.svg";
import dashboardSvg from "@/assets/images/about/dashboard.svg";

interface FeatureCardProps {
  svgSrc: string; // Changed from icon to svgSrc
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  svgSrc,
  title,
  description,
}) => {
  // Variants for individual card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  return (
    <motion.div variants={cardVariants} className="w-full">
      {" "}
      {/* Added motion.div and variants */}
      <Card className="bg-background border-[var(--border)] shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-row gap-x-5 items-start h-full">
        {" "}
        {/* Added h-full for consistent height if needed */}
        {/* Left Column for SVG */}
        <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20">
          <img
            src={svgSrc}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>
        {/* Right Column for Text */}
        <div className="flex-grow">
          <CardTitle className="text-lg md:text-xl font-semibold text-[var(--color-launchpad-navy)] mb-2 font-[var(--launchpad-poppins-font)]">
            {title}
          </CardTitle>
          <p className="text-sm text-[var(--color-launchpad-gray)] font-[var(--launchpad-poppins-font)]">
            {description}
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

// Variants for the container of text elements and feature cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1, // Slight delay before children start animating
    },
  },
};

// Variants for individual text elements (h2, p, Button)
const textItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const About: React.FC = () => {
  const features: FeatureCardProps[] = [
    {
      svgSrc: landingPageSvg,
      title: "Landing Page",
      description:
        "Simple, clean, single-page layout with key business info and contact form.",
    },
    {
      svgSrc: multiPageSvg,
      title: "Multi-Page Website",
      description:
        "Professional website with services, about, and contact — ideal for growing businesses.",
    },
    {
      svgSrc: dashboardSvg,
      title: "Dashboard / Admin Panel",
      description:
        "Custom backend apps for managing your content, sales, or inventory.",
    },
  ];

  return (
    <motion.section // Changed to motion.section
      id="about"
      className="py-40 bg-[var(--color-launchpad-white)] text-[var(--foreground)]" // Changed padding to py-40
      initial="hidden" // Added initial and animate for the whole section
      whileInView="visible" // Animate when section comes into view
      viewport={{ once: true, amount: 0.2 }} // Trigger once, when 20% is visible
      variants={containerVariants} // Use container variants for overall stagger
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {" "}
          {/* Changed items-start to items-center to vertically center columns */}
          {/* Left Column - Text Block */}
          <motion.div
            className="flex flex-col justify-center"
            variants={containerVariants} // Stagger children of this column
          >
            <motion.h2
              variants={textItemVariants}
              className="text-4xl font-semibold text-[var(--color-launchpad-navy)] mb-10 font-[var(--launchpad-poppins-font)]">
              Who We Are
            </motion.h2>
            <motion.p
              variants={textItemVariants}
              className="text-xl font-semibold text-[var(--color-launchpad-navy)] mb-4 font-[var(--launchpad-poppins-font)]">
              Launchpad Web Solutions is a modern development studio focused on
              small and growing businesses.
            </motion.p>
            <motion.p
              variants={textItemVariants}
              className="text-lg text-[var(--color-launchpad-gray)] mb-8 leading-relaxed font-[var(--launchpad-poppins-font)]">
              We build clean, scalable websites and web apps using React and
              Tailwind CSS. Whether you're launching your first landing page or
              upgrading to a full dashboard-powered app, we deliver
              budget-conscious solutions that grow with you.
            </motion.p>
            <motion.div variants={textItemVariants}>
              <button
                className={styles.gradientButtonWrapper}
                onClick={() => {
                  console.log("Navigate to /about page");
                }}>
                <span
                  className={`${styles.gradientButtonContent} flex items-center`}>
                  Check Our Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </button>
            </motion.div>
          </motion.div>
          {/* Right Column - Feature Cards */}
          <motion.div
            className="grid grid-cols-1 gap-6"
            variants={containerVariants} // Stagger children (FeatureCards)
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                svgSrc={feature.svgSrc}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
