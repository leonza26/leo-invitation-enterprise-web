import { create } from 'zustand'

export const useModalStore = create((set) => ({
  isOpen: false,
  modalType: null, // e.g., 'createInvitation', 'editUser', 'viewRsvp'
  metadata: {},
  openModal: (type, metadata = {}) => set({ isOpen: true, modalType: type, metadata }),
  closeModal: () => set({ isOpen: false, modalType: null, metadata: {} })
}))
