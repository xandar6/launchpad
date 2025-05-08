"use client";

import { useState, useEffect } from "react"; // Added useEffect
import { motion } from "framer-motion"; // Added motion
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const mainNavigation = [
  { name: "Home", href: "/" },
  // Services will be handled separately due to dropdown
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const servicesNavigation = [
  { name: "Basic Website", href: "/services/basic" },
  { name: "Standard Website", href: "/services/standard" },
  { name: "Dynamic Website", href: "/services/dynamic" },
  { name: "Web App", href: "/services/webapp" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleResize = () => setIsDesktop(mediaQuery.matches);
    handleResize(); // Initial check
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 text-launchpad-white flex items-center border-b"
      animate={{
        height: isScrolled ? "80px" : isDesktop ? "112px" : "80px",
        backgroundColor: isScrolled ? "rgb(13, 27, 42)" : "rgba(0, 0, 0, 0)", // Changed to launchpad-navy
        borderBottomColor: isScrolled
          ? "rgb(55, 65, 81)" // This could be adjusted if --launchpad-navy needs a different border
          : "rgba(255, 255, 255, 0.75)",
      }}
      transition={{
        type: "spring", // Apply spring to all animated properties
        stiffness: 100,
        damping: 20,
      }}>
      <nav
        aria-label="Global"
        className="container mx-auto flex max-w-screen-2xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt="Your Company"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 hover:text-gray-200" // Adjusted colors for potentially dark backgrounds
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {mainNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-launchpad-white dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300">
              {item.name}
            </a>
          ))}
          {/* Services Popover (User's preferred base, modified) */}
          <Popover className="relative">
            {" "}
            {/* Added relative positioning for Popover itself if needed, though panel is absolute */}
            <PopoverButton className="flex items-center text-sm font-semibold leading-6 text-launchpad-white dark:text-gray-100 hover:text-white/80 dark:hover:text-gray-300/80 outline-none focus:outline-none data-[active]:text-white/80 data-[hover]:text-white/80 dark:data-[active]:text-gray-300/80 dark:data-[hover]:text-gray-300/80">
              Services
              <ChevronDownIcon
                className="ml-1 size-4 text-launchpad-white dark:text-gray-100"
                aria-hidden="true"
              />
            </PopoverButton>
            <PopoverPanel
              transition
              anchor="bottom"
              className="absolute left-1/2 z-[51] mt-3 -translate-x-1/2 transform divide-y divide-white/5 rounded-xl bg-purple-900 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0">
              <div className="p-3">
                {servicesNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 transition hover:bg-white/5">
                    <p className="font-semibold text-white">{item.name}</p>
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
        </div>
        {/* Removed the Log in button from the example's far right */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/* Placeholder for potential future items like login/signup or theme toggle */}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden">
        {/* Adjusted for transparency and blur: remove bg-white, add backdrop-blur */}
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:sm:ring-gray-700">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300">
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-700">
              <div className="space-y-2 py-6">
                {mainNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-800">
                    {item.name}
                  </a>
                ))}
                {/* Services in mobile - Disclosure */}
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-800">
                        Services
                        <ChevronDownIcon
                          className={`${
                            open ? "rotate-180 transform" : ""
                          } size-5 flex-none`}
                          aria-hidden="true"
                        />
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 space-y-2 pl-6">
                        {servicesNavigation.map((item) => (
                          <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-3 pr-3.5 text-sm font-semibold leading-7 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                            {item.name}
                          </DisclosureButton>
                        ))}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              </div>
              {/* Removed mobile login */}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </motion.header>
  );
}
