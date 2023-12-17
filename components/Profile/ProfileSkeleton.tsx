import React from 'react';
import { HStack, Flex, Stack, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

interface Props {
  notMobile: boolean;
}

export default function ProfileSkeleton({ notMobile }: Props) {
  return (
    <>
      <Stack justifyContent="center" alignItems="center" my={2} width={notMobile ? 'md' : 'xs'}>
        {!notMobile && <Skeleton height={'26px'} width={'160px'} mt={10}/>}
        {!notMobile && <Skeleton height={'20px'} width={'180px'} />}
        <HStack gap={10}>
          <SkeletonCircle width={'200px'} height="200px" my={10}/>
          {notMobile && <Stack>
            <Skeleton height={'26px'} width={notMobile ? '160px' : '100%'} />
            <Skeleton height={'20px'} width={notMobile ? '180px' : '100%'} />
            <Skeleton height={'20px'} width={notMobile ? '120px' : '100%'} />
          </Stack>}
        </HStack>
        {!notMobile && <Skeleton width={'120px'} mt={2} height={'22px'} />}
        <Stack gap={2} mt={'30px !important'}>
          <Skeleton height={'42px'} width={'md'} borderRadius={12} />
          <Skeleton height={'42px'} width={'md'} borderRadius={12} />
          <Skeleton height={'42px'} width={'md'} borderRadius={12} />
        </Stack>
        <SkeletonText height="100px" width={notMobile ? 'md' : '100%'} mt={'40px !important'} />
      </Stack>
    </>
  );
}
