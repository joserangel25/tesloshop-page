import bcrypt from 'bcrypt'
import { User } from '@/models';
import { db } from './';

type IParamsCheckUser = {
  email: string;
  password: string;
}

export const checkUserEmailPassword = async ({ email, password }: IParamsCheckUser) => {
  await db.connect()
  const user = await User.findOne({ email }).lean()
  await db.disconnect()

  if (!user) {
    return null
  }

  if (!bcrypt.compareSync(password, user?.password!)) {
    return null
  }

  const { role, name, _id } = user!

  return {
    _id,
    role,
    name,
    email
  }
}