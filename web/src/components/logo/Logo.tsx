"use client";

import { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../settings/SettingsProvider";
import { OnyxIcon, OnyxLogoTypeIcon } from "../icons/icons";
import Image from "next/image";
import { useTheme } from "next-themes";

export function Logo({
  height,
  width,
  className,
  size = "default",
}: {
  height?: number;
  width?: number;
  className?: string;
  size?: "small" | "default" | "large";
}) {
  const settings = useContext(SettingsContext);
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const effectiveTheme = theme === "system" ? systemTheme : theme;
  const isDarkMode = effectiveTheme === "dark";

  const sizeMap = {
    small: { height: 24, width: 22 },
    default: { height: 32, width: 30 },
    large: { height: 48, width: 45 },
  };

  const { height: defaultHeight, width: defaultWidth } = sizeMap[size];
  height = height || defaultHeight;
  width = width || defaultWidth;

  if (!mounted) return null; // Prevents hydration mismatch

  // Check if a custom logo is used
  if (
    !settings ||
    !settings.enterpriseSettings ||
    !settings.enterpriseSettings.use_custom_logo
  ) {
    return (
      <div style={{ height, width }} className={className}>
        <Image
          src={isDarkMode ? "/logo.png" : "/logo-dark.png"}
          alt="Company Logo"
          width={width}
          height={height}
          priority
        />
      </div>
    );
  }

  // If a custom logo is used, load it
  return (
    <div style={{ height, width }} className={className}>
      <Image
        src={isDarkMode ? settings.enterpriseSettings.dark_logo_url : settings.enterpriseSettings.light_logo_url}
        alt="Custom Company Logo"
        width={width}
        height={height}
        priority
      />
    </div>
  );
}
export function LogoType({
  size = "default",
}: {
  size?: "small" | "default" | "large";
}) {
  return (
    <OnyxLogoTypeIcon
      size={115}
      className={`items-center w-full dark:text-[#fff]`}
    />
  );
}
