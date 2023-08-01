import { Image , Spinner, Center, useMediaQuery } from '@chakra-ui/react';

interface Props {
  url: string;
  alt?: string;
  loading?: boolean;
}
const ImageLink = ({ url, alt, loading }: Props) => {
  const [notMobile] = useMediaQuery('(min-width: 800px)');

  return (
    <>
      {url ? (
        <Image
          borderRadius={12}
          src={url}
          width={notMobile ? 'md' : '100%'}
          boxShadow="0 0 10px #00000030"
          alt={alt ? alt : 'Venom ID Image Link'}
          textAlign={'center'}
        />
      ) : (
        <>
          {loading && <Center width={'100%'} height={150}>
            <Spinner size="lg" />
          </Center>}
        </>
      )}
    </>
  );
};

export default ImageLink;
