import { useState, useEffect } from 'react';
import {
  type ImageFormat,
  ImageQualityValues,
  type ImageQuality,
  getResponsiveImageUrl,
  generateSrcSet,
  generateSizes
} from '../lib/imageUtils';

interface ResponsiveImageOptions {
  src: string;
  width?: number;
  height?: number;
  format?: ImageFormat;
  quality?: ImageQuality;
  sizes?: string;
  preload?: boolean;
}

interface ResponsiveImageResult {
  src: string;
  srcSet: string;
  sizes: string;
  isLoading: boolean;
  isError: boolean;
  preloadImage: () => void;
}

/**
 * Custom hook for handling responsive images with various formats and sizes
 *
 * Features:
 * - Generates optimized image URLs for different formats and sizes
 * - Supports preloading of images
 * - Tracks loading and error states
 * - Provides srcSet and sizes attributes for responsive images
 */
export function useResponsiveImage({
  src,
  width,
  height,
  format = 'webp',
  quality = ImageQualityValues.HIGH,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  preload = false
}: ResponsiveImageOptions): ResponsiveImageResult {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Generate optimized image URL
  const optimizedSrc = getResponsiveImageUrl(src, width, height, format, quality);

  // Generate srcSet for responsive images
  const srcSet = generateSrcSet(src, undefined, format, quality);

  // Generate sizes attribute
  const sizesAttr = generateSizes(sizes);

  // Preload image function
  const preloadImage = () => {
    const img = new Image();
    img.src = optimizedSrc;
    img.onload = () => setIsLoading(false);
    img.onerror = () => {
      setIsLoading(false);
      setIsError(true);
    };
  };

  // Preload image if preload option is true
  useEffect(() => {
    if (preload) {
      preloadImage();
    } else {
      // If not preloading, still update loading state after a short delay
      // This helps prevent unnecessary loading indicators for cached images
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [src, preload]);

  return {
    src: optimizedSrc,
    srcSet,
    sizes: sizesAttr,
    isLoading,
    isError,
    preloadImage
  };
}

/**
 * Helper function to determine if an image should be preloaded
 * based on its importance and position on the page
 */
export function shouldPreloadImage(priority: boolean, aboveTheFold: boolean): boolean {
  return priority || aboveTheFold;
}

/**
 * Helper function to get appropriate image dimensions for different contexts
 */
export function getImageDimensions(
  context: 'thumbnail' | 'small' | 'medium' | 'large' | 'hero' | 'banner' | 'icon' | 'avatar'
): { width: number, height: number } {
  switch (context) {
    case 'thumbnail':
      return { width: 150, height: 150 };
    case 'small':
      return { width: 300, height: 300 };
    case 'medium':
      return { width: 600, height: 600 };
    case 'large':
      return { width: 1200, height: 1200 };
    case 'hero':
      return { width: 1920, height: 1080 };
    case 'banner':
      return { width: 1200, height: 400 };
    case 'icon':
      return { width: 64, height: 64 };
    case 'avatar':
      return { width: 128, height: 128 };
    default:
      return { width: 800, height: 600 };
  }
}
