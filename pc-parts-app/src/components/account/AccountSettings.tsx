import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { deleteProfile } from "../../api/profile";
import { useAuth } from "../context/AuthContext";

export const AccountSettings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cancelRef = useRef<any>(null);

  const { session } = useAuth();

  const deleteAccount = useMutation({
    mutationFn: deleteProfile,
    onSuccess: () => {
      session.end();
    },
  });

  const onConfirmDelete = () => {
    onClose();
    deleteAccount.mutate();
  };
  return (
    <Box
      bgColor={"white"}
      borderWidth="1px"
      borderRadius="lg"
      overflow={"hidden"}
      w={"100%"}
      p={4}
      onClick={onOpen}
    >
      <Button
        w={"100%"}
        colorScheme={"red"}
        isLoading={deleteAccount.isPending}
      >
        Delete Account
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Account
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onConfirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};
