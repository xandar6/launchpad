"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  // NavbarButton, // Will be unused
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./resizable-navbar";
import { useState } from "react";

export default function Header() {
  const [activeLink, setActiveLink] = useState("#"); // Default to Home
  // Your navigation items
  const navItemsDesktop = [
    { name: "Home", href: "#" },
    { name: "Services", href: "/services" }, // Simple link for desktop
    { name: "Projects", href: "#Project" },
    { name: "About", href: "#About" },
    { name: "Contact", href: "#Contact" },
  ];

  const navItemsMobile = [
    { name: "Home", href: "#" },
    { name: "Projects", href: "#Project" },
    { name: "About", href: "#About" },
    { name: "Contact", href: "#Contact" },
    // Services for mobile (expanded)
    { name: "Basic Website", href: "/services/basic", isService: true },
    { name: "Standard Website", href: "/services/standard", isService: true },
    { name: "Dynamic Website", href: "/services/dynamic", isService: true },
    { name: "Web App", href: "/services/webapp", isService: true },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
    setIsMobileMenuOpen(false); // Close mobile menu on link click
  };

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems
            items={navItemsDesktop.map((item) => ({
              name: item.name,
              link: item.href,
            }))}
            activeLink={activeLink}
            onLinkClick={handleLinkClick}
          />
          {/* Removed Login/Book a call buttons */}
          <div className="flex items-center gap-4">
            {/* Intentionally empty */}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}>
            {/* Map your mobile-specific nav items */}
            {navItemsMobile.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.href}
                onClick={() => handleLinkClick(item.href)}
                className={`relative block py-2 font-[var(--launchpad-poppins-font)] text-neutral-600 dark:text-neutral-300 ${
                  activeLink === item.href
                    ? "bg-[var(--launchpad-purple)] text-white dark:bg-neutral-800 rounded-md px-2" // Active style for mobile
                    : ""
                }`}>
                {item.isService && (
                  <span className="pl-4 text-sm opacity-75">- </span>
                )}
                <span className={item.isService ? "text-sm" : ""}>
                  {item.name}
                </span>
              </a>
            ))}
            {/* Removed Login/Book a call buttons from mobile */}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      {/* DummyContent was already removed by user */}
    </div>
  );
}
