import * as React from "react"
import { useColorMode, Box } from '@chakra-ui/react';

function ETH() {
    const { colorMode } = useColorMode();
  return (
    <Box pr={2}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      width="26" height="26"
      viewBox="0 0 784.37 1277.39"
    >
      <g fillRule="nonzero">
        <path
          fill={colorMode === 'light' ? '#343434' : '#cccccc'}
          d="M392.07 0L383.5 29.11 383.5 873.74 392.07 882.29 784.13 650.54z"
        />
        <path
          fill={colorMode === 'light' ? '#8c8c8c' : '#cccccc'}
          d="M392.07 0L0 650.54 392.07 882.29 392.07 472.33z"
        />
        <path
          fill={colorMode === 'light' ? '#3c3c3c' : '#cccccc'}
          d="M392.07 956.52L387.24 962.41 387.24 1263.28 392.07 1277.38 784.37 724.89z"
        />
        <path fill={colorMode === 'light' ? '#8c8c8c' : '#cccccc'} d="M392.07 1277.38L392.07 956.52 0 724.89z" />
        <path fill={colorMode === 'light' ? '#141414' : '#cccccc'} d="M392.07 882.29L784.13 650.54 392.07 472.33z" />
        <path fill={colorMode === 'light' ? '#393939' : '#c9c9c9'} d="M0 650.54L392.07 882.29 392.07 472.33z" />
      </g>
    </svg>
    </Box>
  )
}

export default ETH
