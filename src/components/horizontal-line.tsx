import { twMerge } from "tailwind-merge"
import { useAppContext } from "../context/app-context"

export const HorizontalLine = () => {
  const { theme } = useAppContext()

  return (
    <div
      className={twMerge(
        "h-[1px] w-full",
        theme === "dark" ? "bg-pallete-dark-2" : "bg-pallete-light-1"
      )}
    />
  )
}
