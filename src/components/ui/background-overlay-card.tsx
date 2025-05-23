"use client";
import { cn } from "@/lib/utils";
import React from "react";

interface BackgroundOverlayCardProps {
  imageUrl: string;
  hoverImageUrl: string;
  title?: string;
  description?: string;
  className?: string;
}

export const BackgroundOverlayCard: React.FC<BackgroundOverlayCardProps> = ({
  imageUrl,
  hoverImageUrl,
  title,
  description,
  className,
}) => {
  return (
    <div className={cn("w-full", className)}>
      {/* NEW Outer div for gradient border */}
      <div
        className={cn(
          "rounded-md p-1 border border-[var(--launchpad-gray)]", // Changed to solid border
          "shadow-lg"
        )}>
        {/* Existing card div, now the INNER part of the gradient border */}
        <div
          className={cn(
            "group w-full h-full cursor-pointer overflow-hidden relative card h-96 rounded-md flex flex-col justify-end p-4", // Removed old border & shadow, added h-full
            "bg-cover bg-center",
            "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
            "transition-all duration-500"
          )}
          style={{ backgroundImage: `url(${imageUrl})` }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundImage = `url(${hoverImageUrl})`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundImage = `url(${imageUrl})`;
          }}>
          {/* Preload hover image div */}
          <div
            className="fixed inset-0 opacity-0 z-[-1]"
            style={{ backgroundImage: `url(${hoverImageUrl})` }}
          />
          <div className="text relative z-50">
            <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
              {title}
            </h1>
            <p className="font-normal text-base text-gray-50 relative my-4">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundOverlayCard;
