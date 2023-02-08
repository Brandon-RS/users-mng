import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import User from '../models/user'

export const userGet = async (req: Request, res: Response): Promise<void> => {
  const { limit, from } = req.query
  const query = { status: true }

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from ?? 0)).limit(Number(limit ?? 10))
  ])

  res.json({
    total,
    users
  })
}

export const userPost = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role } = req.body
  const user = new User({ name, email, password, role })

  const salt = bcryptjs.genSaltSync()
  user.password = bcryptjs.hashSync(password, salt)
  await user.save()

  res.json({
    user
  })
}

export const userPut = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { _id, password, google, ...rest } = req.body

  if (password !== undefined) {
    const salt = bcryptjs.genSaltSync()
    rest.password = bcryptjs.hashSync(password, salt)
  }

  const user = await User.findByIdAndUpdate(id, rest, { new: true })

  res.json({
    user
  })
}

export const userDelete = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params

  const user = await User.findByIdAndUpdate(id, { status: false })

  res.json({
    user
  })
}
