import { CiViewList } from "react-icons/ci"
import { SwitchThemeButton } from "./switch-theme-button"

export const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-medium">LisTrix</h2>
        <CiViewList className="text-lg" />
      </div>
      <SwitchThemeButton />
    </header>
  )
}
