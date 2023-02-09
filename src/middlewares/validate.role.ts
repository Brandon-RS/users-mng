import { NextFunction, Request, Response } from 'express'

export const isAdminRole = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user === undefined) {
    res.status(500).json({
      msg: 'Can not verify Role without validate the token first'
    })
    return
  }

  const { role, name }: { role: string, name: string } = req.user

  if (role !== 'ADMIN') {
    res.status(401).json({ msg: `${name} is not ADMIN` })
    return
  }

  next()
}

export const hasRole = (...roles: string[]): any => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user === undefined) {
      res.status(500).json({
        msg: 'Can not verify Role without validate the token first'
      })
      return
    }

    if (!roles.includes(req.user.role)) {
      res.status(401).json({ msg: 'You need to have one of those roles: ', roles })
      return
    }

    next()
  }
}
