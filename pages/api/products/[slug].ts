// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '@/database'
import { IProduct } from '@/interfaces'
import { Product } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
  | { msg: string }
  | IProduct

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return getProductBySlug(req, res)

    default:
      return res.status(400).json({ msg: 'El método solicitado no existe' })
  }
}

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query
  try {
    await db.connect()
    const product = await Product.findOne({ slug }).lean()
    await db.disconnect()
    if (!product) {
      return res.status(404).json({ msg: 'El producto buscado no existe.' })
    }
    res.status(200).json(product)
  } catch (error) {
    console.log(error)
    await db.disconnect()
    res.status(500).json({ msg: 'Ocurrió un error con la búsqueda en la base de datos' })
  }
}