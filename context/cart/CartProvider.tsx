import { useReducer, FC, useEffect } from 'react'
import Cookie from 'js-cookie'
import { CartContext, cartReducer } from './'
import { ICartProduct, IProduct } from '@/interfaces'

export interface CartState {
  cart: ICartProduct[]
  numberOfItems: number;
  subTotal: number;
  impuesto: number;
  total: number;
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  impuesto: 0,
  total: 0
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const CartProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

  useEffect(() => {
    try {
      const cart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
      dispatch({ type: 'Cart - Load Cart from cookies | storage', payload: cart })
    } catch (error) {
      dispatch({ type: 'Cart - Load Cart from cookies | storage', payload: [] })
    }
  }, [])


  useEffect(() => {
    if (state.cart.length) {
      Cookie.set('cart', JSON.stringify(state.cart))
    }
  }, [state.cart])

  useEffect(() => {
    const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0)
    const subTotal = state.cart.reduce((prev, current) => (current.price * current.quantity) + prev, 0)
    const impuesto = subTotal * Number(process.env.NEXT_PUBLIC_TAX_RATE)
    const orderSumary = {
      numberOfItems,
      subTotal,
      impuesto,
      total: subTotal + impuesto
    }
    dispatch({ type: 'Cart - Update Order Sumary', payload: orderSumary })
  }, [state.cart])


  const addproductToCart = (product: ICartProduct) => {

    // dispatch({ type: 'Cart - Add Product', payload: product })

    //! solucion de FH
    const existProductInCart = state.cart.some(p => p._id === product._id);
    if (!existProductInCart) return dispatch({ type: 'Cart - Update Product In Cart', payload: [...state.cart, product] })

    const productInCartButSameSize = state.cart.some(p => p.size === product.size)
    if (!productInCartButSameSize) return dispatch({ type: 'Cart - Update Product In Cart', payload: [...state.cart, product] })

    //Actualizar el producto ya existente
    const updateProductsCart = state.cart.map(p => {
      if (p._id !== product._id) return p
      if (p.size !== product.size) return p

      p.quantity += product.quantity
      return p
    })

    dispatch({ type: 'Cart - Update Product In Cart', payload: updateProductsCart })
  }

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: 'Cart - Change Quantity Product In Cart', payload: product })
  }

  const deleteProductOfCart = (product: ICartProduct) => {
    // const newProductsInCart = state.cart.filter(p => {
    //   if (p._id === product._id && p.size === product.size) {
    //     console.log('elemento eliminado', product)
    //     return false
    //   }
    //   return true
    // })
    const newProductsInCart = state.cart.filter(p => !(p._id === product._id && p.size === product.size))
    dispatch({ type: 'Cart - Delete Product of Cart', payload: newProductsInCart })
  }
  return (
    <CartContext.Provider value={{
      ...state,
      addproductToCart,
      updateCartQuantity,
      deleteProductOfCart
    }}>
      {children}
    </CartContext.Provider>
  )
}