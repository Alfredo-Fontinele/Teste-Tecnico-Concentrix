export const getLocalStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key)

  if (!item) return null

  return JSON.parse(item)
}
