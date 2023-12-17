import { useColorMode, Box } from '@chakra-ui/react';
interface Props {
  color?: string;
}
function Binance({color}: Props) {
  const { colorMode } = useColorMode();
  return (
    <Box>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" width={26} height={26}>
      <path
        d="m16.624 13.92 2.717 2.716-7.353 7.353-7.352-7.352 2.717-2.717 4.636 4.66 4.635-4.66zm4.637-4.636L24 12l-2.715 2.716L18.568 12l2.693-2.716zm-9.272 0 2.716 2.692-2.717 2.717L9.272 12l2.716-2.715zm-9.273 0L5.41 12l-2.692 2.692L0 12l2.716-2.716zM11.99.01l7.352 7.33-2.717 2.715-4.636-4.636-4.635 4.66-2.717-2.716L11.989.011z"
        fill={color ? color : colorMode === 'light' ? '#232323' : '#f8f8f8'}
      />
    </svg>
    </Box>
  );
}

export default Binance;
