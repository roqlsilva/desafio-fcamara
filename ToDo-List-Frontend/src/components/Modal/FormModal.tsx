import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, Button, Flex,
} from '@chakra-ui/react';
import { FiPlus } from "react-icons/fi"

interface FormModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  buttonLabel: string;
  title: string;
  content: () => JSX.Element;
  onSubmit: () => void;
  changeOperation?: () => void;
}

export function FormModal({
                            isOpen,
                            onOpen,
                            onClose,
                            buttonLabel,
                            title,
                            content,
                            onSubmit,
                            changeOperation
                          }: FormModalProps) {
  return (
    <>
      <Flex justifyContent='end'>
        <Button onClick={() => {
          if (changeOperation) {
            changeOperation()
          }
          onOpen()
        }} colorScheme='blue' rightIcon={<FiPlus />}>{buttonLabel}</Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            {content()}
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={() => {
              onClose()
            }}>
              Cancelar
            </Button>
            <Button colorScheme='blue' onClick={() => {
              onSubmit();
            }}>Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
