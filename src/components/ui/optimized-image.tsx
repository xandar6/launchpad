import React, { useState, useEffect } from "react";
import {
  type OptimizedImageProps,
  getResponsiveImageUrl,
  shouldLazyLoad,
  generateSrcSet,
  generateSizes,
  getPlaceholder,
  type ImageFormat,
  ImageQualityValues, // Import for values
  LoadingStrategyValues, // Import for values
  // Types ImageQuality and LoadingStrategy will be resolved via OptimizedImageProps from imageUtils
} from "../../lib/imageUtils";

/**
 * Advanced OptimizedImage component for better performance and user experience
 * - Supports responsive images with srcset and sizes
 * - Implements multiple loading strategies (eager, lazy, progressive)
 * - Supports modern image formats (WebP, AVIF)
 * - Provides placeholder (blur or color) while loading
 * - Handles loading and error states
 * - Supports art direction with different aspect ratios
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  aboveTheFold = false,
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  format = "webp",
  quality = ImageQualityValues.HIGH,
  loading: loadingStrategy,
  objectFit = "cover",
  placeholder = "color",
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Determine loading strategy
  const loading = loadingStrategy || shouldLazyLoad(priority, aboveTheFold);

  // Handle intersection observer for progressive loading
  useEffect(() => {
    if (loading !== LoadingStrategyValues.PROGRESSIVE) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // Start loading when image is 200px from viewport
        threshold: 0.01,
      }
    );

    const currentElement = document.getElementById(
      `img-${src.replace(/[^a-zA-Z0-9]/g, "-")}`
    );
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, loading]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate image attributes
  const placeholderValue = getPlaceholder(
    src,
    placeholder === "blur" ? "blur" : "color"
  );
  const srcSet = isVisible
    ? generateSrcSet(src, undefined, format, quality)
    : "";
  const sizesAttr = generateSizes(sizes);
  const imageId = `img-${src.replace(/[^a-zA-Z0-9]/g, "-")}`;

  // Generate fallback formats for browsers that don't support WebP or AVIF
  const generateFallbackSources = () => {
    if (format === "original" || !isVisible) return null;

    const formats: ImageFormat[] = [];

    // If using AVIF, add WebP and JPEG fallbacks
    if (format === "avif") {
      formats.push("webp", "jpg");
    }
    // If using WebP, add JPEG fallback
    else if (format === "webp") {
      formats.push("jpg");
    }

    return formats.map((fallbackFormat) => (
      <source
        key={`${imageId}-${fallbackFormat}`}
        type={`image/${fallbackFormat}`}
        srcSet={generateSrcSet(src, undefined, fallbackFormat, quality)}
        sizes={sizesAttr}
      />
    ));
  };

  return (
    <div
      id={imageId}
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundColor:
          typeof placeholderValue === "string" &&
          placeholderValue.startsWith("#")
            ? placeholderValue
            : undefined,
        aspectRatio: width && height ? `${width}/${height}` : "auto",
      }}>
      {/* Blur placeholder for progressive loading */}
      {loading === LoadingStrategyValues.PROGRESSIVE &&
        placeholder === "blur" &&
        !isLoaded && (
          <div
            className="absolute inset-0 scale-110 bg-center bg-no-repeat bg-cover blur-sm"
            style={{
              backgroundImage: `url(${placeholderValue})`,
              opacity: isLoaded ? 0 : 1,
              transition: "opacity 0.2s ease-out",
            }}
          />
        )}

      {!hasError ? (
        <picture>
          {/* Generate fallback sources for different formats */}
          {generateFallbackSources()}

          <img
            src={
              isVisible
                ? getResponsiveImageUrl(src, width, height, format, quality)
                : ""
            }
            srcSet={srcSet}
            sizes={sizesAttr}
            alt={alt}
            width={width}
            height={height}
            loading={loading === LoadingStrategyValues.LAZY ? "lazy" : "eager"}
            decoding={priority ? "sync" : "async"}
            onLoad={handleLoad}
            onError={handleError}
            className={`w-full h-full transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-20"
            }`}
            style={{ objectFit }}
          />
        </picture>
      ) : (
        <div className="flex items-center justify-center w-full h-full text-gray-500 bg-gray-200">
          <span>Image failed to load</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
