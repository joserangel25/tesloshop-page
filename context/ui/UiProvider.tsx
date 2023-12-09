import { useReducer, FC } from 'react'
import { UiContext, uiReducer } from './'

export interface UiState {
  isMenuOpen: boolean
}

const UI_INITIAL_STATE: UiState = {
  isMenuOpen: false
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const UiProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

  const toogleSideMenu = () => {
    dispatch({ type: 'UI - ToogleMenu' })
  }
  return (
    <UiContext.Provider value={{
      ...state,
      toogleSideMenu
    }}>
      {children}
    </UiContext.Provider>
  )
}