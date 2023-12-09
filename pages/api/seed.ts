// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db, seedDatabase } from '@/database'
import { Product, User } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  msg: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(400).json({ msg: 'Este endpoint solo es de uso en entorno de desarollo.' })
  }

  await db.connect()
  // await Product.collection.drop()
  await User.deleteMany()
  await User.insertMany(seedDatabase.initialData.users)
  await Product.deleteMany()
  await Product.insertMany(seedDatabase.initialData.products)
  await db.disconnect()

  res.json({ msg: 'Información actualizada correctamente' })

}
