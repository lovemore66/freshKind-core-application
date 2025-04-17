// src/components/ui/Tooltip.tsx
import * as React from "react"
import {
  Box,
  Portal,
  Tooltip as ChakraTooltip,
  type BoxProps,
} from "@chakra-ui/react"

export interface TooltipProps extends ChakraTooltip.RootProps {
  /** show the little arrow under the tooltip */
  showArrow?: boolean
  /** render tooltip via Portal (default true) */
  portalled?: boolean
  /** optional container element for the Portal */
  portalRef?: React.RefObject<HTMLElement>
  /** the trigger content */
  children: React.ReactElement
  /** what to render inside the tooltip */
  content: React.ReactNode
  /** props to spread on the actual <Tooltip.Content> */
  contentProps?: ChakraTooltip.ContentProps
  /** style props for the arrow tip (via Box) */
  arrowTipProps?: BoxProps
  /** if true, will render just `children` and no tooltip */
  disabled?: boolean
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(
    {
      showArrow = true,
      children,
      disabled,
      portalled = true,
      content,
      contentProps,
      arrowTipProps,
      portalRef,
      ...rest
    },
    ref
  ) {
    if (disabled) {
      return children
    }

    return (
      <ChakraTooltip.Root {...rest}>
        <ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>

        <Portal disabled={!portalled} container={portalRef}>
          <ChakraTooltip.Positioner>
            <ChakraTooltip.Content ref={ref} {...contentProps}>
              {showArrow && (
                <ChakraTooltip.Arrow>
                  {/* wrap ArrowTip in Box so you can pass BoxProps */}
                  <Box as={ChakraTooltip.ArrowTip} {...arrowTipProps} />
                </ChakraTooltip.Arrow>
              )}
              {content}
            </ChakraTooltip.Content>
          </ChakraTooltip.Positioner>
        </Portal>
      </ChakraTooltip.Root>
    )
  }
)
