import { useContext } from 'react'
import { UiContext } from '@/context'

export const useUiContext = () => {
  return useContext(UiContext)
}