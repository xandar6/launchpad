import { useEffect, useRef } from 'react';
import { type FontSmoothingType, getFontSmoothingStyles } from '../lib/fontUtils';

/**
 * Custom hook for applying font smoothing to a DOM element
 *
 * @param {FontSmoothingType} type - The type of font smoothing to apply
 * @param {boolean} responsive - Whether to adjust smoothing based on media queries
 * @returns {React.RefObject<HTMLElement>} - A ref to attach to the element
 */
export function useFontSmoothing<T extends HTMLElement>(
  type: FontSmoothingType = 'antialiased',
  responsive: boolean = false
) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Get font smoothing styles
    const styles = getFontSmoothingStyles(type);

    // Apply styles to the element
    Object.entries(styles).forEach(([key, value]) => {
      // @ts-expect-error - TypeScript doesn't know about these style properties
      element.style[key] = value;
    });

    // If responsive, add a media query listener to adjust font smoothing
    // based on screen size (optional enhancement)
    let mediaQueryList: MediaQueryList | null = null;
    let updateSmoothingHandler: ((e: MediaQueryListEvent | MediaQueryList) => void) | null = null;

    if (responsive) {
      // For high-DPI screens, subpixel rendering often looks better
      mediaQueryList = window.matchMedia('(min-resolution: 2dppx)');

      updateSmoothingHandler = (e: MediaQueryListEvent | MediaQueryList) => {
        if (e.matches) {
          // High-DPI screen - use subpixel rendering
          // @ts-expect-error - Non-standard property
          element.style.webkitFontSmoothing = 'subpixel-antialiased';
          // @ts-expect-error - Non-standard property
          element.style.MozOsxFontSmoothing = 'auto';
        } else {
          // Standard screen - use the specified type
          const newStyles = getFontSmoothingStyles(type);
          // @ts-expect-error - Non-standard property
          element.style.webkitFontSmoothing = newStyles.WebkitFontSmoothing;
          // @ts-expect-error - Non-standard property
          element.style.MozOsxFontSmoothing = newStyles.MozOsxFontSmoothing;
        }
      };

      // Initial check
      updateSmoothingHandler(mediaQueryList);

      // Add listener
      mediaQueryList.addEventListener('change', updateSmoothingHandler);
    }

    // Cleanup function
    return () => {
      // @ts-expect-error - Non-standard property
      element.style.webkitFontSmoothing = '';
      // @ts-expect-error - Non-standard property
      element.style.MozOsxFontSmoothing = '';
      element.style.textRendering = '';

      if (responsive && mediaQueryList && updateSmoothingHandler) {
        mediaQueryList.removeEventListener('change', updateSmoothingHandler);
      }
    };
  }, [type, responsive]);

  return elementRef;
}

export default useFontSmoothing;
