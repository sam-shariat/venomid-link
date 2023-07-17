import { ComponentType } from 'react';
import { Image, ImageProps } from '@chakra-ui/react';
import { motion, MotionProps } from 'framer-motion';

const ImageMotion = motion<MotionProps | ImageProps>(Image as ComponentType);
interface Props {
    url: string
    alt? :string
}
const Avatar = ({url,alt} : Props) => {
  return (
    <ImageMotion
      initial={{ scale: 0.96 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
      drag
      dragDirectionLock
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      dragElastic={0.5}
      onDragEnd={(e, info) => {}}
      borderRadius={"100%"}
      whileTap={{ cursor: 'grabbing' }}
      src={url}
      width="3xs"
      boxShadow={url.includes('.png') || url.includes('.gif') || url.includes('.svg') ? "none" : "0 0 20px #00000070"}
      my={5}
      zIndex={100}
      alt={alt ? alt : "VID Profile Image"}
      textAlign={'center'}
    />
  );
}

export default Avatar;
