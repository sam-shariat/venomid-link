import { Message } from "types"
import {
    Button,
    Box,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Link
  } from '@chakra-ui/react';

interface Props {
    message : Message;
    notMobile: boolean;
}
export default function MessageAlert({message, notMobile}: Props){
    return (
        <>
        {message.msg.length > 0 && (
            <Alert
              flexDirection={notMobile ? 'row' : 'column'}
              alignItems={notMobile ? 'left' : 'center'}
              justifyContent={notMobile ? 'left' : 'center'}
              textAlign={notMobile ? 'left' : 'center'}
              status={message.type}
              gap={2}
              borderRadius={10}>
              <AlertIcon />
              <Box width={notMobile ? 'xs' : '100%'}>
                <AlertTitle>{message.title.toUpperCase()}</AlertTitle>
                <AlertDescription>{message.msg}</AlertDescription>
              </Box>
              {message.link && (
                <Box>
                  <Link href={message.link} target="_blank" id={`venom-id-nft-link`}>
                    <Button m={1} minWidth={120}>
                      View NFT
                    </Button>
                  </Link>
                  
                </Box>
              )}
            </Alert>
          )}
          </>
    )
}