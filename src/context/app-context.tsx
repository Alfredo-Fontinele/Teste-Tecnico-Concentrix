import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useToasts } from "../hooks/use-toasts"
import { getLocalStorage } from "../utils/get-local-storage"
import { orderItemsByPriority } from "../utils/order-items-by-priority"
import { orderItemsByCreationDate } from "../utils/order-itens-by-creation-date"
import { setLocalStorage } from "../utils/set-local-storage"

type ThemeApplication = "dark" | "light"

export type ItemPriority = "low" | "medium" | "high"

export type Item = {
  id: string
  name: string
  description: string
  priority: ItemPriority
  createdAt: Date
}

export type OrderItemByCreationOption = "recent" | "old"

type OptionCheckboxPriority = {
  text: string
  priority: ItemPriority
}

export type OptionToOrderItemsByCreationDate = {
  text: string
  option: OrderItemByCreationOption
}

type AppContextProps = {
  theme: ThemeApplication
  items: Item[]
  optionsCheckboxPriorities: OptionCheckboxPriority[]
  optionsOrderItemsByCreationDate: OptionToOrderItemsByCreationDate[]
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean

  addItem: (item: Item) => void
  removeItem: (idItem: string) => void
  toogleTheme: () => void
  editItem: (idItem: string, item: Partial<Item>) => void
  nextPage: () => void
  prevPage: () => void
  changeOptionCheckboxPriority: (priority: ItemPriority) => void
  changeOptionToOderItems: (option: OrderItemByCreationOption) => void
  changeInputSearchName: (input: string) => void
}

const AppContext = createContext<AppContextProps>({} as AppContextProps)

export const useAppContext = () => useContext(AppContext)

export const AppProvider = ({ children }: React.PropsWithChildren) => {
  const [theme, setTheme] = useState<ThemeApplication>("dark")

  const toogleTheme = () => {
    const effectiveTheme = theme === "dark" ? "light" : "dark"

    setTheme(() => effectiveTheme)
    setLocalStorage("@theme", effectiveTheme)
  }

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  const [
    optionToOrderItemsByCreationDate,
    setOptionToOrderItemsByCreationDate,
  ] = useState<OrderItemByCreationOption>("recent")
  const [optionsCheckboxPriority, setOptionsCheckboxPriority] = useState<ItemPriority[]>([]) // prettier-ignore
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [inputSearchName, setInputSearchName] = useState("")
  const [items, setItems] = useState<Item[]>([])

  const changeInputSearchName = (input: string) => {
    setInputSearchName(() => input)
  }

  const changeOptionToOderItems = (option: OrderItemByCreationOption) => {
    setOptionToOrderItemsByCreationDate(() => option)
  }

  const optionsOrderItemsByCreationDate: OptionToOrderItemsByCreationDate[] = [
    { text: "Mais recente", option: "recent" },
    { text: "Mais antigo", option: "old" },
  ]

  const optionsCheckboxPriorities: OptionCheckboxPriority[] = [
    { text: "Alta", priority: "high" },
    { text: "Média", priority: "medium" },
    { text: "Baixa", priority: "low" },
  ]

  const changeOptionCheckboxPriority = (priority: ItemPriority) => {
    setOptionsCheckboxPriority((state) => {
      const priorityAlreadyExist = state.some(
        (prevPriority) => prevPriority === priority
      )

      if (priorityAlreadyExist) {
        return state.filter((prevPriority) => prevPriority !== priority)
      }

      return [...state, priority]
    })
  }

  const { toastSuccess } = useToasts()

  const addItem = (item: Item) => {
    const newItems = [...items, item]

    setItems(() => newItems)
    setLocalStorage("@items", newItems)
    toastSuccess("Item criado!")
  }

  const removeItem = (idItem: string) => {
    const filtered = items.filter((item) => item.id !== idItem)

    setItems(() => filtered)
    setLocalStorage("@items", filtered)
    toastSuccess("Item removido!")
  }

  const editItem = (idItem: string, item: Partial<Item>) => {
    const updatedItems = items.map((existingItem) =>
      existingItem.id === idItem ? { ...existingItem, ...item } : existingItem
    )

    setItems(updatedItems)
    setLocalStorage("@items", updatedItems)
    toastSuccess("Item salvo!")
  }

  const PAGE_SIZE_ITEMS = 10

  const totalPages = useMemo(
    () => Math.ceil(items.length / PAGE_SIZE_ITEMS),
    [items]
  )

  const hasNextPage = useMemo(
    () => currentPage < totalPages,
    [currentPage, totalPages]
  )

  const hasPrevPage = useMemo(() => currentPage > 1, [currentPage, totalPages])

  const nextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? (prevPage += 1) : prevPage
    )
  }

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? (prevPage -= 1) : prevPage))
  }

  const effectiveItems = useMemo(() => {
    const paginatedItems = items.slice(
      (currentPage - 1) * PAGE_SIZE_ITEMS,
      currentPage * PAGE_SIZE_ITEMS
    )

    const effectiveItemsByPriority = orderItemsByPriority(paginatedItems)

    const effectiveItems = effectiveItemsByPriority.filter(
      (item) =>
        item.name.toLowerCase().includes(inputSearchName.toLowerCase()) ||
        item.description.toLowerCase().includes(inputSearchName.toLowerCase())
    )

    if (optionsCheckboxPriority.length) {
      const filteredByPriority = effectiveItems.filter((item) =>
        optionsCheckboxPriority.includes(item.priority)
      )

      return orderItemsByCreationDate(
        filteredByPriority,
        optionToOrderItemsByCreationDate
      )
    }

    return orderItemsByCreationDate(
      effectiveItems,
      optionToOrderItemsByCreationDate
    )
  }, [
    items,
    inputSearchName,
    currentPage,
    optionsCheckboxPriority,
    optionToOrderItemsByCreationDate,
  ])

  useEffect(function onRefreshPageGetItemsFromLocalStorage() {
    const items = getLocalStorage<Item[]>("@items")

    if (!items) return

    setItems(() => items)
  }, [])

  useEffect(function onRefreshPageGetThemeFromLocalStorage() {
    const theme = getLocalStorage<ThemeApplication>("@theme")

    if (!theme) return

    setTheme(() => theme)
  }, [])

  return (
    <AppContext.Provider
      value={{
        items: effectiveItems,
        theme,
        hasNextPage,
        hasPrevPage,
        currentPage,
        totalPages,
        optionsCheckboxPriorities,
        optionsOrderItemsByCreationDate,
        changeInputSearchName,
        addItem,
        editItem,
        removeItem,
        toogleTheme,
        nextPage,
        prevPage,
        changeOptionCheckboxPriority,
        changeOptionToOderItems,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
