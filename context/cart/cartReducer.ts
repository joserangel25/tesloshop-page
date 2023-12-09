import { ICartProduct } from '@/interfaces';
import { CartState } from '.';

type CartActionType =
  | { type: 'Cart - Load Cart from cookies | storage', payload: ICartProduct[] }
  | { type: 'Cart - Update Product In Cart', payload: ICartProduct[] }
  | { type: 'Cart - Change Quantity Product In Cart', payload: ICartProduct }
  | { type: 'Cart - Delete Product of Cart', payload: ICartProduct[] }
  | {
    type: 'Cart - Update Order Sumary',
    payload: {
      numberOfItems: number;
      subTotal: number;
      impuesto: number;
      total: number;
    }
  }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  const { type, payload } = action
  switch (type) {
    case 'Cart - Load Cart from cookies | storage':
      return {
        ...state,
        cart: [...payload]
      }
    case 'Cart - Update Product In Cart':
      return {
        ...state,
        cart: [...payload]
      }
    case 'Cart - Change Quantity Product In Cart':
      return {
        ...state,
        cart: state.cart.filter(p => {
          if (p._id === payload._id && p.size === payload.size) {
            return payload
          }
          return p
        })
      }
    case 'Cart - Delete Product of Cart':
      return {
        ...state,
        cart: [...payload]
      }
    case 'Cart - Update Order Sumary':
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}