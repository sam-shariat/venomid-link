import * as React from "react"
import { Box, useColorMode } from '@chakra-ui/react';

function ZealyLogo() {
  const { colorMode } = useColorMode();
  return (
    <Box>
    <svg
      aria-label="Logo"
      width={28}
      height={28}
      viewBox="0 0 84 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.218 10.286c19.8 1.048 39.964-.414 58.857-6.797L79.69 19.236l-.01 18.113a288.025 288.025 0 01-4.403 4.388l5.702 5.75V69.38c-19.966 6.948-41.373 8.493-62.342 7.112L3.023 60.735l.01-18.103a360.23 360.23 0 007.705-4.867l-5.53-5.577c0-19.654.01-21.903.01-21.903z"
        fill={colorMode === 'dark' ? 'var(--chakra-colors-gray-100)' : 'var(--chakra-colors-gray-800)'}
      />
      <path
        d="M73.635 27.2v8.778a309.94 309.94 0 01-29.212 24.818c10.174-.68 20.337-2.316 30.521-5.282v9.711c-14.042 4.105-28.073 5.659-42.105 5.659-2.72 0-5.44-.06-8.16-.173v-8.777c9.741-6.248 19.482-13.146 29.213-21.04-7.001.905-14.002 1.29-21.003 1.29-2.015 0-4.019-.03-6.034-.09V32.38c1.995.061 3.98.092 5.974.092 13.598 0 27.197-1.453 40.796-5.283l.01.01z"
        fill={colorMode === 'dark' ? 'var(--chakra-colors-gray-800)' : 'var(--chakra-colors-gray-100)'}
      />
    </svg>
    </Box>
  )
}

export default ZealyLogo
