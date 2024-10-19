import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md"
import { twMerge } from "tailwind-merge"
import { HorizontalLine } from "../horizontal-line"
import { ItemCard } from "../item-card"
import { useListItems } from "./use-list-items"

export const ListItems = () => {
  const {
    currentPage,
    items,
    theme,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    verifyIsLastItemById,
  } = useListItems()

  return (
    <div className="flex flex-col gap-2 max-w-[500px] justify-center w-full rounded-xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <MdOutlineArrowBackIosNew
            onClick={prevPage}
            className={twMerge(
              "cursor-pointer p-[6px] h-[25px] w-[25px] border-[1px] border-solid border-pallete-light-1",
              theme === "dark" && "border-pallete-dark-2",
              !hasPrevPage && "cursor-no-drop"
            )}
          />

          <p className="text-sm">Página: {currentPage}</p>

          <MdOutlineArrowForwardIos
            onClick={nextPage}
            className={twMerge(
              "cursor-pointer p-[6px] h-[25px] w-[25px] border-[1px] border-solid border-pallete-light-1",
              theme === "dark" && "border-pallete-dark-2",
              !hasNextPage && "cursor-no-drop"
            )}
          />
        </div>

        <p className="text-sm">
          Total de páginas: {totalPages === 0 ? 1 : totalPages}
        </p>
      </div>

      <div
        className={twMerge(
          "p-2 border-[1px] border-solid border-pallete-light-1 rounded-lg",
          theme === "dark" && "border-pallete-dark-2"
        )}
      >
        <ul
          className={
            "flex flex-col gap-3 h-[450px] w-full overflow-y-auto pr-3"
          }
        >
          {!items.length ? (
            <div
              className={twMerge(
                "w-full h-full flex justify-center items-center text-sm",
                theme === "dark" ? "text-white" : "text-black"
              )}
            >
              Nenhum item encontrado nesta página
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id}>
                <ItemCard item={item} />
                {!verifyIsLastItemById(item.id) ? <HorizontalLine /> : null}
              </div>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
