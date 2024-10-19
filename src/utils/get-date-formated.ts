export const getDateFormated = (currentDate: Date) => {
  const splited = currentDate.toISOString().split("T")[0].split("-")

  const formatedDate = `${splited[2]}/${splited[1]}/${splited[0]}`

  const formatedHours = currentDate.toLocaleTimeString("pt-BR")

  const today = `${formatedDate} às ${formatedHours}`

  return today
}
