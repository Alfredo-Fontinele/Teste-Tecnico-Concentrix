import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { ItemPriority, useAppContext } from "../../context/app-context"

export const createItemSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("nome é obrigatório")
    .min(3, "nome deve ter no mínimo 3 caracteres"),
  description: yup.string().trim().required("descrição é obrigatória"),
  priority: yup
    .string()
    .oneOf(["low", "medium", "high"] as ItemPriority[])
    .required(),
})

export type CreateItemSchema = yup.InferType<typeof createItemSchema>

export const useFormAddItem = () => {
  const { addItem, optionsCheckboxPriorities, theme } = useAppContext()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createItemSchema),
  })

  const onSubmitForm = (data: CreateItemSchema) => {
    addItem({
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description,
      priority: data.priority,
      createdAt: new Date(),
    })
    reset()
  }

  return {
    onHandleSubmit: handleSubmit(onSubmitForm),
    register,
    errors,
    optionsCheckboxPriorities,
    theme,
  }
}
