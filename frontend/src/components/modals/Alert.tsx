import { useRef, FC } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
} from '@chakra-ui/react';
import { Button } from '../common/Button';

interface Props {
  title: string;
  text: string;
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void;
}

export const Alert: FC<Props> = ({
  isOpen,
  onClose,
  onAction,
  title,
  text,
}) => {
  // const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{text}</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={onAction} colorScheme="red" ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
