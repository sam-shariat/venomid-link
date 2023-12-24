import { Box, Container, Link, Text, useColorMode } from '@chakra-ui/react';
import { GITHUB_URL, SITE_CLAIM_URL } from 'core/utils/constants';
import Logo from './Logo';
import { roundAtom, lightModeAtom } from 'core/atoms';
import { useAtomValue } from 'jotai';
export default function Footer() {
  const round = useAtomValue(roundAtom);
  const {colorMode} = useColorMode();
  return (
    <Box as="footer" width={['100%', '100%', 'md', 'lg', 'xl']} py={4} color={colorMode === 'light' ? 'var(--dark)' : 'var(--light)'} backgroundColor={colorMode === 'light' ? 'whiteAlpha.200' : 'blackAlpha.200'} my={12} rounded={round}>
      <Container gap={1} maxW="container.md" display="flex" justifyContent="center" alignItems={'center'}>
        <Text>Powered By</Text>
        <Logo />
        <Link id="venomid-app-github" href={SITE_CLAIM_URL}>VenomID</Link>
      </Container>
    </Box>
  );
}
