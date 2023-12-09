// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '@/database'
import { IProduct } from '@/interfaces'
import { Product } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
  | { msg: string }
  | IProduct[]

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return getAllProducts(req, res)

    default:
      return res.status(400).json({ msg: 'El método solicitado no existe' })
  }
}

const getAllProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  const { gender = 'all' } = req.query
  let condition = {}
  if (gender !== 'all') {
    condition = { gender }
  }
  try {
    await db.connect()
    const products = await Product.find(condition).select('inStock slug title images price').lean()
    res.status(200).json(products)
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Ocurrió un error con la búsqueda en la base de datos' })
  }
} 