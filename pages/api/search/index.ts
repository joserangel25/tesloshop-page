
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
  | { msg: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  res.status(404).json({ msg: 'Solicitud no permitida. Debe agregar el query de filtro.' })
}
