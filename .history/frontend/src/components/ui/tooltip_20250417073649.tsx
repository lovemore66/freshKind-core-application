// src/components/ui/Tooltip.tsx
"use client"

import * as React from "react"
import {
  Portal,
  Box,
  Tooltip as ChakraTooltip,
  type TooltipRootProps,
  type TooltipTriggerProps,
  type TooltipContentProps,
  type BoxProps,
} from "@chakra-ui/react"

export interface TooltipProps extends TooltipRootProps {
  /** If true, show the little arrow */
  showArrow?: boolean
  /** If true, render via Portal */
  portalled?: boolean
  /** Container for the Portal */
  portalRef?: React.RefObject<HTMLElement>
  /** The trigger element */
  children: React.ReactElement
  /** Tooltip body content */
  content: React.ReactNode
  /** Props for the <Tooltip.Content> */
  contentProps?: TooltipContentProps
  /** Props to style the arrow tip */
  arrowTipProps?: BoxProps
  /** Disable the tooltip entirely */
  disabled?: boolean
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(
    {
      showArrow = true,
      portalled = true,
      portalRef,
      children,
      content,
      contentProps,
      arrowTipProps,
      disabled,
      ...rootProps
    },
    ref
  ) {
    if (disabled) {
      return children
    }

    // ① Build the trigger props object
    const triggerProps: TooltipTriggerProps = {
      asChild: true,
      children,
    }

    return (
      <ChakraTooltip.Root {...rootProps}>
        {/* ② Spread triggerProps instead of <…>children</…> */}
        <ChakraTooltip.Trigger {...triggerProps} />

        <Portal disabled={!portalled} container={portalRef}>
          <ChakraTooltip.Positioner>
            <ChakraTooltip.Content ref={ref} {...contentProps}>
              {showArrow && (
                <ChakraTooltip.Arrow>
                  {/* ③ Wrap ArrowTip in Box for styling */}
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
