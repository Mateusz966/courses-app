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
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void;
}

export const Alert: FC<Props> = ({ isOpen, onClose, onAction }) => {
  // const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);

  console.log(isOpen);

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
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>asd</AlertDialogBody>

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
