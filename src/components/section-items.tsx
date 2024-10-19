import {
  OrderItemByCreationOption,
  useAppContext,
} from "../context/app-context"
import { Input } from "./input"
import { ListItems } from "./list-items"
import { Select } from "./select"

export const SectionItems = () => {
  const {
    changeOptionCheckboxPriority,
    changeOptionToOderItems,
    changeInputSearchName,
    optionsCheckboxPriorities,
    optionsOrderItemsByCreationDate,
  } = useAppContext()

  return (
    <section className="flex flex-col gap-6 w-full max-w-[500px]">
      <div className="flex flex-col sm:flex-row justify-start gap-6 w-full">
        <div className="flex flex-col gap-2 w-full ">
          <span className="text-sm">Pesquise</span>
          <Input
            onChange={(e) => changeInputSearchName(e.target.value)}
            placeholder="Pesquisar por nome ou descrição"
          />
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="flex flex-col justify-between gap-3 w-full">
          <span className="text-sm">Filtrar por Prioridade:</span>

          <ul className="flex items-center gap-2">
            {optionsCheckboxPriorities.map((optionCheckboxPriority) => (
              <li
                key={optionCheckboxPriority.priority}
                className="flex items-center gap-1"
              >
                <span className="text-xs">{optionCheckboxPriority.text}</span>
                <input
                  onClick={() =>
                    changeOptionCheckboxPriority(
                      optionCheckboxPriority.priority
                    )
                  }
                  type="checkbox"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 h-full w-full">
          <span className="text-sm">Ordenar por Data:</span>
          <Select
            onChange={(e) => {
              const value = e.target.value as OrderItemByCreationOption
              changeOptionToOderItems(value)
            }}
            defaultValue={"default"}
            className="w-full"
          >
            {optionsOrderItemsByCreationDate.map((option) => (
              <option key={option.option} value={option.option}>
                {option.text}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <ListItems />
    </section>
  )
}
