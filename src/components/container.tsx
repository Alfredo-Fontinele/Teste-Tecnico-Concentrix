import { ClassNameValue, twMerge } from "tailwind-merge"

type ContainerProps = {
  className?: ClassNameValue
} & React.PropsWithChildren

export const Container = ({ className, children }: ContainerProps) => {
  return <div className={twMerge("p-3", className)}>{children}</div>
}
