import React, { type ReactNode } from "react";
import {
  type FontSmoothingType,
  getFontSmoothingClass,
  getFontSmoothingStyles,
} from "../../lib/fontUtils";

interface FontSmoothedProps {
  children: ReactNode;
  as?: React.ElementType;
  type?: FontSmoothingType;
  className?: string;
  responsive?: boolean;
  useInlineStyles?: boolean;
}

/**
 * FontSmoothed Component
 *
 * A component that applies font smoothing to its children.
 *
 * @param {ReactNode} children - The content to be rendered with font smoothing
 * @param {React.ElementType} as - The HTML element to render (default: div)
 * @param {FontSmoothingType} type - The type of font smoothing to apply (default: antialiased)
 * @param {string} className - Additional CSS classes to apply
 * @param {boolean} responsive - Whether to adjust smoothing based on screen resolution
 * @param {boolean} useInlineStyles - Whether to use inline styles instead of CSS classes
 */
const FontSmoothed: React.FC<FontSmoothedProps> = ({
  children,
  as: Component = "div",
  type = "antialiased",
  className = "",
  responsive = false,
  useInlineStyles = false,
}) => {
  // Get the appropriate CSS class for font smoothing
  const smoothingClass = getFontSmoothingClass(type);

  // Get inline styles if needed
  const inlineStyles = useInlineStyles ? getFontSmoothingStyles(type) : {};

  // If responsive, add media query handling via CSS
  const responsiveClass = responsive ? "font-responsive" : "";

  return (
    <Component
      className={`${
        useInlineStyles ? "" : smoothingClass
      } ${responsiveClass} ${className}`}
      style={useInlineStyles ? inlineStyles : undefined}>
      {children}
    </Component>
  );
};

export default FontSmoothed;
