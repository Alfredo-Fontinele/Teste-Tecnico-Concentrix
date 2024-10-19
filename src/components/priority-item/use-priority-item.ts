import { ItemPriority } from "../../context/app-context"

type UsePriorityItemProps = {
  priority: ItemPriority
}

export const usePriorityItem = ({ priority }: UsePriorityItemProps) => {
  const options: Record<ItemPriority, string> = {
    high: "Alta",
    medium: "Média",
    low: "Baixa",
  }

  const optionsStyles: Record<ItemPriority, string> = {
    high: "border-indigo-500 text-indigo-400",
    medium: "border-orange-500 text-orange-500",
    low: "border-green-500 text-green-500",
  }

  const effectiveText = options[priority]
  const effectiveClassName = optionsStyles[priority]

  return {
    effectiveClassName,
    effectiveText,
  }
}
