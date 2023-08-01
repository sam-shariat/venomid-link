import { Button, useColorMode, Text, Link as ChakraLink, useMediaQuery } from '@chakra-ui/react';

interface Props {
    title : string
    icon : JSX.Element
    url : string
}
export default function SocialLink({title,icon,url}: Props) {
  const { colorMode } = useColorMode();
  const [notMobile] = useMediaQuery('(min-width: 800px)');

  return (
    <ChakraLink href={url} target="_blank" id={`venom-id-${title}-link`}>
      <Button size="lg" minWidth={notMobile ? "md" : "100%"} backgroundColor={colorMode === 'dark' ? 'whiteAlpha.100':'blackAlpha.100'}>
        {icon}
        <Text px={2}>{title}</Text>
      </Button>
    </ChakraLink>
  );
}
