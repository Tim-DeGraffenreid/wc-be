import { CookieOptions, NextFunction, Request, Response } from 'express'
import AppError from '../utils/appError'
import { createParent, findParentByEmail } from '../services/parents.service'
import { signTokens } from '../services/auth.service'
import { createStudent, findStudentByDetails } from '../services/students.service'
import { comparePasswords } from '../utils/password.manager'
import prisma from '../utils/prisma'
import {
  addParentToSalesforce,
  addStudentToSalesforce,
} from '../services/salesforce.service'

const accessTokenExpiresInMinutes = Number(process.env.ACCESS_TOKEN_EXPIRES_IN)
if (isNaN(accessTokenExpiresInMinutes)) {
  throw new Error('Invalid ACCESS_TOKEN_EXPIRES_IN value')
}

const cookiesOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
}

if (process.env.NODE_ENV === 'production') cookiesOptions.secure = true

const accessTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(Date.now() + accessTokenExpiresInMinutes * 60 * 1000),
  maxAge: accessTokenExpiresInMinutes * 60 * 1000,
}

export const registerParent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const salesforce = await addParentToSalesforce(req.body)
    if (salesforce) {
      const parent = await createParent({ ...req.body, salesforceId: salesforce.id })

      const { access_token } = await signTokens(parent)

      res.cookie('access_token', access_token, accessTokenCookieOptions)
      res.cookie('user_type', 'parent', {
        ...accessTokenCookieOptions,
        httpOnly: false,
      })
      res.cookie('logged_in', true, {
        ...accessTokenCookieOptions,
        httpOnly: false,
      })

      res.status(201).json({
        status: 'success',
        access_token,
        data: {
          parent,
        },
      })
    }
  } catch (error: any) {
    if (error?.code === 'P2002' && error.meta?.target?.includes('email')) {
      // Unique constraint violation on email field
      return res.status(409).json({
        status: 'fail',
        message: 'Email address is already in use.',
      })
    }

    console.error('Unexpected Error:', error)
    res.status(500).json({
      status: 'error',
      message: 'An unexpected error occurred.',
    })
  }
}

export const registerStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const salesforce = await addStudentToSalesforce(req.body)
    const student = await createStudent({ ...req.body, salesforceId: salesforce.id })

    const { access_token } = await signTokens(student)

    res.cookie('access_token', access_token, accessTokenCookieOptions)
    res.cookie('user_type', 'student', {
      ...accessTokenCookieOptions,
      httpOnly: false,
    })
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    })

    res.status(201).json({
      status: 'success',
      access_token,
      data: {
        student,
      },
    })
  } catch (error: any) {
    if (error?.code === 'P2002' && error.meta?.target?.includes('email')) {
      // Unique constraint violation on email field
      return res.status(409).json({
        status: 'fail',
        message: 'Email address is already in use.',
      })
    }

    console.error('Unexpected Error:', error)
    res.status(500).json({
      status: 'error',
      message: 'An unexpected error occurred.',
    })
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, userType } = req.body

    let user
    if (userType === 'parent') {
      user = await prisma.parent.findUnique({
        where: { email },
      })
    } else {
      user = await prisma.student.findUnique({
        where: { email },
      })
    }

    console.log(user)

    if (!user || !(await comparePasswords(password, user.password))) {
      return next(new AppError(400, 'Invalid email or password'))
    }

    const { access_token } = await signTokens(user)

    res.cookie('access_token', access_token, accessTokenCookieOptions)
    res.cookie('user_type', userType, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    })
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    })

    // 4. Send response
    res.status(200).json({
      status: 'success',
      access_token,
    })
  } catch (error: any) {
    next(error)
  }
}

export const getMeHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userType, ...rest } = res.locals.user

    res.status(200).json({
      status: 'success',
      data: {
        ...rest,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const forgotPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userType, email, ...rest } = req.body
    let results

    if (userType === 'student') {
      results = await findStudentByDetails(rest)
    } else if (userType === 'parent') {
      results = await findParentByEmail({ email })
    }

    if (!results) {
      return next(new AppError(400, 'Details not found'))
    }

    res.status(201).json({
      status: 'success',
      results,
    })
  } catch (error) {
    next(error)
  }
}
