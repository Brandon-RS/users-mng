import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import User from '../models/user'

export const validateJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('x-token')
  if (token === undefined) {
    res.status(401).json({ msg: 'Token missing' })
    return
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETKEY ?? '') as JwtPayload
    const user = await User.findById(uid)

    if (user === null) {
      res.status(401).json({ msg: 'User not registered' })
      return
    }

    if (!user.status) {
      res.status(401).json({ msg: 'Invalid Token' })
      return
    }

    req.user = user
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ msg: 'Invalid Token' })
  }
}
