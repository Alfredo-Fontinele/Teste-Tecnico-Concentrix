import { toast } from "react-toastify"

export const useToasts = () => {
  const className =
    "w-full text-sm max-w-[250px] h-[30px] absolute right-[8px] top-[8px]"

  const toastSuccess = (message: string) => {
    toast.success(message, {
      className,
    })
  }

  const toastError = (message: string) => {
    toast.error(message, {
      className,
    })
  }

  return {
    toastSuccess,
    toastError,
  }
}
