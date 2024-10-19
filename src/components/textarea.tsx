import * as React from "react"
import { twMerge } from "tailwind-merge"
import { useAppContext } from "../context/app-context"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const { theme } = useAppContext()

    return (
      <textarea
        className={twMerge(
          "flex min-h-[60px] w-full rounded-md border border-input resize-none p-2 text-xs shadow-sm",
          theme === "dark" &&
            "bg-pallete-dark-1 text-white border-pallete-dark-2",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea }
