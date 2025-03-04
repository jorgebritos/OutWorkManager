import jwt from 'jsonwebtoken'

export const generate_token = (user) => {
  return jwt.sign({uid: user.id, email: user.email, role: user.rol}, process.env.JWT_SECRET, {expiresIn: 60 * 1500})
}
