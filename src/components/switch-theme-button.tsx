import { FaMoon } from "react-icons/fa"
import { LuSunMoon } from "react-icons/lu"
import { twMerge } from "tailwind-merge"
import { useAppContext } from "../context/app-context"

export const SwitchThemeButton = () => {
  const { theme, toogleTheme } = useAppContext()

  return (
    <button
      className={twMerge(
        "bg-white text-black w-[30px] h-[30px] flex justify-center items-center rounded-lg dark:bg-pallete-dark-1 dark:text-white border-[1px] border-solid border-pallete-light-1",
        theme === "dark" && "border-pallete-dark-2 bg-black"
      )}
      onClick={toogleTheme}
    >
      {theme === "dark" ? (
        <LuSunMoon className="text-xs" />
      ) : (
        <FaMoon className="text-xs" />
      )}
    </button>
  )
}
