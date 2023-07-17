import { Box, Container, Link, Text, useColorMode } from '@chakra-ui/react';
import { GITHUB_URL, SITE_CLAIM_URL } from 'core/utils/constants';
export default function Footer() {
  return (
    <Box as="footer" w="full" py={5} mt={10} backgroundColor={'blackAlpha.200'}>
      <Container maxW="container.md" display="flex" justifyContent="space-between">
        <Text>Powered By VenomID</Text>
        <Link id="venomid-app-github" href={SITE_CLAIM_URL}>venomid.network</Link>
      </Container>
    </Box>
  );
}
