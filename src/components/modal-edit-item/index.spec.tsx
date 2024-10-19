import { fireEvent, render, screen } from "@testing-library/react"
import { ToastContainer } from "react-toastify"
import { describe, expect, it, vi } from "vitest"
import { ModalEditItem } from "."
import { AppProvider, Item } from "../../context/app-context"

const mockCloseModal = vi.fn()

const mockCurrentItem: Item = {
  id: "78e0ff20-d501-4f3d-a448-b9e4c5f047dd",
  name: "Item Teste",
  description: "Descrição do Item",
  priority: "medium",
  createdAt: new Date(),
}

describe("ModalEditItem Component", () => {
  it("should render input fields correctly", () => {
    render(
      <AppProvider>
        <ModalEditItem
          Modal={({ children }) => <div>{children}</div>}
          closeModal={mockCloseModal}
          currentItem={mockCurrentItem}
        />
      </AppProvider>
    )

    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Prioridade/i)).toBeInTheDocument()
  })

  it("should display validation errors when inputs are empty", async () => {
    render(
      <AppProvider>
        <ModalEditItem
          Modal={({ children }) => <div>{children}</div>}
          closeModal={mockCloseModal}
          currentItem={{ ...mockCurrentItem, name: "", description: "" }}
        />
      </AppProvider>
    )

    const submitButton = screen.getByRole("button", { name: /salvar/i })

    fireEvent.click(submitButton)

    expect(await screen.findByText(/Nome é obrigatório/i)).toBeInTheDocument()
    expect(
      await screen.findByText(/Descrição é obrigatória/i)
    ).toBeInTheDocument()
  })

  it("should edit an item correctly when the form is filled", async () => {
    render(
      <AppProvider>
        <ToastContainer />
        <ModalEditItem
          Modal={({ children }) => <div>{children}</div>}
          closeModal={mockCloseModal}
          currentItem={{ ...mockCurrentItem, name: "", description: "" }}
        />
      </AppProvider>
    )

    fireEvent.input(screen.getByLabelText(/Nome/i), {
      target: { value: "Novo Item" },
    })
    fireEvent.input(screen.getByLabelText(/Descrição/i), {
      target: { value: "Descrição do item" },
    })
    fireEvent.change(screen.getByLabelText(/Prioridade:/i), {
      target: { value: "medium" },
    })

    const submitButton = screen.getByRole("button", { name: /Salvar/i })
    fireEvent.click(submitButton)

    expect(await screen.findByText(/Item salvo!/i)).toBeInTheDocument()
  })
})
