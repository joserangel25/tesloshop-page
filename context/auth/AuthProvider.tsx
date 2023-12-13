import { useReducer, FC, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useSession, signOut } from "next-auth/react";

import { AuthContext, type IUserRegister, authReducer, type IUserLogin, type IUserRegisterRetorn } from './'
import { IUser } from '@/interfaces'
import { tesloApi } from '@/api'
import { useRouter } from 'next/router'

export interface AuthState {
  isAuht: boolean
  user?: IUser
}

const AUTH_INITIAL_STATE: AuthState = {
  isAuht: false,
  user: undefined
}

interface Props {
  children: JSX.Element | JSX.Element[]
}



export const AuthProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)
  const router = useRouter()
  const { data, status } = useSession()

  // Ya no uso la autenticación personalizada, si no que comienzo a trabajar con Nexxt-Auth
  // useEffect(() => {
  //   const token = Cookies.get('token')
  //   if (token) {
  //     checkToken()
  //   }
  // }, [])

  useEffect(() => {
    if (status === 'authenticated') {
      console.log({ user: data.user })
      dispatch({ type: 'Auth - Login', payload: data.user as IUser })
    }
  }, [status, data])


  const checkToken = async () => {
    try {
      const { data } = await tesloApi('/user/validate-token');
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: 'Auth - Login', payload: user })
    } catch (error) {
      Cookies.remove('token')
      // console.log(error)
    }
  }

  const loginUser = async ({ email, password }: IUserLogin): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password })
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: 'Auth - Login', payload: user })
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const registerUser = async ({ name, password, email }: IUserRegister): Promise<IUserRegisterRetorn> => {
    try {
      const { data } = await tesloApi.post('/user/register', { email, password, name })
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: 'Auth - Login', payload: user })
      return {
        hasError: false,
      }
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message
        }
      }
      return {
        hasError: true,
        message: 'No se pudo crear el usuario, intente de nuevo.'
      }

    }
  }

  const logoutUser = () => {
    // Cookies.remove('token')
    Cookies.remove('cart')
    Cookies.remove('firstName')
    Cookies.remove('lastName')
    Cookies.remove('address')
    Cookies.remove('address2')
    Cookies.remove('zip')
    Cookies.remove('city')
    Cookies.remove('country')
    Cookies.remove('phone')

    signOut()
    // router.reload()
  }
  return (
    <AuthContext.Provider value={{
      isAuth: state.isAuht,
      user: state.user,
      loginUser,
      registerUser,
      logoutUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}