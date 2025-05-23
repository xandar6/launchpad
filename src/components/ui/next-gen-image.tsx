import React, { useState, useEffect, useRef } from "react";
import {
  type ImageFormat,
  ImageQualityValues,
  type ImageQuality,
  getPlaceholder,
} from "../../lib/imageUtils";
import {
  useResponsiveImage,
  shouldPreloadImage,
} from "../../hooks/useResponsiveImage";

export interface NextGenImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  aboveTheFold?: boolean;
  className?: string;
  imgClassName?: string;
  containerClassName?: string;
  sizes?: string;
  format?: ImageFormat;
  quality?: ImageQuality;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  placeholder?: "blur" | "color" | "none";
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
  fetchPriority?: "high" | "low" | "auto";
  artDirection?: Array<{
    media: string;
    src: string;
    width?: number;
    height?: number;
  }>;
}

/**
 * NextGenImage - Advanced image component with modern optimization techniques
 *
 * Features:
 * - Next.js Image-like API with automatic optimization
 * - Supports WebP and AVIF formats with fallbacks
 * - Implements blur-up and color placeholder techniques
 * - Supports art direction for different viewport sizes
 * - Uses IntersectionObserver for smart loading
 * - Handles errors gracefully with fallbacks
 * - Implements native lazy loading and priority loading
 */
const NextGenImage: React.FC<NextGenImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  aboveTheFold = false,
  className = "",
  imgClassName = "",
  containerClassName = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  format = "webp",
  quality = ImageQualityValues.HIGH,
  objectFit = "cover",
  placeholder = "color",
  fallbackSrc,
  onLoad,
  onError,
  fetchPriority = "auto",
  artDirection = [],
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  // Determine if image should be preloaded
  const shouldPreload = shouldPreloadImage(priority, aboveTheFold);

  // Use our responsive image hook
  const {
    src: optimizedSrc,
    srcSet,
    sizes: sizesAttr,
    isError,
  } = useResponsiveImage({
    src,
    width,
    height,
    format,
    quality,
    sizes,
    preload: shouldPreload,
  });

  // Handle intersection observer for lazy loading
  useEffect(() => {
    if (!imageRef.current || priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // Start loading when image is 200px from viewport
        threshold: 0.01,
      }
    );

    observer.observe(imageRef.current);

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  // Handle image load event
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Handle image error event
  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Get placeholder
  const placeholderValue = getPlaceholder(
    src,
    placeholder === "blur" ? "blur" : "color"
  );

  // Generate unique ID for the image
  const imageId = `img-${src.replace(/[^a-zA-Z0-9]/g, "-")}`;

  // Determine loading attribute
  const loadingAttr = priority ? "eager" : "lazy";

  // Generate art direction sources
  const artDirectionSources = artDirection.map((art, index) => (
    <source
      key={`art-${index}-${art.src}`}
      media={art.media}
      srcSet={isInView ? art.src : ""}
      width={art.width}
      height={art.height}
    />
  ));

  // Generate format fallback sources
  const formatFallbackSources = () => {
    if (!isInView || format === "original") return null;

    const formats: ImageFormat[] = [];

    // If using AVIF, add WebP and JPEG fallbacks
    if (format === "avif") {
      formats.push("webp", "jpg");
    }
    // If using WebP, add JPEG fallback
    else if (format === "webp") {
      formats.push("jpg");
    }

    return formats.map((fallbackFormat, index) => {
      const fallbackSrc = src.replace(
        /\.(jpg|jpeg|png|gif|webp|avif)$/i,
        `.${fallbackFormat}`
      );

      return (
        <source
          key={`format-${index}-${fallbackFormat}`}
          type={`image/${fallbackFormat}`}
          srcSet={fallbackSrc}
          sizes={sizesAttr}
        />
      );
    });
  };

  return (
    <div
      className={`relative overflow-hidden ${containerClassName} ${className}`}
      style={{
        backgroundColor:
          typeof placeholderValue === "string" &&
          placeholderValue.startsWith("#")
            ? placeholderValue
            : undefined,
        aspectRatio: width && height ? `${width}/${height}` : "auto",
      }}>
      {/* Blur placeholder */}
      {placeholder === "blur" && !isLoaded && (
        <div
          className="absolute inset-0 transition-opacity duration-300 scale-110 bg-center bg-no-repeat bg-cover blur-sm"
          style={{
            backgroundImage: `url(${placeholderValue})`,
            opacity: isLoaded ? 0 : 1,
          }}
          aria-hidden="true"
        />
      )}

      {!hasError && !isError ? (
        <picture>
          {/* Art direction sources */}
          {artDirectionSources}

          {/* Format fallback sources */}
          {formatFallbackSources()}

          <img
            ref={imageRef}
            id={imageId}
            src={isInView ? optimizedSrc : ""}
            srcSet={isInView ? srcSet : ""}
            sizes={sizesAttr}
            alt={alt}
            width={width}
            height={height}
            loading={loadingAttr}
            decoding={priority ? "sync" : "async"}
            fetchPriority={fetchPriority}
            onLoad={handleLoad}
            onError={handleError}
            className={`w-full h-full transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            } ${imgClassName}`}
            style={{ objectFit }}
          />
        </picture>
      ) : (
        // Error fallback
        <div className="flex items-center justify-center w-full h-full text-gray-500 bg-gray-200">
          {fallbackSrc ? (
            <img
              src={fallbackSrc}
              alt={alt}
              className={`w-full h-full ${imgClassName}`}
              style={{ objectFit }}
            />
          ) : (
            <span>Image failed to load</span>
          )}
        </div>
      )}
    </div>
  );
};

export default NextGenImage;
