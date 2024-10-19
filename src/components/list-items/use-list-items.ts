import { useAppContext } from "../../context/app-context"

export const useListItems = () => {
  const {
    items,
    theme,
    currentPage,
    hasNextPage,
    hasPrevPage,
    totalPages,
    nextPage,
    prevPage,
  } = useAppContext()

  const verifyIsLastItemById = (idItem: string) => {
    const isLastItem = items[items.length - 1]

    return idItem === isLastItem.id
  }

  return {
    items,
    theme,
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    verifyIsLastItemById,
  }
}
