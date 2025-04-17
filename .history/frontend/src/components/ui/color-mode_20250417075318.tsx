import {
  IconButton,
  Icon,
  Skeleton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import * as React from "react"

export function ColorModeIcon() {
  const colorMode = useColorModeValue("light", "dark")
  return (
    <Icon
      as={colorMode === "dark" ? MoonIcon : SunIcon}
      boxSize="1.25rem"
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
    <Skeleton isLoaded>
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        icon={<ColorModeIcon />}
        {...props}
      />
    </Skeleton>
  )
})