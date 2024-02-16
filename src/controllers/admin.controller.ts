import { NextFunction, Request, Response } from 'express'
import {
  addAdmin,
  checkIfSuperAdmin,
  deleteAdmin,
  findAdminByDetails,
  getUpcomingClasses,
  updateAdmin,
} from '../services/admin.service'
import AppError from '../utils/appError'

export const createAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = res.locals.user
    if (await checkIfSuperAdmin(id)) {
      const admin = await addAdmin(req.body)
      res.status(201).json({
        status: 'success',
        data: admin,
      })
    } else {
      throw new AppError(400, 'You are not authorized to perform this action')
    }
  } catch (error) {
    next(error)
  }
}

export const updateAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const admin = await updateAdmin(id, req.body)

    res.status(200).json({
      status: 'success',
      data: admin,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const admin = await deleteAdmin(id)

    res.status(204).json({
      status: 'success',
      data: admin,
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
    const { name, password, phoneNumber } = req.body

    const admin = await findAdminByDetails({ name, phoneNumber })
    const updatedAdmin = await updateAdmin(admin.id, { password })

    res.status(201).json({
      status: 'success',
      data: updatedAdmin,
    })
  } catch (error) {
    next(error)
  }
}

export const getUpcomingClassesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const upcomingClasses = await getUpcomingClasses()

    res.status(200).json({
      status: 'success',
      data: upcomingClasses,
    })
  } catch (error) {
    next(error)
  }
}
