import {
  IconButton,
  Icon,
  Skeleton,
} from "@chakra-ui/react"
import { useTheme as useNextTheme } from "next-themes"
import * as React from "react"

// Chakra-friendly inline SVG icons
const SunIcon = (props: any) => (
  <Icon viewBox="0 0 20 20" {...props}>
    <path d="M10 15a5 5 0 100-10 5 5 0 000 10zm0-13a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm0 14a1 1 0 011 1v1a1 1 0 01-2 0v-1a1 1 0 011-1zm7-7a1 1 0 011 1h1a1 1 0 010 2h-1a1 1 0 01-2 0 1 1 0 012-1zM3 10a1 1 0 011 1H3a1 1 0 010-2h1a1 1 0 01-1 1zm12.071 4.071a1 1 0 011.415 1.415l-.707.707a1 1 0 01-1.415-1.415l.707-.707zM4.929 5.929a1 1 0 011.415 1.415l-.707.707A1 1 0 014.93 5.93zM16.071 5.93a1 1 0 011.415-1.415l.707.707a1 1 0 01-1.415 1.415l-.707-.707zM5.929 16.071a1 1 0 011.415 1.415l-.707.707a1 1 0 01-1.415-1.415l.707-.707z" />
  </Icon>
)

const MoonIcon = (props: any) => (
  <Icon viewBox="0 0 20 20" {...props}>
    <path d="M17.293 13.293a8 8 0 01-11.586-11.586 8 8 0 1011.586 11.586z" />
  </Icon>
)

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof IconButton>
>(function ColorModeButton(props, ref) {
  const { resolvedTheme, setTheme } = useNextTheme()

  const toggleColorMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <Skeleton>
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        {...props}
      />
    </Skeleton>
  )
})