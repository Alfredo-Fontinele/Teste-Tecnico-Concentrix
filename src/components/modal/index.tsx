import { AnimatePresence, motion } from "framer-motion"
import React, { useEffect, useRef } from "react"
import { ClassNameValue, twMerge } from "tailwind-merge"

export type ModalType = "dark" | "none"

export type ModalProps = {
  backgroundClassName?: ClassNameValue
  className?: ClassNameValue
  isOpen?: boolean
  role?: string
  closeModal: () => void
  type?: ModalType
  children?: React.ReactNode
}

export function Modal({
  closeModal,
  type = "none",
  role,
  backgroundClassName,
  className,
  isOpen = false,
  children,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, closeModal])

  return (
    <AnimatePresence>
      <motion.section
        role={role}
        className={twMerge(
          `fixed inset-0 ${
            isOpen ? "flex" : "hidden"
          } justify-center items-center z-20 w-full px-2`,
          type === "dark" ? "bg-pallete-dark-1 bg-opacity-55" : "",
          backgroundClassName
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          ref={modalRef}
          className={twMerge(
            "flex flex-col bg-white rounded-lg shadow-2xl",
            className
          )}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
        >
          {children}
        </motion.div>
      </motion.section>
    </AnimatePresence>
  )
}
