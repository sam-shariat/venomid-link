import { useColorMode, Box } from '@chakra-ui/react';
interface Props {
  color?: string;
}
function Tron({ color }: Props) {
  const { colorMode } = useColorMode();
  return (
    <Box>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={26} height={26}>
        <path
          d="M61.55 19.28c-3-2.77-7.15-7-10.53-10l-.2-.14a3.82 3.82 0 00-1.11-.62C41.56 7 3.63-.09 2.89 0a1.4 1.4 0 00-.58.22l-.19.15a2.23 2.23 0 00-.52.84l-.05.13v.82C5.82 14.05 22.68 53 26 62.14c.2.62.58 1.8 1.29 1.86h.16c.38 0 2-2.14 2-2.14S58.41 26.74 61.34 23a9.46 9.46 0 001-1.48 2.41 2.41 0 00-.79-2.24zm-24.67 4.09l12.36-10.25 7.25 6.68zm-4.8-.67L10.8 5.26l34.43 6.35zM34 27.27l21.78-3.51-24.9 30zM7.91 7L30.3 26l-3.24 27.78z"
          fill={color ? color : colorMode === 'light' ? '#232323' : '#f8f8f8'}
        />
      </svg>
    </Box>
  );
}

export default Tron;
