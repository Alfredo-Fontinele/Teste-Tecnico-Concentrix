import { twMerge } from "tailwind-merge"
import { useAppContext } from "../context/app-context"

export const Button = ({ ...props }: React.ComponentProps<"button">) => {
  const { theme } = useAppContext()
  const { className, ...restProps } = props

  return (
    <button
      className={twMerge(
        "bg-pallete-dark-2 text-sm text-white py-2 px-2 rounded-[6px] border-[1px] border-solid border-transparent hover:border-black hover:text-black hover:bg-white transition-colors duration-300",
        theme === "dark" &&
          "bg-white text-black hover:bg-pallete-dark-1 hover:text-white hover:border-pallete-dark-2",
        className
      )}
      {...restProps}
    />
  )
}
