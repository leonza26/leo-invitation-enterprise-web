import { useModalStore } from '../stores/modalStore'

export const useModal = () => {
  const { isOpen, modalType, metadata, openModal, closeModal } = useModalStore()
  return {
    isOpen,
    modalType,
    metadata,
    open: (type, metadata) => openModal(type, metadata),
    close: () => closeModal()
  }
}
