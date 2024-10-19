import { Item } from "../context/app-context"

export const orderItemsByPriority = (items: Item[]): Item[] => {
  const priorityOrder: { [key: string]: number } = {
    high: 1,
    medium: 2,
    low: 3,
  }

  return items.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  )
}
