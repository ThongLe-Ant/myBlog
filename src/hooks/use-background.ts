
'use client'

import { useEffect } from "react";

type BackgroundType = "default" | "custom";

export function useBackground() {
  const applyBackground = (type: BackgroundType, customUrl?: string) => {
    const body = document.body;
    
    if (type === "custom" && customUrl) {
      // Custom image background
      body.style.backgroundImage = `url(${customUrl})`;
      body.style.backgroundSize = "cover";
      body.style.backgroundPosition = "center";
      body.style.backgroundRepeat = "no-repeat";
      body.classList.add("custom-bg");
    } else {
      // On default, clear inline styles so globals.css takes over
      body.style.backgroundImage = "";
      body.style.backgroundSize = "";
      body.style.backgroundPosition = "";
      body.style.backgroundRepeat = "";
      body.classList.remove("custom-bg");
    }

    // Save to localStorage
    localStorage.setItem("backgroundType", type);
    if (type === 'custom' && customUrl) {
      localStorage.setItem("customBackground", customUrl);
    } else {
      localStorage.removeItem("customBackground");
    }
  };

  useEffect(() => {
    // Load saved background on mount
    const savedType = localStorage.getItem("backgroundType") as BackgroundType | null;
    const savedImage = localStorage.getItem("customBackground");

    if (savedType === "custom" && savedImage) {
      applyBackground("custom", savedImage);
    } else {
      applyBackground("default");
    }
  }, []);

  return { applyBackground };
}
