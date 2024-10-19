import * as React from "react"
import { twMerge } from "tailwind-merge"
import { useAppContext } from "../context/app-context"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const { theme } = useAppContext()
    return (
      <input
        type={type}
        className={twMerge(
          "border-[1px] border-solid border-pallete-light-1 text-xs bg-transparent text-black rounded-[6px] px-2 py-1",

          theme === "dark" && "text-white border-pallete-dark-2",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
