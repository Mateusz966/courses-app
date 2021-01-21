import { createStandaloneToast } from "@chakra-ui/react"
import { ToastType } from "../../../types/toast"



export const toast = (text: string, type: ToastType) => {
  const toast = createStandaloneToast()
  toast({
    title: text,
    status: type,
    duration: 2000,
    isClosable: true,
    position: "top-right"
  })

}