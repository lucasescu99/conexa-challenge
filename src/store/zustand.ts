import { create } from 'zustand';

const API_URL = process.env.API_URL;

type ModalStore = {
  isOpen: boolean;
  apiURL?: string;
  entity: string;
  searchValue: string;
  toggleModal: (isOpen: boolean, entity: string, searchValue: string) => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  entity: '',
  searchValue: '',
  apiURL: API_URL,
  toggleModal: (isOpen: boolean, entity: string, searchValue: string) =>
    set(() => ({
      isOpen,
      entity,
      searchValue,
    })),
}));
