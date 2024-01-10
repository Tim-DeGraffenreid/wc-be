import { CookieOptions, NextFunction, Request, Response } from 'express'
import AppError from '../utils/appError'
import {
  changeParentPassword,
  createParent,
  findParentByEmail,
  updateParent,
} from '../services/parents.service'
import { generateVerifyEmailToken, signTokens } from '../services/auth.service'
import {
  createStudent,
  findStudentByDetails,
  findStudentByEmail,
  updateStudent,
} from '../services/students.service'
import { comparePasswords } from '../utils/password.manager'
import prisma from '../utils/prisma'
import {
  addParentToSalesforce,
  addStudentToSalesforce,
} from '../services/salesforce.service'
import { sendConfirmationEmail } from '../services/mail.service'
import redisClient from '../utils/connectRedis'
import { verifyJwt } from '../utils/jwt'

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

// export const registerParent = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const salesforceResponse = await addParentToSalesforce(req.body)
//     if (typeof salesforceResponse === 'object' && 'id' in salesforceResponse) {
//       const parent = await createParent({
//         ...req.body,
//         salesforceId: salesforceResponse.id as string,
//       })

//       const { access_token } = await signTokens(parent)

//       res.cookie('access_token', access_token, accessTokenCookieOptions)
//       res.cookie('user_type', 'parent', {
//         ...accessTokenCookieOptions,
//         httpOnly: false,
//       })
//       res.cookie('logged_in', true, {
//         ...accessTokenCookieOptions,
//         httpOnly: false,
//       })

//       res.status(201).json({
//         status: 'success',
//         access_token,
//         data: {
//           parent,
//         },
//       })
//     }
//   } catch (error: any) {
//     console.error('Unexpected Error:', error)
//     res.status(500).json({
//       status: 'error',
//       message: 'An unexpected error occurred.',
//     })
//   }
// }
export const registerParent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const parentRes = await createParent({
    //   ...req.body,
    // })
    // if (parentRes?.success) {
    const salesforceResponse = await addParentToSalesforce(req.body)
    // if (
    //   typeof salesforceResponse === 'object' &&
    //   'id' in salesforceResponse &&
    //   parentRes?.data
    // ) {
    //   updateParent(parentRes?.data, { salesforceId: salesforceResponse.id })
    // }
    // const { access_token } = await signTokens(parentRes.data!)
    // if (!access_token) {
    //   console.error('Error signing tokens')
    //   return res.status(500).json({
    //     status: 'error',
    //     message: 'An unexpected error occurred while signing tokens.',
    //   })
    // }

    // Set cookies and respond with success
    // res.cookie('access_token', access_token, accessTokenCookieOptions)
    res.cookie('user_type', 'parent', {
      ...accessTokenCookieOptions,
      httpOnly: false,
    })
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    })

    return res.status(201).json({
      status: 'success',
      // access_token,
      // data: {
      //   ...parentRes.data,
      // },
    })
    // } else {
    //   return res.status(500).json({
    //     status: 'error',
    //     message: parentRes?.message,
    //   })
    // }
  } catch (error: any) {
    console.error('Unexpected Error:', error)
    return res.status(500).json({
      status: 'error',
      message: error ? error : 'An unexpected error occurred.',
    })
  }
}

export const registerStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentRes = await createStudent({ ...req.body })
    if (studentRes?.success) {
      const salesforce = await addStudentToSalesforce(req.body)
      if (typeof salesforce === 'object' && 'id' in salesforce && studentRes?.data) {
        await updateStudent(studentRes?.data, { salesforceId: salesforce?.id })
        const { access_token } = await signTokens(studentRes.data!)

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
            ...studentRes.data,
          },
        })
      }
    } else {
      return res.status(500).json({
        status: 'error',
        message: studentRes?.message,
      })
    }
  } catch (error: any) {
    console.error('Unexpected Error:', error)
    res.status(500).json({
      status: 'error',
      message: error ? error : 'An unexpected error occurred.',
    })
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, userType } = req.body

    let user
    if (userType === 'parent') {
      user = await prisma.parent.findFirst({
        where: { email },
      })
    } else {
      user = await prisma.student.findFirst({
        where: { email },
      })
    }

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
      results = await changeParentPassword(email, rest?.password)
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

export const sendConfirmationEmailHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, userType } = req.body
    // const session = await redisClient.get(email)

    // if (session) {
    //   return next(new AppError(400, 'Email already sent'))
    // }

    let results =
      (await findParentByEmail({ email })) || (await findStudentByEmail({ email }))

    if (results) {
      return next(new AppError(400, 'Email already exists'))
    }

    const { token } = await generateVerifyEmailToken({ email, userType })
    await sendConfirmationEmail(email, token!)

    res.status(201).json({
      status: 'success',
      message: 'Email sent',
    })
  } catch (error) {
    next(error)
  }
}

export const verifyEmailHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body
    const decoded = verifyJwt<{ sub: string }>(token)
    if (!decoded) {
      return next(new AppError(400, 'Invalid token'))
    }

    const session = await redisClient.get(decoded.sub)

    if (!session) {
      return next(new AppError(401, `Invalid token or token has expired`))
    }

    res.status(200).json({
      status: 'success',
      email: JSON.parse(session).email,
      userType: JSON.parse(session).userType,
    })
  } catch (error) {
    next(error)
  }
}
