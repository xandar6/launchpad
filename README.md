# Launchpad - Digital Solutions

A modern, responsive website for a digital solutions company built with React, TypeScript, and Tailwind CSS.

## Features

- **Modern React Architecture**: Built with React 19, TypeScript, and Vite for optimal performance
- **Responsive Design**: Fully responsive layout that works on all device sizes
- **Component-Based Structure**: Modular components for easy maintenance and reusability
- **Performance Optimized**: Implements code splitting, lazy loading, and advanced image optimization (WebP/AVIF formats, responsive sizes, blur-up loading)
- **Accessibility**: ARIA-compliant components for better accessibility
- **Error Handling**: Robust error boundaries to prevent UI crashes
- **Animation**: Smooth animations and transitions using Framer Motion
- **Form Handling**: Integrated form validation with React Hook Form and Zod
- **Typography**: Enhanced font rendering with antialiasing for better readability

## Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Routing**: React Router v7
- **Form Handling**: React Hook Form + Zod
- **Animation**: Framer Motion

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/launchpad.git
   cd launchpad
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist` directory.

## Image Optimization

This project includes a comprehensive image optimization system. To set it up:

```bash
# Install required dependencies
npm run setup-image-optimization
```

After installing the dependencies, you need to uncomment the image optimizer plugin in `vite.config.ts`.

Then you can use the optimization scripts:

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

For detailed documentation on the image optimization system, see [docs/image-optimization.md](docs/image-optimization.md).

## Font Smoothing

This project includes font smoothing (antialiasing) for better text rendering:

- Global font smoothing applied to all text
- Utility classes for different smoothing types: `font-smooth`, `font-subpixel`, `font-auto`
- React component for easy implementation: `<FontSmoothed>`
- Custom hook for dynamic control: `useFontSmoothing()`

For detailed documentation on font smoothing, see [docs/font-smoothing.md](docs/font-smoothing.md).

## Project Structure

```
launchpad/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images and other assets
│   ├── components/     # Reusable components
│   │   ├── About/      # About section components
│   │   ├── Contact/    # Contact section components
│   │   ├── Footer/     # Footer components
│   │   ├── Header/     # Header and navigation components
│   │   ├── Hero/       # Hero section components
│   │   ├── Intro/      # Intro section components
│   │   ├── Process/    # Process section components
│   │   ├── Projects/   # Projects section components
│   │   ├── animate-ui/ # Animation components
│   │   ├── ui/         # UI components (buttons, cards, etc.)
│   │   └── utils/      # Utility components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   ├── App.tsx         # Main App component
│   ├── index.css       # Global styles
│   └── main.tsx        # Entry point
├── eslint.config.js    # ESLint configuration
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```
