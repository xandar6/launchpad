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
import { useState, useEffect } from "react"; // Import Link, useLocation, useEffect
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const { pathname, hash } = location;

  const navItemsDesktop = [
    { name: "Home", href: "/", id: "Hero" }, // Assuming Hero section has id="Hero" for scroll spy
    {
      name: "Services",
      href: "/services#services-section",
      id: "ServicesPage",
    }, // Not part of main page scroll spy
    { name: "About", href: "/#About", id: "About" },
    { name: "Projects", href: "/#Project", id: "Project" },
    { name: "Process", href: "/#process", id: "process" }, // Added Process section
    { name: "Contact", href: "/#Contact", id: "Contact" },
  ];

  const navItemsMobile = navItemsDesktop.map(({ name, href }) => ({
    name,
    href,
  })); // Derive from desktop

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeScrolledSectionHref, setActiveScrolledSectionHref] =
    useState("/");

  useEffect(() => {
    const mainPageNavItems = navItemsDesktop.filter(
      (item) => item.href.startsWith("/#") || item.href === "/"
    );

    const handleScroll = () => {
      if (pathname === "/") {
        // Only run scroll spy on the main page
        let currentSectionHref = "/"; // Default to Home
        const scrollPosition = window.scrollY;
        // An offset to trigger highlighting slightly before the section top hits the viewport top
        // Adjust this value based on your header's height or desired trigger point
        const activationOffset = window.innerHeight * 0.4;

        for (let i = mainPageNavItems.length - 1; i >= 0; i--) {
          const item = mainPageNavItems[i];
          const element = document.getElementById(item.id);
          if (element) {
            if (element.offsetTop - activationOffset <= scrollPosition) {
              currentSectionHref = item.href;
              break; // Found the current section
            }
          }
        }
        setActiveScrolledSectionHref(currentSectionHref);
      }
    };

    if (pathname === "/") {
      // Only add listener if on the main page
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Call once on load to set initial state
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      // If not on the main page, ensure activeScrolledSectionHref is reset or set appropriately
      // For /services, it should just be /services. For other pages, it might be just the pathname.
      // This logic is handled by finalCurrentPathname determination below.
    }
  }, [pathname, navItemsDesktop]); // Rerun if pathname changes or navItems change (though navItems are static here)

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href === "/") {
      window.scrollTo(0, 0);
    }
    // If it's an anchor link, the browser will handle scrolling.
    // The ScrollHandler in App.tsx also helps.
    // We also want the clicked link to be active immediately.
    // The `hash` in the URL will update, and `finalCurrentPathname` will reflect this.
  };

  let finalCurrentPathname;
  if (hash && pathname === "/") {
    // Prioritize hash if on main page and hash exists
    finalCurrentPathname = pathname + hash;
  } else if (pathname === "/") {
    // On main page, no hash, use scroll spy
    finalCurrentPathname = activeScrolledSectionHref;
  } else {
    // Not on main page (e.g., /services)
    finalCurrentPathname = pathname;
  }

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo
            isMobile={false}
            onLogoClick={() => handleLinkClick("/")}
          />
          <NavItems
            items={navItemsDesktop.map((item) => ({
              name: item.name,
              link: item.href,
            }))}
            currentPathname={finalCurrentPathname}
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
            <NavbarLogo
              isMobile={true}
              onLogoClick={() => handleLinkClick("/")}
            />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}>
            {/* Map your mobile-specific nav items */}
            {navItemsMobile.map((item, idx) => {
              if (item.href.startsWith("/")) {
                // Internal link, use Link
                return (
                  <Link
                    key={`mobile-link-${idx}`}
                    to={item.href}
                    onClick={() => handleLinkClick(item.href)}
                    className={`relative block py-2 font-[var(--launchpad-poppins-font)] text-neutral-600 dark:text-neutral-300 hover:bg-[var(--launchpad-blue-hover)] hover:text-white hover:dark:bg-[var(--launchpad-blue-hover)] hover:rounded-md hover:px-2 ${
                      finalCurrentPathname === item.href
                        ? "bg-[var(--launchpad-blue-hover)] text-white dark:bg-[var(--launchpad-blue-hover)] rounded-md px-2"
                        : ""
                    }`}>
                    <span>{item.name}</span>
                  </Link>
                );
              } else {
                // Anchor link
                return (
                  <a
                    key={`mobile-link-${idx}`}
                    href={item.href}
                    onClick={() => handleLinkClick(item.href)}
                    className={`relative block py-2 font-[var(--launchpad-poppins-font)] text-neutral-600 dark:text-neutral-300 hover:bg-[var(--launchpad-blue-hover)] hover:text-white hover:dark:bg-[var(--launchpad-blue-hover)] hover:rounded-md hover:px-2 ${
                      finalCurrentPathname === item.href
                        ? "bg-[var(--launchpad-blue-hover)] text-white dark:bg-[var(--launchpad-blue-hover)] rounded-md px-2"
                        : ""
                    }`}>
                    <span>{item.name}</span>
                  </a>
                );
              }
            })}
            {/* Removed Login/Book a call buttons from mobile */}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      {/* DummyContent was already removed by user */}
    </div>
  );
}
