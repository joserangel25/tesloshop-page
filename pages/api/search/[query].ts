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
      return getProductBySearch(req, res)

    default:
      return res.status(400).json({ msg: 'El método solicitado no existe' })
  }
}

const getProductBySearch = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query = '' } = req.query
  const q = query.toString().trim().toLowerCase()
  if (!q) {
    return res.status(400).json({ msg: 'Debe especificar un valor para la búsqueda.' })
  }
  try {
    await db.connect()
    const products = await Product.find({ $text: { $search: q } }).select('title images prices inStock slug').lean()
    await db.disconnect()
    if (!products.length) {
      return res.status(404).json({ msg: 'No existen resultados para la búsqueda' })
    }
    res.status(200).json(products)
  } catch (error) {
    console.log(error)
    await db.disconnect()
    res.status(500).json({ msg: 'Ocurrió un error con la búsqueda en la base de datos' })
  }
}