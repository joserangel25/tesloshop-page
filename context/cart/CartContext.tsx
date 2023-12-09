import { ICartProduct } from '@/interfaces';
import { createContext } from 'react';

export interface CartContextProps {
  cart: ICartProduct[]
  numberOfItems: number;
  subTotal: number;
  impuesto: number;
  total: number;
  addproductToCart: (product: ICartProduct) => void
  updateCartQuantity: (product: ICartProduct) => void
  deleteProductOfCart: (product: ICartProduct) => void
}

export const CartContext = createContext({} as CartContextProps)