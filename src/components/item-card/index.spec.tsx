import { fireEvent, render, screen } from "@testing-library/react"
import { ToastContainer } from "react-toastify"
import { ItemCard } from "."
import { AppProvider, Item } from "../../context/app-context"

describe("ItemCard Component", () => {
  const mockItem: Item = {
    id: "78e0ff20-d501-4f3d-a448-b9e4c5f047dd",
    name: "Item de Teste",
    description: "Descrição do item de teste",
    priority: "medium",
    createdAt: new Date(),
  }

  it("should open modal to edit item", () => {
    render(
      <AppProvider>
        <ItemCard item={mockItem} />
      </AppProvider>
    )

    const editButton = screen.getByRole("edit-item")

    fireEvent.click(editButton)

    expect(screen.getByRole("modal-edit-item")).toBeInTheDocument()
  })

  it("should remove item and render toast sucess", async () => {
    render(
      <AppProvider>
        <ItemCard item={mockItem} />
        <ToastContainer />
      </AppProvider>
    )

    const removeButton = screen.getByRole("remove-item")
    fireEvent.click(removeButton)

    expect(await screen.findByText("Item removido!")).toBeInTheDocument()
  })
})
