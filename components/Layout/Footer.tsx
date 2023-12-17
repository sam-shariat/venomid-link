import { Box, Container, Link, Text, useColorMode } from '@chakra-ui/react';
import { GITHUB_URL, SITE_CLAIM_URL } from 'core/utils/constants';
import Logo from './Logo';
import { roundAtom } from 'core/atoms';
import { useAtomValue } from 'jotai';
export default function Footer() {
  const round = useAtomValue(roundAtom);
  return (
    <Box as="footer" w="full" py={5} backgroundColor={'blackAlpha.200'} my={12} rounded={round}>
      <Container gap={1} maxW="container.md" display="flex" justifyContent="center" alignItems={'center'}>
        <Text>Powered By</Text>
        <Logo />
        <Link id="venomid-app-github" href={SITE_CLAIM_URL}>VenomID</Link>
      </Container>
    </Box>
  );
}
