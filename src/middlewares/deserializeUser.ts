import { NextFunction, Request, Response } from 'express'
import AppError from '../utils/appError'
import redisClient from '../utils/connectRedis'
import { verifyJwt } from '../utils/jwt'
import prisma from '../utils/prisma'

type UserType = 'student' | 'parent'

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let access_token
    const userType: UserType = req.cookies.user_type
    console.log(userType)
    // const userType = 'parent'

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      access_token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token
    }

    if (!access_token) {
      return next(new AppError(401, 'You are not logged in'))
    }

    // Validate the access token
    const decoded = verifyJwt<{ sub: string }>(access_token)

    if (!decoded) {
      return next(new AppError(401, `Invalid token or user doesn't exist`))
    }

    // Check if the user has a valid session
    const session = await redisClient.get(decoded.sub)

    if (!session) {
      return next(new AppError(401, `Invalid token or session has expired`))
    }

    let user
    if (userType === 'parent') {
      user = await prisma.parent.findUnique({
        where: { id: JSON.parse(session).id },
      })
    } else {
      user = await prisma.student.findUnique({
        where: { id: JSON.parse(session).id },
      })
    }

    if (!user) {
      return next(new AppError(401, `Invalid token or session has expired`))
    }

    // Add user to res.locals
    res.locals.user = { ...user, userType }

    next()
  } catch (err: any) {
    next(err)
  }
}
