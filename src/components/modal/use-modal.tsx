import { useState } from "react"
import { Modal, ModalProps, ModalType } from "."

export type UseModalProps = {
  role?: string
  type?: ModalType
  className?: string
  children: React.ReactNode
} & Pick<ModalProps, "children">

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(() => true)
  const closeModal = () => setIsOpen(() => false)

  return {
    isOpen,
    openModal,
    closeModal,
    Modal: ({ type, className, role, children }: UseModalProps) => (
      <Modal
        role={role}
        type={type}
        isOpen={isOpen}
        closeModal={closeModal}
        className={className}
      >
        {children}
      </Modal>
    ),
  }
}
