import { createStandaloneToast } from "@chakra-ui/react"
import { ToastType } from "../../../types/toast"



const toast = (text: string, type: ToastType) => {
  const toast = createStandaloneToast()
  toast({
    title: text,
    status: type,
    duration: 2000,
    isClosable: true,
    position: "top-right"
  })
}


export const successNotification = (text: string) => {
  toast(text, 'success');
}

export const errorNotification = (text: string) => {
  toast(text, 'success');
}