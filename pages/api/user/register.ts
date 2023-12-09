import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { db } from '@/database'
import { User } from '@/models'
import { RoleUser } from '@/interfaces'
import { jwt, validations } from '@/utils'

type Data =
  | { message: string }
  | { token: string; user: { role: RoleUser; name: string; email: string } }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return registerUser(req, res)
    default:
      res.status(400).json({ message: 'Endpoint no permitido' })
  }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = '', password = '', name = '' } = req.body as { email: string, password: string, name: string }

  await db.connect()
  const user = await User.findOne({ email }).lean()

  if (user) {
    await db.disconnect()
    return res.status(400).json({ message: 'Correo ya está registrado - EMAIL' })
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'La contraseña debe ser de al menos 6 caractéres' })
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'El nombre debe ser de al menos 3 caractéres' })
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({ message: 'Correo no es válido - EMAIL' })
  }

  const newUser = new User({
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password, 10),
    role: 'client',
    name: name
  })

  try {
    await newUser.save({ validateBeforeSave: true })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Revisar logs del servidor' })
  }



  const { _id, role } = newUser
  res.status(200).json({
    token: jwt.signToken({ _id, email }),
    user: {
      name,
      email,
      role
    }
  })

}