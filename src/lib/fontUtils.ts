/**
 * Font Utilities
 * 
 * Utility functions for working with fonts and text rendering
 */

export type FontSmoothingType = 'antialiased' | 'subpixel' | 'auto';

/**
 * Get CSS properties for font smoothing
 * 
 * @param type - The type of font smoothing to apply
 * @returns Object with CSS properties for font smoothing
 */
export function getFontSmoothingStyles(type: FontSmoothingType = 'antialiased'): Record<string, string> {
  switch (type) {
    case 'antialiased':
      return {
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
      };
    case 'subpixel':
      return {
        WebkitFontSmoothing: 'subpixel-antialiased',
        MozOsxFontSmoothing: 'auto',
        textRendering: 'optimizeLegibility',
      };
    case 'auto':
    default:
      return {
        WebkitFontSmoothing: 'auto',
        MozOsxFontSmoothing: 'auto',
        textRendering: 'auto',
      };
  }
}

/**
 * Get CSS class name for font smoothing
 * 
 * @param type - The type of font smoothing to apply
 * @returns CSS class name for font smoothing
 */
export function getFontSmoothingClass(type: FontSmoothingType = 'antialiased'): string {
  switch (type) {
    case 'antialiased':
      return 'font-smooth';
    case 'subpixel':
      return 'font-subpixel';
    case 'auto':
    default:
      return 'font-auto';
  }
}

/**
 * Determine if font smoothing should be applied based on the background color
 * 
 * @param backgroundColor - The background color (hex, rgb, etc.)
 * @returns The recommended font smoothing type
 */
export function getRecommendedFontSmoothing(backgroundColor: string): FontSmoothingType {
  // Convert to lowercase for case-insensitive comparison
  const color = backgroundColor.toLowerCase();
  
  // Check if it's a dark color (this is a simple check, not perfect)
  const isDark = 
    color === 'black' || 
    color.startsWith('#0') || 
    color.startsWith('#1') || 
    color.startsWith('#2') || 
    color.startsWith('#3') || 
    color.startsWith('rgb(0,') || 
    color.startsWith('rgb(1,') || 
    color.startsWith('rgb(2,') || 
    color.startsWith('rgb(3,') || 
    color.startsWith('rgba(0,') || 
    color.startsWith('rgba(1,') || 
    color.startsWith('rgba(2,') || 
    color.startsWith('rgba(3,');
  
  // For dark backgrounds, antialiased looks better
  // For light backgrounds, subpixel often looks better
  return isDark ? 'antialiased' : 'subpixel';
}

/**
 * Get font weight based on the font smoothing type
 * 
 * Sometimes you need to adjust font weight when using different smoothing types
 * 
 * @param baseWeight - The base font weight (400, 500, etc.)
 * @param type - The font smoothing type
 * @returns Adjusted font weight
 */
export function getAdjustedFontWeight(baseWeight: number, type: FontSmoothingType): number {
  // Antialiased can make fonts look lighter, so we might want to increase weight
  // Subpixel can make fonts look heavier, so we might want to decrease weight
  switch (type) {
    case 'antialiased':
      // For very light fonts, increase weight slightly
      return baseWeight < 400 ? baseWeight + 100 : baseWeight;
    case 'subpixel':
      // For very heavy fonts, decrease weight slightly
      return baseWeight > 700 ? baseWeight - 100 : baseWeight;
    default:
      return baseWeight;
  }
}
