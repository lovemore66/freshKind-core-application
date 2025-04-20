import {
    createSystem,
    defaultConfig,
    theme as baseTheme,
  } from "@chakra-ui/react"
  import { components as chakraComponents } from "@chakra-ui/components"
  
  export const system = createSystem(defaultConfig, {
    theme: {
      extend: true,
      tokens: {
        colors: baseTheme.colors,
        spacing: baseTheme.space,
        sizes: baseTheme.sizes,
        fonts: baseTheme.fonts,
        fontSizes: baseTheme.fontSizes,
        fontWeights: baseTheme.fontWeights,
        lineHeights: baseTheme.lineHeights,
        letterSpacings: baseTheme.letterSpacings,
        radii: baseTheme.radii,
        borders: baseTheme.borders,
        borderWidths: baseTheme.borderWidths,
        shadows: baseTheme.shadows,
        zIndex: baseTheme.zIndices,
        durations: baseTheme.transition.duration,
        easings: baseTheme.transition.easing,
      },
      components: chakraComponents,
    },
  })
  