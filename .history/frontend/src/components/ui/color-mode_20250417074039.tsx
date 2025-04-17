"use client"

import * as React from "react"
import {
  Icon,
  IconButton,
  Skeleton,
  useColorMode as useChakraColorMode,
} from "@chakra-ui/react"
import { ThemeProvider, useTheme } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { LuMoon, LuSun } from "react-icons/lu"

export interface ColorModeProviderProps extends ThemeProviderProps {}

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  )
}

export type ColorMode = "light" | "dark"

export interface UseColorModeReturn {
  colorMode: ColorMode
  setColorMode: (mode: ColorMode) => void
  toggleColorMode: () => void
}

export function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, setTheme } = useTheme()
  const toggleColorMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }
  return {
    colorMode: resolvedTheme as ColorMode,
    setColorMode: setTheme,
    toggleColorMode,
  }
}

// <-- Here’s the fix:
export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  // Wrap the react-icon in Chakra’s <Icon> so TS sees a valid JSX.Element
  return (
    <Icon
      as={colorMode === "dark" ? LuMoon : LuSun}
      boxSize="1.25rem"   // adjust size as needed
    />
  )
}

interface ColorModeButtonProps
  extends Omit<React.ComponentProps<typeof IconButton>, "aria-label"> {}

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  ColorModeButtonProps
>(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode()
  return (
    <IconButton
      onClick={toggleColorMode}
      variant="ghost"
      aria-label="Toggle color mode"
      size="sm"
      icon={<ColorModeIcon />}
      ref={ref}
      {...props}
    />
  )
})
