/**
 * Advanced Image Optimization Script
 *
 * This script optimizes images in the src/assets/images directory.
 * It uses Sharp to resize, compress, and convert images to modern formats.
 *
 * Features:
 * - Creates multiple size variants for responsive images
 * - Converts images to WebP and AVIF formats
 * - Preserves directory structure
 * - Generates low-quality placeholders for blur-up effect
 * - Optimizes JPG, PNG, and GIF images
 *
 * Usage:
 * node scripts/optimize-images.js [--quality=80] [--formats=webp,avif,original] [--skip-existing]
 */

// Note: To use this script, you need to:
// 1. Install Sharp: npm install sharp
// 2. Install command-line args parser: npm install yargs
// 3. Run this script as part of your build process

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

// Parse command line arguments
const argv = yargs(hideBin(process.argv))
  .option("quality", {
    alias: "q",
    description: "Image quality (1-100)",
    type: "number",
    default: 80,
  })
  .option("formats", {
    alias: "f",
    description: "Output formats (comma-separated)",
    type: "string",
    default: "webp,avif,original",
  })
  .option("sizes", {
    alias: "s",
    description: "Output sizes (comma-separated)",
    type: "string",
    default: "320,640,768,1024,1280,1536,1920",
  })
  .option("skip-existing", {
    description: "Skip existing optimized images",
    type: "boolean",
    default: true,
  })
  .option("input", {
    alias: "i",
    description: "Input directory",
    type: "string",
    default: "../src/assets/images",
  })
  .option("output", {
    alias: "o",
    description: "Output directory",
    type: "string",
    default: "../src/assets/optimized",
  })
  .option("placeholders", {
    alias: "p",
    description: "Generate blur placeholders",
    type: "boolean",
    default: true,
  })
  .help()
  .alias("help", "h").argv;

// Configuration
const IMAGE_DIR = path.join(__dirname, argv.input);
const OUTPUT_DIR = path.join(__dirname, argv.output);
const QUALITY = argv.quality;
const FORMATS = argv.formats.split(",");
const SIZES = argv.sizes.split(",").map((size) => parseInt(size, 10));
const SKIP_EXISTING = argv["skip-existing"];
const GENERATE_PLACEHOLDERS = argv.placeholders;

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Get all image files recursively
function getAllImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllImageFiles(filePath, fileList);
    } else if (/\.(jpg|jpeg|png|gif)$/i.test(file)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Process each image
async function processImages() {
  console.log("Starting advanced image optimization...");
  console.log(`Quality: ${QUALITY}%`);
  console.log(`Formats: ${FORMATS.join(", ")}`);
  console.log(`Sizes: ${SIZES.join(", ")}`);

  const imageFiles = getAllImageFiles(IMAGE_DIR);
  console.log(`Found ${imageFiles.length} images to process`);

  let processed = 0;
  let skipped = 0;

  for (const inputPath of imageFiles) {
    // Get relative path from IMAGE_DIR
    const relativePath = path.relative(IMAGE_DIR, inputPath);
    const dirName = path.dirname(relativePath);
    const fileName = path.basename(inputPath);
    const fileNameWithoutExt = path.basename(fileName, path.extname(fileName));

    // Create output directory structure
    const outputDirPath = path.join(OUTPUT_DIR, dirName);
    if (!fs.existsSync(outputDirPath)) {
      fs.mkdirSync(outputDirPath, { recursive: true });
    }

    // Skip already optimized images
    if (
      fileNameWithoutExt.includes("-optimized") ||
      fileNameWithoutExt.includes("-placeholder")
    ) {
      skipped++;
      continue;
    }

    console.log(`Processing ${relativePath}...`);

    try {
      // Get image metadata
      const metadata = await sharp(inputPath).metadata();

      // Generate a tiny placeholder for blur-up effect
      if (GENERATE_PLACEHOLDERS) {
        const placeholderPath = path.join(
          outputDirPath,
          `${fileNameWithoutExt}-placeholder.webp`
        );

        if (!SKIP_EXISTING || !fs.existsSync(placeholderPath)) {
          await sharp(inputPath)
            .resize(20) // Tiny size for placeholder
            .webp({ quality: 20 })
            .toFile(placeholderPath);
        }
      }

      // Process each format
      for (const format of FORMATS) {
        if (format === "original") {
          // For original format, keep the original extension but still optimize
          const ext = path.extname(inputPath).toLowerCase();

          // Process each size
          for (const size of SIZES) {
            // Skip sizes larger than the original
            if (size > metadata.width) continue;

            const outputPath = path.join(
              outputDirPath,
              `${fileNameWithoutExt}-${size}${ext}`
            );

            if (SKIP_EXISTING && fs.existsSync(outputPath)) {
              continue;
            }

            let sharpInstance = sharp(inputPath).resize(size);

            // Apply format-specific optimizations
            if (ext === ".jpg" || ext === ".jpeg") {
              sharpInstance = sharpInstance.jpeg({
                quality: QUALITY,
                progressive: true,
                mozjpeg: true,
              });
            } else if (ext === ".png") {
              sharpInstance = sharpInstance.png({
                quality: QUALITY,
                compressionLevel: 9,
                palette: true,
              });
            } else if (ext === ".gif") {
              // Sharp doesn't optimize GIFs well, just resize
              sharpInstance = sharpInstance.gif();
            }

            await sharpInstance.toFile(outputPath);
          }
        } else {
          // For WebP and AVIF formats
          // Process each size
          for (const size of SIZES) {
            // Skip sizes larger than the original
            if (size > metadata.width) continue;

            const outputPath = path.join(
              outputDirPath,
              `${fileNameWithoutExt}-${size}.${format}`
            );

            if (SKIP_EXISTING && fs.existsSync(outputPath)) {
              continue;
            }

            if (format === "webp") {
              await sharp(inputPath)
                .resize(size)
                .webp({
                  quality: QUALITY,
                  effort: 6, // Higher effort = better compression but slower
                })
                .toFile(outputPath);
            } else if (format === "avif") {
              await sharp(inputPath)
                .resize(size)
                .avif({
                  quality: QUALITY,
                  effort: 9, // AVIF is slower but provides better compression
                })
                .toFile(outputPath);
            }
          }
        }
      }

      processed++;
    } catch (err) {
      console.error(`Error processing ${relativePath}:`, err);
    }
  }

  console.log("\nImage optimization complete!");
  console.log(`Processed: ${processed} images`);
  console.log(`Skipped: ${skipped} images`);
}

// Check if Sharp is installed
try {
  require.resolve("sharp");
  require.resolve("yargs");

  // Run the optimization
  processImages().catch((err) => {
    console.error("Error in image optimization process:", err);
    process.exit(1);
  });
} catch (err) {
  console.error("\n\n========================================================");
  console.error("Required dependencies are missing. Please install them:");
  console.error("npm install sharp yargs --save-dev");
  console.error("Or use the setup script:");
  console.error("npm run setup-image-optimization");
  console.error("========================================================\n");

  // Create a simple directory structure to avoid errors
  try {
    const outputDir = path.join(__dirname, "../src/assets/optimized");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log("Created optimized images directory:", outputDir);
      console.log(
        "Once dependencies are installed, run this script again to optimize images."
      );
    }
  } catch (dirErr) {
    console.error(
      "Could not create optimized images directory:",
      dirErr.message
    );
  }

  process.exit(1);
}
