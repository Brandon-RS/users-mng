import { Request, Response } from 'express'

export const userGet = (req: Request, res: Response): void => {
  res.json({
    msg: 'user GET'
  })
}

export const userPost = (req: Request, res: Response): void => {
  const { user } = req.query

  res.json({
    user
  })
}

export const userPut = (req: Request, res: Response): void => {
  const { id } = req.params

  res.json({
    id
  })
}

export const userDelete = (req: Request, res: Response): void => {
  const { id } = req.params

  res.json({
    id
  })
}
