import * as React from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
interface Props {
  color?: string;
}

function ZealyLogo({ color }: Props) {
  const { colorMode } = useColorMode();
  return (
    <Box>
      <svg
        aria-label="Logo"
        width={34}
        height={34}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="m18.5 6.1v2.5c-2.7 2.6-5.4 4.9-8.1 6.9 2.8-0.2 5.7-0.6 8.5-1.5q0 1.4 0 2.8c-3.9 1.1-7.8 1.5-11.7 1.5q-1.2 0-2.3 0v-2.5c2.7-1.7 5.4-3.6 8.1-5.8q-2.9 0.3-5.8 0.3-0.9 0-1.7 0 0-1.4 0-2.7 0.8 0 1.7 0c3.8 0 7.5-0.4 11.3-1.5z"
          fill={'none'}
          style={{
            stroke: color
              ? color
              : colorMode === 'dark'
              ? 'rgba(255, 255, 255, 1)'
              : 'rgba(0, 0, 0, 1)',
            strokeWidth: '1.85px',
            paintOrder: 'stroke',
            // filter: `drop-shadow(0px 0px 0px ${
            //   colorMode === 'dark' ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)'
            // })`,
          }}
        />
      </svg>
    </Box>
  );
}

export default ZealyLogo;
