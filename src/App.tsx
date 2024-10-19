import { motion } from "framer-motion"
import { twMerge } from "tailwind-merge"
import { Container } from "./components/container"
import { FormAddItem } from "./components/form-add-item"
import { Header } from "./components/header"
import { SectionItems } from "./components/section-items"
import { useAppContext } from "./context/app-context"

export function App() {
  const { theme } = useAppContext()

  return (
    <motion.div
      className={twMerge(
        "min-h-screen",
        theme === "dark" ? "text-white" : "text-pallete-dark-1"
      )}
      initial={{ backgroundColor: "#181a1b" }}
      animate={{
        backgroundColor: theme === "dark" ? "#181a1b" : "#FFFFFF",
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Container>
        <Header />
      </Container>

      <Container className="flex justify-center">
        <div className="w-full max-w-[500px] flex justify-center md:items-start gap-10 md:gap-5 lg:gap-[100px] flex-col md:flex-row md:max-w-none ">
          <FormAddItem />
          <SectionItems />
        </div>
      </Container>
    </motion.div>
  )
}
