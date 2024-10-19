import { FaPen, FaTrash } from "react-icons/fa"
import { twMerge } from "tailwind-merge"
import { Item, useAppContext } from "../../context/app-context"
import { useWindowSize } from "../../hooks/use-window-size"
import { formatLimitString } from "../../utils/format-limit-string"
import { getDateFormated } from "../../utils/get-date-formated"
import { ModalEditItem } from "../modal-edit-item"
import { useModal } from "../modal/use-modal"
import { PriorityItem } from "../priority-item"

type ItemProps = {
  item: Item
}

export const ItemCard = ({ item }: ItemProps) => {
  const { Modal, openModal, closeModal } = useModal()
  const { removeItem, theme } = useAppContext()
  const { width } = useWindowSize()

  return (
    <>
      <ModalEditItem
        role="modal-edit-item"
        currentItem={item}
        Modal={Modal}
        closeModal={closeModal}
      />

      <li
        key={item.id}
        className={twMerge(
          "flex justify-between h-max w-full rounded-lg gap-5 p-2 ",
          theme === "dark" ? "text-white" : "text-pallete-dark-1"
        )}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm flex items-center gap-1">
              {formatLimitString({
                input: item.name,
                limit: 40,
              })}
            </p>

            <p
              className={twMerge(
                "text-xs overflow-hidden text-ellipsis whitespace-nowrap w-full",
                width > 550 && "max-w-[350px]",
                width < 550 && "max-w-[250px]",
                width < 450 && "max-w-[200px]"
              )}
            >
              {item.description}
            </p>
          </div>

          <p className="font-normal text-xs">
            Criado em {""}
            {getDateFormated(new Date(item.createdAt.toString()))}
          </p>
        </div>

        <div className="flex flex-col w-[100px] items-end justify-between gap-2">
          <PriorityItem priority={item.priority} />
          <div className="flex items-center gap-4">
            <button role="edit-item" onClick={openModal}>
              <FaPen className="text-sm text-pallete-dark-2" />
            </button>
            <button
              role="remove-item"
              onClick={() => removeItem(item.id)}
              className="text-red-500"
            >
              <FaTrash className="text-sm" />
            </button>
          </div>
        </div>
      </li>
    </>
  )
}
