# Image Optimization System

This document explains the comprehensive image optimization system implemented in the Launchpad project.

## Setup

Before using the image optimization system, you need to install the required dependencies:

```bash
# Run the setup script
npm run setup-image-optimization
```

This will install:

- `sharp` - For image processing
- `yargs` - For command-line arguments parsing
- `vite-plugin-image-optimizer` - For build-time image optimization

After installing the dependencies, you need to uncomment the image optimizer plugin in `vite.config.ts`.

## Overview

The image optimization system consists of several components:

1. **Server-side optimization script** - Processes images during build time
2. **Vite plugin for image optimization** - Optimizes images during the build process
3. **Client-side image components** - Renders optimized images with advanced features
4. **Utility functions and hooks** - Provides helper functions for working with optimized images

## Features

- **Multiple formats** - Supports WebP and AVIF with fallbacks to JPEG/PNG
- **Responsive images** - Creates multiple size variants for different devices
- **Art direction** - Different images for different viewport sizes
- **Lazy loading** - Only loads images when they're about to enter the viewport
- **Blur-up effect** - Shows a blurred placeholder while the image loads
- **Priority loading** - Critical images can be loaded with higher priority
- **Error handling** - Graceful fallbacks when images fail to load

## Usage

### 1. Optimizing Images

Before deployment, run the image optimization script to generate optimized versions of your images:

```bash
# Basic optimization with default settings
npm run optimize-images

# WebP only (faster)
npm run optimize-images:webp

# AVIF + WebP (best compression but slower)
npm run optimize-images:avif

# Higher quality (90%)
npm run optimize-images:high

# Lower quality (60%, smaller file size)
npm run optimize-images:low
```

Advanced usage with custom options:

```bash
node scripts/optimize-images.js --quality=75 --formats=webp,original --sizes=640,1024,1920
```

### 2. Using the NextGenImage Component

The `NextGenImage` component provides the most advanced features:

```tsx
import NextGenImage from '@/components/ui/next-gen-image';
import { ImageQuality } from '@/lib/imageUtils';

// Basic usage
<NextGenImage
  src="/src/assets/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
/>

// Advanced usage
<NextGenImage
  src="/src/assets/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority={true} // Load immediately
  aboveTheFold={true} // Image is visible in the initial viewport
  format="avif" // Use AVIF format with WebP and JPEG fallbacks
  quality={ImageQuality.HIGH} // 85% quality
  placeholder="blur" // Use blur-up effect
  objectFit="cover"
  fetchPriority="high"
  artDirection={[
    {
      media: "(max-width: 640px)",
      src: "/src/assets/images/hero-mobile.jpg",
      width: 640,
      height: 480
    }
  ]}
  onLoad={() => console.log('Image loaded')}
  onError={() => console.log('Image failed to load')}
/>
```

### 3. Using the OptimizedImage Component

The `OptimizedImage` component is a simpler alternative:

```tsx
import OptimizedImage from "@/components/ui/optimized-image";
import { ImageQuality, LoadingStrategy } from "@/lib/imageUtils";

<OptimizedImage
  src="/src/assets/images/product.jpg"
  alt="Product image"
  width={800}
  height={600}
  priority={false}
  format="webp"
  quality={ImageQuality.MEDIUM}
  loading={LoadingStrategy.LAZY}
  placeholder="color"
/>;
```

### 4. Using the useResponsiveImage Hook

For custom image implementations:

```tsx
import { useResponsiveImage } from "@/hooks/useResponsiveImage";
import { ImageQuality } from "@/lib/imageUtils";

function MyCustomImage({ src, alt }) {
  const {
    src: optimizedSrc,
    srcSet,
    sizes,
    isLoading,
    isError,
  } = useResponsiveImage({
    src,
    width: 800,
    format: "webp",
    quality: ImageQuality.HIGH,
    preload: true,
  });

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError ? (
        <div>Error loading image</div>
      ) : (
        <img src={optimizedSrc} srcSet={srcSet} sizes={sizes} alt={alt} />
      )}
    </div>
  );
}
```

## Best Practices

1. **Use WebP for most images** - It offers good compression with wide browser support
2. **Use AVIF for critical images** - Better compression but slower to encode
3. **Set appropriate `width` and `height`** - Prevents layout shifts
4. **Use `priority` for above-the-fold images** - Improves LCP (Largest Contentful Paint)
5. **Use art direction for important images** - Provides better user experience on different devices
6. **Optimize original images before processing** - Use tools like ImageOptim or TinyPNG
7. **Use appropriate quality settings** - 75-85% is usually a good balance

## Technical Details

### Image Formats Support

| Format | Compression | Browser Support | Use Case        |
| ------ | ----------- | --------------- | --------------- |
| AVIF   | Best        | Good            | Critical images |
| WebP   | Better      | Excellent       | Most images     |
| JPEG   | Good        | Universal       | Fallback        |
| PNG    | Fair        | Universal       | Transparency    |

### Responsive Sizes

The system generates these default sizes for responsive images:

- 320px (small mobile)
- 640px (mobile)
- 768px (tablet)
- 1024px (small desktop)
- 1280px (desktop)
- 1536px (large desktop)
- 1920px (extra large desktop)

## Troubleshooting

If you encounter issues:

1. **Images not optimizing** - Make sure Sharp and Yargs are installed
2. **AVIF encoding errors** - Try using WebP instead or update Sharp
3. **Images not loading** - Check file paths and make sure optimization script ran
4. **Blurry images** - Increase quality setting or use larger size variants
