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
    case 'GET':
      return checkJwt(req, res)
    default:
      res.status(400).json({ message: 'Endpoint no permitido' })
  }
}

const checkJwt = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = '' } = req.cookies
  let userId = '';
  try {
    userId = jwt.validateToken(token)
    console.log(userId)
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Token no válido' })
  }
  await db.connect()
  const user = await User.findById(userId).lean()
  await db.disconnect()

  if (!user) {
    return res.status(400).json({ message: 'No existe usuario con ese id - TOKEN' })
  }
  const { role, name, _id, email } = user
  res.status(200).json({
    token: jwt.signToken({ _id, email }),
    user: {
      name,
      email,
      role
    }
  })

}