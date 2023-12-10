import { IUser } from '@/interfaces';
import { createContext } from 'react';
import { IUserLogin, IUserRegister, IUserRegisterRetorn } from '.';

export interface ContextPropsAuth {
  isAuth: boolean
  user?: IUser
  loginUser: ({ email, password }: IUserLogin) => Promise<boolean>
  registerUser: ({ name, password, email }: IUserRegister) => Promise<IUserRegisterRetorn>
  logoutUser: () => void
}

export const AuthContext = createContext({} as ContextPropsAuth)