import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { ListItems } from "."
import { AppProvider } from "../../context/app-context"

describe("ListItems Component", () => {
  it("should render the pagination controls and display the correct page", () => {
    render(
      <AppProvider>
        <ListItems />
      </AppProvider>
    )

    expect(screen.getByText(/Página: 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Total de páginas:/i)).toBeInTheDocument()
  })
})
