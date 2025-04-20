import { createSystem, defaultConfig } from "@chakra-ui/react"


export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      // 🌈 Colors
      colors: {
        primary: { value: "red" },
        secondary: { value: "red" },
        background: { value: "#F5F5F5" },
        text: { value: "#333" },
        accent: { value: "#FF5722" },
        muted: { value: "#999" },
        // ... more color tokens as needed
      },

      // 🔤 Fonts
      fonts: {
        heading: { value: `'Figtree', sans-serif` },
        body: { value: `'Figtree', sans-serif` },
        mono: { value: `'Menlo', monospace` },
      },

      // 🔠 Font Sizes
      fontSizes: {
        xs: { value: "0.75rem" },
        sm: { value: "0.875rem" },
        md: { value: "1rem" },
        lg: { value: "1.125rem" },
        xl: { value: "1.25rem" },
        "2xl": { value: "1.5rem" },
        "3xl": { value: "1.875rem" },
        "4xl": { value: "2.25rem" },
        "5xl": { value: "3rem" },
        "6xl": { value: "3.75rem" },
        "7xl": { value: "4.5rem" },
        "8xl": { value: "6rem" },
        "9xl": { value: "8rem" },
      },

      // ↔ Spacing
      spacing: {
        px: { value: "1px" },
        "0": { value: "0" },
        "1": { value: "0.25rem" },
        "2": { value: "0.5rem" },
        "3": { value: "0.75rem" },
        "4": { value: "1rem" },
        "5": { value: "1.25rem" },
        "6": { value: "1.5rem" },
        "8": { value: "2rem" },
        "10": { value: "2.5rem" },
        "12": { value: "3rem" },
        "16": { value: "4rem" },
        "20": { value: "5rem" },
        "24": { value: "6rem" },
        "32": { value: "8rem" },
        "40": { value: "10rem" },
        "48": { value: "12rem" },
        "56": { value: "14rem" },
        "64": { value: "16rem" },
      },

      // 🧾 Font Weights
      fontWeights: {
        hairline: { value: "100" },
        thin: { value: "200" },
        light: { value: "300" },
        normal: { value: "400" },
        medium: { value: "500" },
        semibold: { value: "600" },
        bold: { value: "700" },
        extrabold: { value: "800" },
        black: { value: "900" },
      },

      // 📏 Sizes (width, height, etc.)
      sizes: {
        max: { value: "max-content" },
        min: { value: "min-content" },
        full: { value: "100%" },
        "3xs": { value: "14rem" },
        "2xs": { value: "16rem" },
        xs: { value: "20rem" },
        sm: { value: "24rem" },
        md: { value: "28rem" },
        lg: { value: "32rem" },
        xl: { value: "36rem" },
        "2xl": { value: "42rem" },
        "3xl": { value: "48rem" },
        "4xl": { value: "56rem" },
        "5xl": { value: "64rem" },
        "6xl": { value: "72rem" },
        "7xl": { value: "80rem" },
        "8xl": { value: "90rem" },
      },

      // 🌀 Line Heights
      lineHeights: {
        normal: { value: "normal" },
        none: { value: "1" },
        shorter: { value: "1.25" },
        short: { value: "1.375" },
        base: { value: "1.5" },
        tall: { value: "1.625" },
        taller: { value: "2" },
      },

      // ↔ Letter Spacings
      letterSpacings: {
        tighter: { value: "-0.05em" },
        tight: { value: "-0.025em" },
        normal: { value: "0" },
        wide: { value: "0.025em" },
        wider: { value: "0.05em" },
        widest: { value: "0.1em" },
      },

      // 🟦 Border Radius
      radii: {
        none: { value: "0" },
        sm: { value: "0.125rem" },
        base: { value: "0.25rem" },
        md: { value: "0.375rem" },
        lg: { value: "0.5rem" },
        xl: { value: "0.75rem" },
        "2xl": { value: "1rem" },
        "3xl": { value: "1.5rem" },
        full: { value: "9999px" },
      },

      // ⬛ Border Width
      borders: {
        none: { value: "0" },
        "1px": { value: "1px" },
        "2px": { value: "2px" },
        "4px": { value: "4px" },
        "8px": { value: "8px" },
      },

      // 🧥 Shadows
      shadows: {
        xs: { value: "0 0 0 1px rgba(0, 0, 0, 0.05)" },
        sm: { value: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" },
        base: { value: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" },
        md: { value: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
        lg: { value: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" },
        xl: { value: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" },
        "2xl": { value: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" },
        outline: { value: "0 0 0 3px rgba(66, 153, 225, 0.6)" },
        inner: { value: "inset 0 2px 4px 0 rgba(0,0,0,0.06)" },
        none: { value: "none" },
      },

      // 🔢 Z-Indices
      zIndex: {
        hide: { value: "-1" },
        auto: { value: "auto" },
        base: { value: "0" },
        docked: { value: "10" },
        dropdown: { value: "1000" },
        sticky: { value: "1100" },
        banner: { value: "1200" },
        overlay: { value: "1300" },
        modal: { value: "1400" },
        popover: { value: "1500" },
        skipLink: { value: "1600" },
        toast: { value: "1700" },
        tooltip: { value: "1800" },
      },

      // 🕒 Durations (for transitions)
      durations: {
        instant: { value: "0ms" },
        fast: { value: "150ms" },
        normal: { value: "300ms" },
        slow: { value: "500ms" },
      },

      // 🧭 Easings
      easings: {
        easeIn: { value: "cubic-bezier(0.4, 0, 1, 1)" },
        easeOut: { value: "cubic-bezier(0, 0, 0.2, 1)" },
        easeInOut: { value: "cubic-bezier(0.4, 0, 0.2, 1)" },
      },
    },
  },
})
