import { fireEvent, render, screen } from "@testing-library/react"
import { ToastContainer } from "react-toastify"
import { describe, expect, it } from "vitest"
import { FormAddItem } from "."
import { AppProvider } from "../../context/app-context"

describe("FormAddItem Component", () => {
  it("should render input fields and validate correctly", () => {
    render(
      <AppProvider>
        <FormAddItem />
      </AppProvider>
    )

    expect(screen.getByLabelText(/Nome:/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Descrição:/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Prioridade/i)).toBeInTheDocument()
  })

  it("should display error messages for invalid inputs", async () => {
    render(
      <AppProvider>
        <FormAddItem />
      </AppProvider>
    )

    const submitButton = screen.getByRole("button", { name: /adicionar/i })

    fireEvent.click(submitButton)

    expect(await screen.findByText(/nome é obrigatório/i)).toBeInTheDocument()
    expect(
      await screen.findByText(/descrição é obrigatória/i)
    ).toBeInTheDocument()
  })

  it("should add an item correctly when the form is filled", async () => {
    render(
      <AppProvider>
        <FormAddItem />
        <ToastContainer />
      </AppProvider>
    )

    fireEvent.input(screen.getByLabelText(/Nome:/i), {
      target: { value: "Novo Item" },
    })
    fireEvent.input(screen.getByLabelText(/Descrição:/i), {
      target: { value: "Descrição do item" },
    })
    fireEvent.change(screen.getByLabelText(/Prioridade:/i), {
      target: { value: "medium" },
    })

    const submitButton = screen.getByRole("button", { name: /adicionar/i })
    fireEvent.click(submitButton)

    expect(await screen.findByText("Item criado!")).toBeInTheDocument()
  })
})
