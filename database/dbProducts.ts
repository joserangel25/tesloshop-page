import { Product } from '@/models'
import { db } from './'
import { IProduct } from '@/interfaces'

export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {
  await db.connect()
  const product = await Product.findOne({ slug }).lean()
  await db.disconnect()

  if (!product) {
    return null
  }

  return JSON.parse(JSON.stringify(product))
}

interface ProducSlug {
  slug: string
}
export const getProductsSlugs = async (): Promise<ProducSlug[]> => {
  await db.connect()
  const slugs = await Product.find().select('slug -_id').lean()
  await db.disconnect()

  return slugs
}

export const getProductsByTerm = async (term: string): Promise<IProduct[]> => {
  const q = term.toString().trim().toLowerCase()
  await db.connect()
  const products = await Product.find({ $text: { $search: q } })
    .select('title images price inStock slug -_id')
    .lean()
  await db.disconnect()
  return products
}

export const getLastProducts = async (): Promise<IProduct[]> => {
  await db.connect()
  const products = await Product.find()
    .sort({ createdAt: -1 })
    .limit(6)
    .select('title images price inStock slug -_id')
    .lean()
  await db.disconnect()
  return products
}

