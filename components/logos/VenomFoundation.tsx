import { useColorMode, Box } from '@chakra-ui/react';
interface Props {
  color?: string;
}
function VenomFoundation({color}: Props) {
  const { colorMode } = useColorMode();
  return (
    <Box>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" width={26} height={26}>
      <path
        d="M20.8 1.6q-1-.2-2 .1-.9.4-1.6 1.1c-.8.9-1.1 2.1-.9 3.4.2 1.1.4 2.2.5 3.2.1 1.6-.2 3.2-.7 4.7-.5 1.4-1.2 2.4-2.7 2.6-.1.1-.5.1-.7.1-.1 0-.4 0-.6-.1-1.5-.2-2.2-1.2-2.7-2.6-.5-1.5-.8-3.1-.7-4.7.1-1 .3-2.2.5-3.2.2-1.3-.1-2.5-.9-3.4q-.7-.7-1.6-1.1-1-.3-2-.1c-1.9.3-3.2 2-3.2 3.8 0 .7.2 1.4.5 1.9.7 1 1.6 1.8 2.5 2.5.6.5 1.6 1.9 2.1 3.5q.4 1.4.7 2.8c.4 1.4.8 4.3 1.1 5.6.6 2.7 2.5 3.3 4.3 3.4h.1c1.8-.1 3.7-.7 4.3-3.4.3-1.3.7-4.2 1.1-5.6q.3-1.4.7-2.8c.5-1.6 1.5-3 2.1-3.5.9-.7 1.8-1.5 2.5-2.5.3-.5.5-1.2.5-1.9 0-1.8-1.3-3.5-3.2-3.8z"
        fill={color ? color : colorMode === 'light' ? '#232323' : '#f8f8f8'}
      />
    </svg>
    </Box>
  );
}

export default VenomFoundation;
