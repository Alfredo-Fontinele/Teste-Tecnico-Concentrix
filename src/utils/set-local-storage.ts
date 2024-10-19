export const setLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data))
}
