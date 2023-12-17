import { useColorMode, Box } from '@chakra-ui/react';
interface Props {
  color?: string;
}
function Avalanche({ color }: Props) {
  const { colorMode } = useColorMode();
  return (
    <Box>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width={26} height={26}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="m50 25c0 13.8-11.2 25-25 25-13.8 0-25-11.2-25-25 0-13.8 11.2-25 25-25 13.8 0 25 11.2 25 25zm-29.9 9.8q0.9-0.2 1.5-0.9c0.4-0.3 0.7-0.8 1.3-1.8l6.3-11.1c0.5-1 0.8-1.5 0.9-2q0.2-0.9 0-1.7c-0.1-0.5-0.4-1-0.9-2l-2.5-4.3c-0.5-0.9-0.8-1.4-1.1-1.5-0.3-0.2-0.8-0.2-1.1 0-0.3 0.1-0.6 0.6-1.1 1.5l-12 21.1c-0.5 0.9-0.7 1.3-0.7 1.7 0 0.4 0.2 0.7 0.5 1 0.3 0.1 0.8 0.1 1.9 0.1h4.8c1.2 0 1.7 0 2.2-0.1zm10.1 0.1h6.9c1 0 1.6 0 1.9-0.2 0.3-0.2 0.5-0.5 0.5-0.9 0-0.4-0.2-0.8-0.7-1.6q0-0.1 0-0.1l-3.5-6h-0.1c-0.4-0.9-0.7-1.3-1-1.4-0.4-0.2-0.8-0.2-1.1 0-0.3 0.1-0.6 0.6-1.1 1.4l-3.5 6c-0.5 0.9-0.8 1.3-0.7 1.7 0 0.4 0.2 0.7 0.5 1 0.3 0.1 0.8 0.1 1.9 0.1z"
          fill={color ? color : colorMode === 'light' ? '#232323' : '#f8f8f8'}
        />
      </svg>
    </Box>
  );
}

export default Avalanche;
