/**
 * Advanced image handling and optimization utilities
 */

// Image format types supported by the system
export type ImageFormat = 'webp' | 'avif' | 'jpg' | 'png' | 'original';

// Image quality presets
export const ImageQualityValues = {
  LOW: 60,
  MEDIUM: 75,
  HIGH: 85,
  MAXIMUM: 100
} as const;
export type ImageQuality = typeof ImageQualityValues[keyof typeof ImageQualityValues];

// Standard breakpoints for responsive images
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

// Default image sizes for different contexts
export const DEFAULT_IMAGE_SIZES = {
  thumbnail: [150, 150],
  small: [300, 300],
  medium: [600, 600],
  large: [1200, 1200],
  hero: [1920, 1080],
  banner: [1200, 400],
  icon: [64, 64],
  avatar: [128, 128]
};

// Image loading strategies
export const LoadingStrategyValues = {
  EAGER: 'eager',
  LAZY: 'lazy',
  PROGRESSIVE: 'progressive'
} as const;
export type LoadingStrategy = typeof LoadingStrategyValues[keyof typeof LoadingStrategyValues];

/**
 * Determines if an image should be lazy loaded based on its position and importance
 */
export function shouldLazyLoad(priority: boolean = false, aboveTheFold: boolean = false): LoadingStrategy {
  if (priority || aboveTheFold) {
    return LoadingStrategyValues.EAGER;
  }
  return LoadingStrategyValues.LAZY;
}

/**
 * Generates a responsive image URL with appropriate size and format parameters
 * Supports CDN-based image optimization if available
 */
export function getResponsiveImageUrl(
  imageUrl: string,
  width?: number,
  _height?: number, // Re-added, prefixed if unused by internal logic
  format: ImageFormat = 'webp',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _quality?: ImageQuality // Re-added, prefixed if unused by internal logic
): string {
  // Check if the URL is already an absolute URL (external resource)
  if (imageUrl.startsWith('http') || imageUrl.startsWith('//')) {
    return imageUrl;
  }

  // For local images, we can use the optimized versions if they exist
  // This assumes you've run the image optimization script
  if (imageUrl.startsWith('/src/assets/')) {
    const basePath = imageUrl.replace('/src/assets/', '/src/assets/optimized/');
    const extension = format === 'original' ? getExtension(imageUrl) : format;

    // If width is specified, use the closest size variant
    if (width) {
      const sizeVariant = getClosestSizeVariant(width);
      const fileName = getFileNameWithoutExtension(basePath);
      return `${fileName}-${sizeVariant}.${extension}`;
    }

    // If no width specified, just use the format conversion
    const fileName = getFileNameWithoutExtension(basePath);
    return `${fileName}.${extension}`;
  }

  // Fallback to original URL if no optimization is possible
  return imageUrl;
}

/**
 * Generates a set of srcset values for responsive images
 */
export function generateSrcSet(
  imageUrl: string,
  sizes: number[] = [640, 768, 1024, 1280, 1536],
  format: ImageFormat = 'webp',
  quality?: ImageQuality // Re-added
): string {
  return sizes
    .map(size => {
      // Pass height as undefined, and quality
      const url = getResponsiveImageUrl(imageUrl, size, undefined, format, quality);
      return `${url} ${size}w`;
    })
    .join(', ');
}

/**
 * Generates appropriate sizes attribute for responsive images
 * This tells the browser what size the image will be displayed at different viewport widths
 */
export function generateSizes(
  sizes: string = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
): string {
  return sizes;
}

/**
 * Helper component props for optimized images
 */
export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  aboveTheFold?: boolean;
  className?: string;
  sizes?: string;
  format?: ImageFormat;
  quality?: ImageQuality;
  loading?: LoadingStrategy;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  placeholder?: 'blur' | 'color' | 'none';
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Generates a placeholder color or blur data URL for an image
 */
export function getPlaceholder(_imageUrl: string, type: 'blur' | 'color' = 'color'): string {
  if (type === 'blur') {
    // In a real implementation, you would generate a tiny blurred version of the image
    // For now, return a data URL of a gray square
    return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg==';
  }

  // For color placeholder, return a light gray
  return '#f3f4f6';
}

// Helper functions
function getExtension(path: string): string {
  return path.split('.').pop() || 'jpg';
}

function getFileNameWithoutExtension(path: string): string {
  const parts = path.split('.');
  parts.pop(); // Remove extension
  return parts.join('.');
}

function getClosestSizeVariant(width: number): number {
  const standardSizes = [320, 640, 768, 1024, 1280, 1536, 1920];
  return standardSizes.reduce((prev, curr) => {
    return (Math.abs(curr - width) < Math.abs(prev - width)) ? curr : prev;
  });
}
