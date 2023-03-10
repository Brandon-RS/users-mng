import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import User from '../models/user'
import { generateJWT } from '../helpers/generate-jwt'
import { googleVerify } from '../helpers/google.verify'

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (user === null) {
      return res.json({ msg: 'User/Password invalid' })
    }

    if (!user.status) {
      return res.json({ msg: 'User/Password invalid' })
    }

    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) {
      return res.json({ msg: 'User/Password invalid' })
    }

    const token = await generateJWT(user.id)

    return res.json({
      user,
      token
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Something went wrong' })
  }
}

export const googleSingIn = async (req: Request, res: Response): Promise<any> => {
  const { idToken } = req.body
  try {
    const { name, email, picture } = await googleVerify(idToken)
    let user = await User.findOne({ email })

    if (user === null || user === undefined) {
      const data = {
        name,
        email,
        password: ':p',
        image: picture,
        role: 'USER',
        google: true
      }
      user = new User(data)
      await user.save()
    }

    if (!user.status) {
      return res.status(401).json({
        msg: 'User blocked'
      })
    }

    const token = await generateJWT(user.id)

    res.json({ user, token })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      msg: 'Token cannot verify'
    })
  }
}
