import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { App } from "./App.tsx"
import { AppProvider } from "./context/app-context.tsx"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastContainer />
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
)
