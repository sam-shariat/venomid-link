import { Button, useColorMode, Text, Link as ChakraLink } from '@chakra-ui/react';

interface Props {
    title : string
    icon : JSX.Element
    url : string
    width? : string
}
export default function Link({title,icon,url,width}: Props) {
  const { colorMode } = useColorMode();

  return (
    <ChakraLink href={url} target="_blank" id={`venom-id-${title}-link`}>
      <Button size="lg" minWidth="xs" width={width ? width : 'auto'} backgroundColor={colorMode === 'dark' ? 'whiteAlpha.100':'blackAlpha.100'}>
        {icon}
        <Text px={2}>{title}</Text>
      </Button>
    </ChakraLink>
  );
}
