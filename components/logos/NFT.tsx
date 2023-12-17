import * as React from 'react';
import { useColorMode, Box } from '@chakra-ui/react';

function NftLine() {
  const { colorMode } = useColorMode();
  return (
    <Box>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28">
        <path
          d="M9 12C10.1046 12 11 11.1046 11 10 11 8.89543 10.1046 8 9 8 7.89543 8 7 8.89543 7 10 7 11.1046 7.89543 12 9 12ZM21.5 6.5 12 1 2.5 6.5V17.5L12 23 21.5 17.5V6.5ZM12 3.311 19.5 7.65311V14.5338L14.9379 11.7966 6.96669 17.775 4.5 16.3469V7.65311L12 3.311ZM12 20.689 8.84788 18.8641 15.0621 14.2034 19.0595 16.6019 12 20.689Z"
          fill={colorMode === 'light' ? '#232323' : '#f8f8f8'}></path>
      </svg>
    </Box>
  );
}

function NftFill() {
  const { colorMode } = useColorMode();
  return (
    <Box>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28">
        <path
          d="M9 12C10.1046 12 11 11.1046 11 10 11 8.89543 10.1046 8 9 8 7.89543 8 7 8.89543 7 10 7 11.1046 7.89543 12 9 12ZM12 1 21.5 6.5V17.5L12 23 2.5 17.5V6.5L12 1ZM4.5 7.65311V16.3469L6.8724 17.7204 14.9446 11.8008 19.5 14.534V7.65311L12 3.311 4.5 7.65311Z"
          fill={colorMode === 'light' ? '#232323' : '#f8f8f8'}></path>
      </svg>
    </Box>
  );
}

export { NftLine, NftFill };
