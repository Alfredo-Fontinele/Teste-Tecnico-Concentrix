import * as React from "react"
import { twMerge } from "tailwind-merge"
import { useAppContext } from "../context/app-context"

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    const { theme } = useAppContext()

    return (
      <select
        className={twMerge(
          "border-[1px] border-solid border-pallete-light-1 rounded-lg w-full h-[25px] text-xs px-1",
          theme === "dark" &&
            "bg-pallete-dark-1 text-white border-pallete-dark-2",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    )
  }
)

Select.displayName = "Select"

export { Select }
