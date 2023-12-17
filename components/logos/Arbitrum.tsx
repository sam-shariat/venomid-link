import { useColorMode, Box } from '@chakra-ui/react';
interface Props {
  color?: string;
}
function Arbitrum({color}: Props) {
  const { colorMode } = useColorMode();
  return (
    <Box>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2500 2500" width={26} height={26}>
      <g id="Layer_x0020_1">
        <g id="_2405588477232">
          <path fill="none" d="M0 0H2500V2500H0z" />
          <path
            d="M1250 155c6 0 12 2 17 5l918 530c11 6 17 18 17 30v1060c0 12-7 24-17 30l-918 530c-5 3-11 5-17 5s-12-2-17-5l-918-530c-11-6-17-18-17-30V719c0-12 7-24 17-30l918-530c5-3 11-5 17-5v1zm0-155c-33 0-65 8-95 25L237 555c-59 34-95 96-95 164v1060c0 68 36 130 95 164l918 530c29 17 62 25 95 25s65-8 95-25l918-530c59-34 95-96 95-164V719c0-68-36-130-95-164L1344 25c-29-17-62-25-95-25h1z"
            fill={color ? color : colorMode === 'light' ? '#232323' : "#f8f8f8"}
          />
          <g>
            <path
              className="st4"
              fill={color ? color : colorMode === 'light' ? '#232323' : "#f8f8f8"}
              d="M1172 644H939c-17 0-33 11-39 27L401 2039l241 139 550-1507c5-14-5-28-19-28l-1 1zM1580 644h-233c-17 0-33 11-39 27L738 2233l241 139 620-1701c5-14-5-28-19-28v1z"
            />
          </g>
        </g>
      </g>
    </svg>
    </Box>
  );
}

export default Arbitrum;
