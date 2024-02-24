import { NextFunction, Request, Response } from 'express'
import AppError from '../utils/appError'
import prisma from '../utils/prisma'

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user

    if (!user) {
      return next(new AppError(400, `Session has expired or user doesn't exist`))
    }

    next()
  } catch (err: any) {
    next(err)
  }
}

export const checkIfAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user

    if (!user) {
      return next(new AppError(400, `Session has expired or user doesn't exist`))
    }

    const admin = prisma.admin.findFirst({ where: { id: user.id } })

    if (!admin) {
      return next(new AppError(400, `You are not authorized to perform this action`))
    }

    next()
  } catch (err: any) {
    next(err)
  }
}
