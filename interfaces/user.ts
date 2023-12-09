export type RoleUser = 'admin' | 'client'

export interface IUser {
  _id: string
  name: string
  email: string
  password?: string
  role: RoleUser
  createdAt?: string
  updatedAt?: string
}