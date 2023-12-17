import * as React from "react"
import { useColorMode } from '@chakra-ui/react';
interface Props {
  color?: string;
}
function Galxe({color}: Props) {
    const { colorMode } = useColorMode();
  return (
    <svg
      width={28}
      height={24}
      viewBox="0 0 28 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 23.995l23.057-19.2A2.734 2.734 0 1019.198.94L0 23.995zM11.122 3.543l-9.707 7.28 7.28-9.707a1.733 1.733 0 112.427 2.427zM22.876 15.3l-9.707 7.28 7.28-9.706a1.733 1.733 0 112.427 2.427z"
        fill={color ? color : colorMode === 'dark' ? 'var(--chakra-colors-gray-100)' : 'var(--chakra-colors-gray-800)'}
      />
    </svg>
  )
}

export default Galxe
