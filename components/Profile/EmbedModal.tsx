import {
  Button,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  AspectRatio,
  Flex,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import {
  buttonBgColorAtom,
  isConnectedAtom,
  lightModeAtom,
  openEmbedModalAtom,
  roundAtom,
  variantAtom,
} from 'core/atoms';
import IframeResizer from 'iframe-resizer-react';
import { Styles } from 'types';
import Link from './Link';

interface Props {
  title: string;
  type: string;
  url: string;
  style?: Styles;
}

export default function EmbedModal({ title, url, type, style }: Props) {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const lightMode = useAtomValue(lightModeAtom);
  const round = useAtomValue(roundAtom);
  const variant = useAtomValue(variantAtom);
  const buttonBg = useAtomValue(buttonBgColorAtom);
  const [isDonating, setIsDonating] = useState(false);
  const [donateSuccessful, setDonateSuccessful] = useState(false);
  const [_open, _setOpen] = useAtom(openEmbedModalAtom);

  useEffect(() => {
    _open && onOpen();
    !isOpen && _setOpen(isOpen);
  }, [isOpen, _open]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={'xl'}>
        <ModalOverlay bg="blackAlpha.700" backdropFilter="auto" backdropBlur={'6px'} />
        <ModalContent bg={colorMode === 'dark' ? 'var(--dark1)' : 'var(--white)'}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap={2} w={'100%'}>
              {type.includes('ipfs image') && <Link type={type} url={url} image={url} title={title} /> }
              
              {(type.includes('link') || type.includes('pdf')) && <IframeResizer
                src={url}
                title={title}
                scrolling="omit"
                style={{
                  borderRadius: round === 'none' ? 0 : round === 'md' ? 8 : 16,
                  backgroundColor: lightMode ? 'white' : 'black',
                  width: '1px',
                  minWidth: '100%',
                  minHeight: '80vh',
                }}
                heightCalculationMethod="max"
                inPageLinks
              />}
            </Flex>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
