import { Item, OrderItemByCreationOption } from "../context/app-context"

export const orderItemsByCreationDate = (
  items: Item[],
  orderOption: OrderItemByCreationOption
): Item[] => {
  return items.sort((a, b) => {
    if (orderOption === "recent") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }
  })
}
