import { Image, Spinner, Center, useMediaQuery } from '@chakra-ui/react';
import { roundAtom } from 'core/atoms';
import { useAtomValue } from 'jotai';

interface Props {
  url: string;
  alt?: string;
  loading?: boolean;
}
const ImageLink = ({ url, alt, loading }: Props) => {
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const round = useAtomValue(roundAtom);

  return (
    <>
      {url ? (
        <Image
          borderRadius={round === 'none' ? 0 : round === 'md' ? 8 : 16}
          src={url}
          width={'100%'}
          my={2}
          alt={alt ? alt : 'Venom ID Image Link'}
          textAlign={'center'}
        />
      ) : (
        <>
          {loading && (
            <Center width={'100%'} height={150}>
              <Spinner size="lg" />
            </Center>
          )}
        </>
      )}
    </>
  );
};

export default ImageLink;
