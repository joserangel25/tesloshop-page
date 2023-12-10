import { createContext } from 'react';
import type { ICartProduct, IShippingAddress } from '@/interfaces';

export interface CartContextProps {
  isLoaded: boolean;
  cart: ICartProduct[]
  numberOfItems: number;
  subTotal: number;
  impuesto: number;
  total: number;
  shippingAddress?: IShippingAddress
  addproductToCart: (product: ICartProduct) => void
  updateCartQuantity: (product: ICartProduct) => void
  deleteProductOfCart: (product: ICartProduct) => void
  updateAddress: (address: IShippingAddress) => void
}

export const CartContext = createContext({} as CartContextProps)