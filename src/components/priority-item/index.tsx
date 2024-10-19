import { twMerge } from "tailwind-merge"
import { ItemPriority } from "../../context/app-context"
import { usePriorityItem } from "./use-priority-item"

type PriorityItemProps = {
  priority: ItemPriority
}

export const PriorityItem = ({ priority }: PriorityItemProps) => {
  const { effectiveClassName, effectiveText } = usePriorityItem({ priority })

  return (
    <span
      className={twMerge(
        "font-normal text-xs text-center rounded-[5px] w-full max-w-[60px] border-solid border-[1px]",
        effectiveClassName
      )}
    >
      {effectiveText}
    </span>
  )
}
