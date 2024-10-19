import { Item } from "../context/app-context"

export const generateItems = (count: number): Item[] => {
  const priorities: Array<"high" | "medium" | "low"> = ["high", "medium", "low"]

  return Array.from({ length: count }).map((_, index) => ({
    id: crypto.randomUUID(),
    name: `Todo ${index}`,
    description: `todo ${index} description`,
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    createdAt: new Date(),
  }))
}
