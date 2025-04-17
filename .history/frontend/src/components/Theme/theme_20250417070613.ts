import { createSystem, defaultConfig } from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Figtree', sans-serif` },
        body: { value: `'Figtree', sans-serif` },
      },
      colors: {
        primary: { value: "#0FEE0F" },
        secondary: { value: "#EE0F0F" },
      },
    },
  },
})