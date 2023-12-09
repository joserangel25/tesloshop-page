import { createContext } from 'react';

export interface ContextProps {
  isMenuOpen: boolean
  toogleSideMenu: () => void
}

export const UiContext = createContext({} as ContextProps)