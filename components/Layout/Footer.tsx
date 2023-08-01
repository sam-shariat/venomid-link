import { Box, Container, Link, Text, useColorMode } from '@chakra-ui/react';
import { GITHUB_URL, SITE_CLAIM_URL } from 'core/utils/constants';
import Logo from './Logo';
export default function Footer() {
  return (
    <Box as="footer" w="full" py={5} mt={10} backgroundColor={'blackAlpha.400'}>
      <Container gap={1} maxW="container.md" display="flex" justifyContent="center" alignItems={'center'}>
        <Text>Powered By</Text>
        <Logo />
        <Link id="venomid-app-github" href={SITE_CLAIM_URL}>VenomID</Link>
      </Container>
    </Box>
  );
}
