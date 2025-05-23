// src/pages/ServicesPage.tsx
import React from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero/Hero";
import Contact from "../components/Contact/Contact";
import MouseIcon from "@/components/ui/MouseIcon"; // Import MouseIcon
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"; // Assuming table.tsx is now in ui
import { Badge } from "../components/ui/badge"; // For optional add-ons
import { Mail } from "lucide-react"; // Import Mail icon
import whatsappIcon from "@/assets/images/contact/whatsapp.svg"; // Import WhatsApp icon

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
  },
};

const groupVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const tableCardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const servicePackages = [
  {
    emoji: "🚀",
    title: "Basic Website",
    price: "Starting from $300",
    perfectFor: "Small businesses, startups, personal brands, events.",
    features: [
      "Single-page website (scrollable sections)",
      "Mobile-responsive design",
      "Fast loading and clean layout",
      "Contact form integration",
    ],
  },
  {
    emoji: "📄",
    title: "Standard Website",
    price: "Starting from $500",
    perfectFor:
      "Businesses needing clear, structured content across multiple pages.",
    features: [
      "Multi-page website (e.g., Home, About, Services, Contact)",
      "Smooth page transitions and animations",
      "Enhanced user experience with micro-interactions",
      "Contact forms with email notifications",
    ],
  },
  {
    emoji: "🖥️",
    title: "Dynamic Website",
    price: "Starting from $1000",
    perfectFor:
      "Businesses that regularly update their own content, such as restaurants, blogs, or galleries.",
    features: [
      "All Standard Website features",
      "Editable content management via admin dashboard",
      "Password-protected login",
      "Simple database setup for dynamic content",
    ],
  },
  {
    emoji: "📊",
    title: "Web App & Dashboard",
    price: "Starting from $1500",
    perfectFor:
      "Businesses requiring advanced features, user management, and custom functionality.",
    features: [
      "Comprehensive backend integration (Node.js, Firebase, or Supabase)",
      "Real-time interactive dashboards (inventory, bookings, analytics)",
      "User authentication and management",
      "Custom business logic and API integrations",
    ],
  },
];

const addons = [
  "Web hosting and deployment",
  "Online bookings and payment gateway integration",
  "Multi-language setup",
  "Google Maps and location integration",
  "Blog and SEO optimization",
];

const comparisonFeatures = [
  {
    feature: "Mobile-Friendly Design",
    basic: "✅",
    standard: "✅",
    dynamic: "✅",
    webapp: "✅",
  },
  {
    feature: "Multi-page Structure",
    basic: "—",
    standard: "✅",
    dynamic: "✅",
    webapp: "✅",
  },
  {
    feature: "Editable Admin Dashboard",
    basic: "—",
    standard: "—",
    dynamic: "✅",
    webapp: "✅",
  },
  {
    feature: "Custom Backend & API",
    basic: "—",
    standard: "—",
    dynamic: "—",
    webapp: "✅",
  },
  {
    feature: "Content Management System",
    basic: "—",
    standard: "—",
    dynamic: "✅",
    webapp: "✅",
  },
  {
    feature: "Online Booking & Payments",
    basic: "—",
    standard: "Optional",
    dynamic: "✅",
    webapp: "✅",
  },
  {
    feature: "Ongoing Hosting & Support",
    basic: "Optional",
    standard: "Optional",
    dynamic: "Optional",
    webapp: "Optional",
  },
];

const ServicesPage: React.FC = () => {
  return (
    <>
      <Hero />
      {/* Main Services Content Section */}
      <div
        id="services-section"
        className="relative z-0 bg-slate-50 dark:bg-neutral-900 lg:-mt-[56px] pt-20 md:pt-28 pb-12 md:pb-20">
        {" "}
        {/* Changed z-10 to z-0 */}
        {/* Mouse Icon - visible on lg screens, consistent with Intro.tsx */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-5 z-20 hidden lg:block"
          style={{
            width: "24px",
            height: "36px",
            color: "var(--launchpad-navy)", // Mouse icon color
          }}
          animate={{ y: ["0px", "3px", "0px"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <MouseIcon className="w-full h-full" />
        </motion.div>
        <div className="container mx-auto px-4">
          {/* Introduction Area - Add some top padding to clear the mouse icon */}
          <motion.section
            className="text-center mb-12 md:mb-16 pt-8 sm:pt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}>
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4 font-overpass dark:text-white"
              variants={itemVariants}>
              Our Services
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 max-w-3xl mx-auto"
              variants={itemVariants}>
              Launchpad Web Solutions offers affordable, professional, and
              flexible website solutions designed to fit every business stage
              and budget. Explore our clear, well-defined packages to find the
              perfect solution for your needs.
            </motion.p>
          </motion.section>

          {/* Service Packages Grid */}
          <motion.section
            className="mb-12 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}>
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 font-overpass dark:text-white"
              variants={itemVariants}>
              Service Packages
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
              variants={groupVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}>
              {servicePackages.map((pkg) => (
                <motion.div
                  key={pkg.title}
                  variants={itemVariants}
                  className="flex">
                  <Card className="flex flex-col bg-[var(--launchpad-navy)] border border-[var(--launchpad-blue)]/30 rounded-xl shadow-lg text-[var(--launchpad-white)] w-full h-full">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold font-[var(--launchpad-poppins-font)] text-[var(--launchpad-white)]">
                        <span role="img" aria-label="icon" className="mr-2">
                          {pkg.emoji}
                        </span>
                        {pkg.title}
                      </CardTitle>
                      <CardDescription className="text-md text-[var(--launchpad-blue)]">
                        {pkg.price}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="mb-3 text-sm text-slate-300">
                        <span className="font-semibold text-slate-100">
                          Perfect for:
                        </span>{" "}
                        {pkg.perfectFor}
                      </p>
                      <h4 className="font-semibold mb-2 text-[var(--launchpad-white)]">
                        What's Included:
                      </h4>
                      <ul className="list-disc list-outside pl-5 space-y-1 text-sm text-slate-300">
                        {pkg.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Optional Add-ons Section */}
          <motion.section
            className="mb-12 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}>
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 font-overpass dark:text-white"
              variants={itemVariants}>
              Optional Add-ons
            </motion.h2>
            <motion.p
              className="text-center text-neutral-700 dark:text-neutral-300 mb-6 max-w-2xl mx-auto"
              variants={itemVariants}>
              Enhance your website or app with these optional features:
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-3"
              variants={groupVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}>
              {addons.map((addon) => (
                <motion.div key={addon} variants={itemVariants}>
                  <Badge
                    variant="secondary"
                    className="text-sm bg-neutral-700 text-neutral-200 border border-neutral-600 hover:bg-neutral-600 dark:hover:bg-neutral-600">
                    {addon}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Feature Comparison Table Section */}
          <motion.section
            className="mb-12 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}>
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 font-overpass dark:text-white"
              variants={itemVariants}>
              Feature Comparison
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={tableCardVariants}>
              <Card className="overflow-x-auto bg-[var(--launchpad-navy)] border border-[var(--launchpad-blue)]/30 rounded-xl shadow-lg">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-[var(--launchpad-blue)]/20 hover:bg-[var(--launchpad-blue)]/5">
                      <TableHead className="h-12 px-4 text-left align-middle font-semibold text-[var(--launchpad-white)]">
                        Feature
                      </TableHead>
                      <TableHead className="h-12 px-4 text-center align-middle font-semibold text-[var(--launchpad-white)]">
                        Basic
                      </TableHead>
                      <TableHead className="h-12 px-4 text-center align-middle font-semibold text-[var(--launchpad-white)]">
                        Standard
                      </TableHead>
                      <TableHead className="h-12 px-4 text-center align-middle font-semibold text-[var(--launchpad-white)]">
                        Dynamic
                      </TableHead>
                      <TableHead className="h-12 px-4 text-center align-middle font-semibold text-[var(--launchpad-white)]">
                        Web App
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonFeatures.map((item) => (
                      <TableRow
                        key={item.feature}
                        className="border-b border-[var(--launchpad-blue)]/20 hover:bg-[var(--launchpad-blue)]/5 data-[state=selected]:bg-[var(--launchpad-blue)]/10">
                        <TableCell className="p-4 align-middle font-medium text-slate-100">
                          {item.feature}
                        </TableCell>
                        <TableCell className="p-4 align-middle text-center text-slate-200">
                          {item.basic}
                        </TableCell>
                        <TableCell className="p-4 align-middle text-center text-slate-200">
                          {item.standard}
                        </TableCell>
                        <TableCell className="p-4 align-middle text-center text-slate-200">
                          {item.dynamic}
                        </TableCell>
                        <TableCell className="p-4 align-middle text-center text-slate-200">
                          {item.webapp}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </motion.div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}>
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 font-overpass dark:text-white"
              variants={itemVariants}>
              Need Help Deciding?
            </motion.h2>
            <motion.p
              className="text-lg text-neutral-700 dark:text-neutral-300 mb-8 max-w-xl mx-auto"
              variants={itemVariants}>
              We're here to help you select the perfect package for your
              business needs. Contact Us or Chat on WhatsApp for personalized
              advice and a free quote.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center gap-4"
              variants={itemVariants}>
              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto flex items-center justify-center px-6 py-3 text-base font-medium text-[var(--launchpad-white)] bg-[var(--launchpad-navy)] border border-[var(--launchpad-blue)] hover:bg-[var(--launchpad-blue)] hover:text-[var(--launchpad-navy)] transition-colors">
                <a href="#ContactOnServicesPage">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Us
                </a>
              </Button>
              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto flex items-center justify-center px-6 py-3 text-base font-medium text-[var(--launchpad-white)] bg-[var(--launchpad-navy)] border border-[var(--launchpad-blue)] hover:bg-[var(--launchpad-blue)] hover:text-[var(--launchpad-navy)] transition-colors">
                <a
                  href="https://wa.me/YOUR_WHATSAPP_NUMBER_HERE" // Remember to update this
                  target="_blank"
                  rel="noopener noreferrer">
                  <img
                    src={whatsappIcon}
                    alt="WhatsApp"
                    className="w-5 h-5 mr-2"
                  />
                  Chat on WhatsApp
                </a>
              </Button>
            </motion.div>{" "}
            {/* Closing tag for the button group div */}
          </motion.section>
        </div>
      </div>

      {/* Contact Section (already part of the page structure) */}
      {/* Ensure its ID matches the href in the "Contact Us" button */}
      <section id="ContactOnServicesPage">
        {" "}
        {/* Renamed ID for clarity */}
        <Contact />
      </section>
    </>
  );
};

export default ServicesPage;
