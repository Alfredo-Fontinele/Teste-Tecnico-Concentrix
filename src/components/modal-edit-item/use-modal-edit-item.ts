import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useAppContext } from "../../context/app-context"
import {
  CreateItemSchema,
  createItemSchema,
} from "../form-add-item/use-form-add-item"

type UseModalEditItemProps = {
  closeModal: () => void
  idItem: string
}

export const useModalEditItem = ({
  closeModal,
  idItem,
}: UseModalEditItemProps) => {
  const { editItem, optionsCheckboxPriorities, theme } = useAppContext()

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createItemSchema),
  })

  const onSubmitForm = (data: CreateItemSchema) => {
    editItem(idItem, data)
    closeModal()
    reset()
  }

  return {
    onHandleSubmit: handleSubmit(onSubmitForm),
    register,
    setValue,
    errors,
    optionsCheckboxPriorities,
    theme,
  }
}
