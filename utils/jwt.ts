import jwt from 'jsonwebtoken'

export const signToken = (data: { _id: string, email: string }) => {
  const SECRET_JWT = process.env.JWT_SECRET
  if (!SECRET_JWT) {
    throw new Error('No hay variable JWT_SECRET')
  }

  return jwt.sign(data, SECRET_JWT, {
    expiresIn: '20m'
  })
}

export const validateToken = (token: string) => {
  const SECRET_JWT = process.env.JWT_SECRET
  if (!SECRET_JWT) {
    throw new Error('No hay variable JWT_SECRET')
  }

  const { _id } = jwt.verify(token, SECRET_JWT) as { _id: string }
  return _id
}