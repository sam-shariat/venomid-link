import React from 'react';
import {
  useMediaQuery,
  Flex,
  Stack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';

interface Props {
  notMobile: boolean;
}

export default function ProfileSkeleton({notMobile}: Props) {
  
  return (
    <>
      <Stack justifyContent='center' alignItems='center' my={2} width={notMobile ? 'md' : 'xs'}>
        <SkeletonCircle width={"200px"} height="200px" my={10} mt={16} />
        <Skeleton width={"120px"} mt={2} height={'22px'} />
        <Flex style={{flexDirection: notMobile ? 'row' : 'column'}} gap={2} mt={'30px !important'}>
          <Skeleton height={"38px"} width={'150px'} />
          <Skeleton height={"38px"} width={'150px'} />
          <Skeleton height={"38px"} width={'150px'} />
        </Flex>
        <SkeletonText height="100px" width={notMobile ? '440px' : '100%'} mt={'40px !important'} />
      </Stack>
    </>
  );
}
