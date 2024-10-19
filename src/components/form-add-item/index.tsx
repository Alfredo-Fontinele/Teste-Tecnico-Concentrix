import { twMerge } from "tailwind-merge"
import { Button } from "../button"
import { Input } from "../input"
import { Select } from "../select"
import { useFormAddItem } from "./use-form-add-item"

export const FormAddItem = () => {
  const { onHandleSubmit, register, optionsCheckboxPriorities, theme, errors } =
    useFormAddItem()

  return (
    <div
      className={twMerge(
        "flex flex-col gap-5 justify-center items-start w-full max-w-[500px] md:max-w-[400px] border-[1px] border-solid border-pallete-light-1 p-4 rounded-lg",
        theme === "dark" && "border-pallete-dark-2"
      )}
    >
      <h2 className="text-sm font-normal">Criar Item</h2>
      <form onSubmit={onHandleSubmit} className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-xs">
            Nome:
          </label>
          <Input id="name" placeholder="Digite o nome" {...register("name")} />
          {!!errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-xs">
            Descrição:
          </label>
          <Input
            id="description"
            placeholder="Digite a descrição"
            {...register("description")}
          />
          {!!errors.description && (
            <span className="text-red-500 text-xs">
              {errors.description.message}
            </span>
          )}
        </div>
        <div className="flex gap-3 items-center">
          <label htmlFor="priority" className="text-xs">
            Prioridade:
          </label>
          <Select
            id="priority"
            className="max-w-[120px]"
            {...register("priority")}
          >
            {optionsCheckboxPriorities.map((option) => (
              <option key={option.priority} value={option.priority}>
                {option.text}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex justify-center items-center">
          <Button className="w-full max-w-[300px]" type="submit">
            Adicionar
          </Button>
        </div>
      </form>
    </div>
  )
}
