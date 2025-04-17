"use client"

import * as React from "react"
import { LuMoon, LuSun } from "react-icons/lu"
import {
  IconButton,
  Skeleton,
  Icon,
  type IconProps,
} from "@chakra-ui/react"
import { ThemeProvider, useTheme } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

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

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? dark : light
}

// ✅ Fix: Wrap icon component in a function that returns JSX
const MoonIcon = (props: IconProps) => <Icon as={LuMoon} {...props} />
const SunIcon = (props: IconProps) => <Icon as={LuSun} {...props} />

export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? <MoonIcon boxSize="1.25rem" /> : <SunIcon boxSize="1.25rem" />
}

interface ColorModeButtonProps
  extends Omit<React.ComponentProps<typeof IconButton>, "aria-label"> {}

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  ColorModeButtonProps
>(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode()

  return (
    <Skeleton isLoaded>
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        _icon={{ boxSize: "5" }}
        {...props}
      >
        <ColorModeIcon />
      </IconButton>
    </Skeleton>
  )
})
