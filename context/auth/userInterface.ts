export interface IUserLogin {
  email: string
  password: string;
}

export interface IUserRegister {
  name: string;
  email: string
  password: string;
}

export interface IUserRegisterRetorn {
  hasError: boolean
  message?: string
}