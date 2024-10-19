import { FaX } from "react-icons/fa6"
import { twMerge } from "tailwind-merge"
import { Item } from "../../context/app-context"
import { Button } from "../button"
import { Input } from "../input"
import { UseModalProps } from "../modal/use-modal"
import { Select } from "../select"
import { Textarea } from "../textarea"
import { useModalEditItem } from "./use-modal-edit-item"

type ModalEditItemProps = {
  role?: string
  Modal: ({ className, children }: UseModalProps) => JSX.Element
  closeModal: () => void
  currentItem: Item
}

export const ModalEditItem = ({
  role,
  Modal,
  closeModal,
  currentItem,
}: ModalEditItemProps) => {
  const { onHandleSubmit, errors, optionsCheckboxPriorities, register, theme } =
    useModalEditItem({
      closeModal,
      idItem: currentItem.id,
    })

  return (
    <Modal
      type="dark"
      role={role}
      className={twMerge(
        "w-full max-w-[500px] rounded-[5px] p-4 border-2 border-solid border-transparent",
        theme === "dark" &&
          "bg-pallete-dark-1 border-2 border-solid border-pallete-dark-2"
      )}
    >
      <div className="flex flex-col gap-5 justify-center items-start w-full max-w-[500px]">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-lg font-normal">Editar Item</h2>
          <FaX
            className="h-[15px] w-[15px] cursor-pointer"
            onClick={closeModal}
          />
        </div>

        <form onSubmit={onHandleSubmit} className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-xs">
              Nome
            </label>
            <Input
              id="name"
              defaultValue={currentItem.name}
              placeholder="Digite o nome"
              {...register("name")}
            />
            {!!errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-xs">
              Descrição
            </label>
            <Textarea
              id="description"
              defaultValue={currentItem.description}
              placeholder="Digite a descrição"
              {...register("description")}
            />
            {!!errors.description && (
              <span className="text-red-500 text-xs">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="flex gap-3 items-center">
            <label htmlFor="priority" className="text-xs">
              Prioridade:
            </label>
            <Select
              id="priority"
              className="max-w-[120px]"
              defaultValue={currentItem.priority}
              {...register("priority")}
            >
              {optionsCheckboxPriorities.map((option) => (
                <option key={option.priority} value={option.priority}>
                  {option.text}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex justify-center items-center">
            <Button className="w-full max-w-[300px]" type="submit">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
