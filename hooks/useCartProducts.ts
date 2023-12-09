import { useContext } from 'react'
import { CartContext } from '@/context'

export const useCartContext = () => {
  return useContext(CartContext)
}