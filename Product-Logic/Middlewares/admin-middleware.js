import jwt from "jsonwebtoken"

export default (req, res, next) => {
  try {
  const accessToken = req.headers.authorization.split(' ')[1]
  const { roles } = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
  const permission = roles.some(item => item === 'Admin');
  if (!permission) {
    res.status(400).json({ message: 'access denied' })
  }
  next()
} catch (err) {
  next(err)
}
} 