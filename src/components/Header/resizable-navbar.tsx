"use client";
import { cn } from "../../lib/utils"; // Adjusted path
import { IconMenu2, IconX } from "@tabler/icons-react";
// Removed Github, Linkedin, Instagram from here as SocialLinks component will handle them
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { RollingText } from "../animate-ui/text/rolling"; // Added import
import { Link } from "react-router-dom"; // Import Link
import SocialLinks from "../ui/SocialLinks"; // Import the new component

import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void; // Will be replaced by onLinkClick for more specific handling
  visible?: boolean;
  currentPathname?: string; // Changed from activeLink
  onLinkClick?: (link: string) => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean; // Add visible prop
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("fixed inset-x-0 top-2 z-40 w-full", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
    </motion.div>
  );
};

// Removed the old socialLinks array

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "1000px" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex dark:bg-transparent",
        visible && "bg-launchpad-navy",
        className
      )}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
      {/* Social Icons */}
      <SocialLinks
        iconClassName={cn(
          "text-launchpad-white hover:text-launchpad-blue", // Base style
          visible
            ? "text-launchpad-white" // Scrolled state for icons in header
            : "text-launchpad-white dark:text-neutral-300" // Default state for icons in header
        )}
      />
    </motion.div>
  );
};

export const NavItems = ({
  items,
  className,
  visible,
  currentPathname, // Changed from activeLink
  onLinkClick, // This is primarily for anchor links now
}: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className
      )}>
      {items.map((item, idx) => {
        const commonClassNames = cn(
          "relative px-4 py-2 font-[var(--launchpad-poppins-font)]",
          visible
            ? "text-launchpad-white"
            : "text-launchpad-white dark:text-neutral-300"
        );

        const motionDiv = (
          isActuallyActive: boolean // Renamed param for clarity
        ) => (
          <motion.div
            layoutId={
              isActuallyActive
                ? `active-highlight-${item.link}`
                : `hover-highlight-${item.link}`
            } // Unique IDs
            className={cn(
              "absolute inset-0 h-full w-full rounded-full",
              "bg-[var(--launchpad-blue-hover)]"
            )}
            initial={false}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
          />
        );

        if (item.link.startsWith("/")) {
          // Internal link, use React Router's Link
          // For active state, NavLink would be better, but Link is a start
          return (
            <Link
              to={item.link}
              key={`link-${idx}`}
              onMouseEnter={() => setHovered(idx)}
              onClick={() => {
                if (onLinkClick) onLinkClick(item.link); // May still want to call this for consistency or if it updates parent state
                // For router links, active state is often handled by NavLink or useLocation
              }}
              className={commonClassNames}>
              {(hovered === idx || currentPathname === item.link) &&
                motionDiv(currentPathname === item.link)}
              <span className="relative z-20">{item.name}</span>
            </Link>
          );
        } else {
          // External or anchor link, use regular <a>
          return (
            <a
              href={item.link}
              key={`link-${idx}`}
              onMouseEnter={() => setHovered(idx)}
              onClick={() => onLinkClick && onLinkClick(item.link)}
              className={commonClassNames}>
              {(hovered === idx || currentPathname === item.link) &&
                motionDiv(currentPathname === item.link)}
              <span className="relative z-20">{item.name}</span>
            </a>
          );
        }
      })}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "4px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible && "bg-white/80 dark:bg-neutral-950/80",
        className
      )}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible } // Pass visible to children of MobileNav
            )
          : child
      )}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
  visible, // Receive visible prop
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible } // Pass visible to children of MobileNavHeader
            )
          : child
      )}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-[4.5rem] z-50 flex w-full flex-col items-start justify-start gap-4 rounded-[4px] bg-white/80 px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-neutral-950/80",
            className
          )}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
  visible, // Add visible prop
}: {
  isOpen: boolean;
  onClick: () => void;
  visible?: boolean; // Make visible optional as it might not always be passed from all usages
}) => {
  const iconColor = visible
    ? "text-launchpad-navy" // Scrolled state
    : "text-launchpad-white"; // Default state

  return isOpen ? (
    <IconX className={cn(iconColor, "dark:text-white")} onClick={onClick} />
  ) : (
    <IconMenu2 className={cn(iconColor, "dark:text-white")} onClick={onClick} />
  );
};

export const NavbarLogo = ({
  visible,
  isMobile,
  onLogoClick, // Add onLogoClick prop
}: {
  visible?: boolean;
  isMobile?: boolean;
  onLogoClick?: () => void; // Define prop type
}) => {
  const defaultColor = "text-launchpad-white";
  let logoTextColor = defaultColor;

  if (isMobile) {
    logoTextColor = visible ? "text-launchpad-navy" : defaultColor;
  } else {
    // For desktop, color is always white, unless 'visible' makes it navy (original logic for desktop)
    // However, user feedback was to keep desktop always white on top, and navy when scrolled.
    // The NavBody component itself handles the background change, and NavItems handles its text color.
    // NavbarLogo on desktop should remain white unless the NavBody's background makes it hard to see.
    // For now, let's stick to the user's explicit request: mobile changes, desktop doesn't change based on this specific logic.
    // The desktop version's text color is primarily handled by its parent's (NavBody) styling context.
    // The `visible` prop on NavBody changes its background to a gradient where white text is fine.
    // So, for desktop, we can keep it white.
    logoTextColor = defaultColor; // Default to white for desktop, scroll changes are handled by NavBody's theme
    // If NavBody's `visible` state implies a background where white is not good, this might need adjustment.
    // For now, assuming white is fine on desktop scrolled state due to NavBody's gradient.
    // If the desktop logo *also* needs to turn navy when scrolled, this logic needs to be:
    // logoTextColor = visible ? "text-launchpad-navy" : defaultColor; (for both mobile and desktop)
    // But user specified *only* mobile.
  }

  // If we want desktop to also change color when scrolled (visible = true)
  // const logoTextColor = visible ? "text-launchpad-navy" : "text-launchpad-white";

  return (
    <Link
      to="/" // Navigate to home
      onClick={onLogoClick} // Call the passed handler
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-xl font-normal">
      <img
        src="/src/assets/images/rocket.svg"
        alt="logo"
        width={40}
        height={40}
      />
      <RollingText
        text="LAUNCHPAD"
        className={cn(
          "font-overpass uppercase tracking-wider dark:text-white",
          logoTextColor
        )}
      />
    </Link>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}>
      {children}
    </Tag>
  );
};
