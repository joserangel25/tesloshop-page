import { IUser } from '@/interfaces';
import { AuthState } from './';

type AuthActionType =
  | { type: 'Auth - Login', payload: IUser }
  | { type: 'Auth - LogOut' }

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
  switch (action.type) {
    case 'Auth - Login':
      return {
        ...state,
        isAuht: true,
        user: action.payload
      }
    case 'Auth - LogOut':
      return {
        ...state,
        isAuht: false,
        user: undefined
      }
    default:
      return state
  }
}