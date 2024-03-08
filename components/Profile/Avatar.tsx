import { ComponentType, useEffect, useState } from 'react';
import { Image, ImageProps } from '@chakra-ui/react';
import { motion, MotionProps } from 'framer-motion';
import { BaseNftJson } from 'core/utils/nft';
import axios from 'axios';

const ImageMotion = motion<MotionProps | ImageProps>(Image as ComponentType);
interface Props {
  url: string;
  nft?: BaseNftJson;
  alt?: string;
  noanimate?: boolean;
  nodrag?: boolean;
  shape?: "hex" | "circle" | "round" | "square" | string;
  my?: number | string;
  maxH?: number | string;
  shadow?: string;
}
const Avatar = ({
  url,
  alt,
  noanimate,
  nodrag,
  shape,
  my,
  shadow,
  nft,
  maxH
}: Props) => {

  const [avatarUrl, setAvatarUrl] = useState<string>(url);

  const getAvatarUrl = async ()=> {
    if(!nft) return;
    const ipfsData = nft.attributes?.find((att) => att.trait_type === 'DATA')?.value;
      if (ipfsData === '') {
        setAvatarUrl(String(nft.preview?.source));
      } else {
        const res = await axios.get('https://ipfs.io/ipfs/' + ipfsData);
        if(res){

          setAvatarUrl(res.data.avatar
            ? res.data.avatar
            : nft.preview?.source);
        }
      }
  }
  useEffect(()=> {
    if(nft){
      getAvatarUrl();
    }
  },[nft])


  return (
    <ImageMotion
      initial={{ scale: !noanimate ? 0.96 : 1 }}
      animate={!noanimate ? { scale: 1 } : 'none'}
      transition={
        !noanimate
          ? {
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }
          : {}
      }
      drag={!nodrag}
      dragDirectionLock={!nodrag}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      dragElastic={0.5}
      borderRadius={shape !== 'hex' ? (shape === 'circle' ? '100%' : shape === 'round' ? 16 : 0) : 0}
      whileTap={{ cursor: 'grabbing' }}
      key={avatarUrl && avatarUrl.length > 10 ? avatarUrl : '/logos/vidavatar.png'}
      src={avatarUrl && avatarUrl.length > 10 ? avatarUrl : '/logos/vidavatar.png'}
      width="100%"
      maxH={maxH ? maxH : 'auto'}
      boxShadow={shadow ? shadow : 'none'}
      my={my ? my : 4}
      zIndex={100}
      alt={alt ? alt : 'VID Profile Image'}
      style={{
        maskImage: shape === 'hex' ? 'url(/logos/hex.svg)' : 'none',
        WebkitMaskImage: shape === 'hex' ? 'url(/logos/hex.svg)' : 'none',
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'none',
        WebkitMaskRepeat: 'none',
        maskPosition: 'center',
        WebkitMaskPosition: 'center'
      }}
      textAlign={'center'}
    />
  );
};

export default Avatar;
