
'use client'

import { useEffect } from "react";

type BackgroundType = "light" | "custom";

export function useBackground() {
  const applyBackground = (type: BackgroundType, customUrl?: string) => {
    const body = document.body;
    const overlay = document.querySelector(
      ".bg-gradient-overlay",
    ) as HTMLElement;
    const dashboardTitle = document.querySelector(
      'h1[class*="text-white"]',
    ) as HTMLElement;
    const dashboardSubtitle = document.querySelector(
      'p[class*="text-white/90"]',
    ) as HTMLElement;
    const settingsTitle = document.querySelector(
      'h1[class*="text-gray-700"]',
    ) as HTMLElement;
    const settingsSubtitle = document.querySelector(
      'p[class*="text-gray-600"]',
    ) as HTMLElement;

    // Remove all background classes
    body.classList.remove("custom-bg");

    // Remove existing dynamic overlays
    if (overlay) {
      ["#bg-wave-svg", "#bg-simple-wave", "#bg-geo-svg", "#bg-custom-image"].forEach((selector) => {
        const node = overlay.querySelector(selector) as HTMLElement | null;
        if (node && node.parentElement) node.parentElement.removeChild(node);
      });
    }

    // Apply background based on type
    if (type === "custom" && customUrl) {
      // Custom image background
      body.style.backgroundImage = `url(${customUrl})`;
      body.style.backgroundSize = "cover";
      body.style.backgroundPosition = "center";
      body.style.backgroundRepeat = "no-repeat";
      body.classList.add("custom-bg");
      
      // Add overlay for better text readability
      if (overlay) {
        overlay.style.background = "rgba(0, 0, 0, 0.3)";
      }

      // Update text colors for better visibility on custom background
      if (dashboardTitle) {
        dashboardTitle.className = dashboardTitle.className
          .replace(/text-\w+-\d+/, "text-white")
          .replace(/drop-shadow-\w+|$/, "drop-shadow-lg");
      }
      if (dashboardSubtitle) {
        dashboardSubtitle.className =
          dashboardSubtitle.className.replace(
            /text-\w+(-\w+)?\/?\d*/,
            "text-white/90",
          ) + " drop-shadow";
      }
      if (settingsTitle) {
        settingsTitle.className = settingsTitle.className
          .replace(/text-\w+-\d+/, "text-white")
          .replace(/drop-shadow-\w+|$/, "drop-shadow-lg");
      }
      if (settingsSubtitle) {
        settingsSubtitle.className = settingsSubtitle.className.replace(
          /text-\w+(-\w+)?\/?\d*/,
          "text-white/90",
        );
      }
    } else {
      // Default light background
      body.style.background = "#ffffff";
      body.style.backgroundImage = "none";
      body.classList.remove("custom-bg");
      
      if (overlay) {
        overlay.style.background = "transparent";
      }

      // Reset text colors to default
      if (dashboardTitle) {
        dashboardTitle.className = dashboardTitle.className
          .replace("text-white", "text-gray-800")
          .replace("drop-shadow-lg", "drop-shadow-sm");
      }
      if (dashboardSubtitle) {
        dashboardSubtitle.className = dashboardSubtitle.className
          .replace("text-white/90", "text-gray-700")
          .replace("drop-shadow", "");
      }
      if (settingsTitle) {
        settingsTitle.className = settingsTitle.className
          .replace("text-white", "text-gray-800")
          .replace("drop-shadow-lg", "drop-shadow-sm");
      }
      if (settingsSubtitle) {
        settingsSubtitle.className = settingsSubtitle.className.replace(
          "text-white/90",
          "text-gray-700",
        );
      }
    }

    // Save to localStorage
    localStorage.setItem("backgroundType", type);
    if (customUrl) {
      localStorage.setItem("customBackground", customUrl);
    }
  };

  useEffect(() => {
    // Load saved background on mount
    const savedType = localStorage.getItem("backgroundType") as BackgroundType;
    const savedImage = localStorage.getItem("customBackground");

    if (savedType && savedType !== "light") {
      applyBackground(savedType, savedImage || undefined);
    } else {
      // Set default background to light
      applyBackground("light");
    }
  }, []);

  return { applyBackground };
}
