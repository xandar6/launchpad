import React from "react";
import { motion } from "framer-motion"; // Added for animations
import { Mail, MapPin, Phone } from "lucide-react"; // Removed Linkedin, Instagram, Facebook, Added Phone
import contactBg from "@/assets/images/contact/contact_bg.jpg";
import SocialLinks from "../ui/SocialLinks"; // Import the new component

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

const Footer: React.FC = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Removed the old socialLinks array

  return (
    <footer
      className="bg-cover bg-center text-gray-300 py-20 md:py-40 relative border-t border-gray-600"
      style={{ backgroundImage: `url(${contactBg})` }}>
      <div className="absolute inset-0 bg-[var(--launchpad-navy-overlay)] z-0"></div>
      {/* Added py-40 */}
      <div className="container mx-auto px-6 relative z-10">
        {" "}
        {/* Removed py-12, added relative z-10 */}
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}>
          {/* 1. Left Side: Logo + Short Tagline */}
          <motion.div
            className="col-span-1 md:col-span-2 lg:col-span-1"
            variants={itemVariants}>
            <a href="/" className="flex items-center space-x-2 mb-4">
              <img
                src="/src/assets/images/rocket.svg"
                alt="Launchpad Web Solutions Logo"
                width={40}
                height={40}
              />
              <span className="text-xl font-semibold text-launchpad-white font-[var(--launchpad-poppins-font)]">
                Launchpad Web Solutions
              </span>
            </a>
            <p className="text-sm font-[var(--launchpad-poppins-font)]">
              Modern websites. Scalable solutions. Built with care.
            </p>
          </motion.div>

          {/* 2. Quick Links (Navigation) */}
          <motion.div variants={itemVariants}>
            <h5 className="mb-4 font-semibold text-launchpad-white uppercase font-[var(--launchpad-poppins-font)]">
              Quick Links
            </h5>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-launchpad-blue transition-colors duration-200 font-[var(--launchpad-poppins-font)]">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 3. Contact Info */}
          <motion.div variants={itemVariants}>
            <h5 className="mb-4 font-semibold text-launchpad-white uppercase font-[var(--launchpad-poppins-font)]">
              Contact Us
            </h5>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Mail
                  size={18}
                  className="mr-2 mt-1 flex-shrink-0 text-launchpad-blue"
                />
                <a
                  href="mailto:info@launchpadwebsolutions.com"
                  className="hover:text-launchpad-blue transition-colors duration-200 font-[var(--launchpad-poppins-font)]">
                  info@launchpadwebsolutions.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPin
                  size={18}
                  className="mr-2 mt-1 flex-shrink-0 text-launchpad-blue"
                />
                <span className="font-[var(--launchpad-poppins-font)]">
                  Based in Australia — working worldwide
                </span>
              </li>
              <li className="flex items-start">
                <Phone
                  size={18}
                  className="mr-2 mt-1 flex-shrink-0 text-launchpad-blue"
                />
                <a
                  href="tel:+61408202237"
                  className="hover:text-launchpad-blue transition-colors duration-200 font-[var(--launchpad-poppins-font)]">
                  +61 408 202 237
                </a>
              </li>
            </ul>
          </motion.div>

          {/* 4. Social Media Icons */}
          <motion.div variants={itemVariants}>
            <h5 className="mb-4 font-semibold text-launchpad-white uppercase font-[var(--launchpad-poppins-font)]">
              Connect
            </h5>
            <SocialLinks iconClassName="text-gray-300 hover:text-launchpad-blue" />
          </motion.div>
        </motion.div>
        {/* 5. Bottom Bar (Legal + Credit) */}
        <motion.div
          className="mt-12 border-t border-launchpad-gray/30 pt-8 text-center text-sm"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}>
          <p className="mb-1 font-[var(--launchpad-poppins-font)]">
            © {new Date().getFullYear()} Launchpad Web Solutions. All rights
            reserved.
          </p>
          <p className="font-[var(--launchpad-poppins-font)]">
            Website handcrafted with React & Tailwind CSS.
          </p>
        </motion.div>{" "}
        {/* Corrected closing tag for the bottom bar motion.div */}
      </div>
    </footer>
  );
};

export default Footer;
