import { NextFunction, Request, Response } from 'express'
import {
  addAdmin,
  checkIfSuperAdmin,
  deleteAdmin,
  deleteStudentRegistration,
  findAdminByDetails,
  findAdminById,
  getUpcomingClasses,
  unVerifyStudent,
  updateAdmin,
  verifyStudent,
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

export const verifyStudentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId, classId, date } = req.body
    const { id } = res.locals.user

    await findAdminById(id)

    const updatedData = await verifyStudent({ studentId, classId, date }, id)

    res.status(200).json({
      status: 'success',
      message: 'Student verified successfully',
      data: updatedData,
    })
  } catch (error) {
    next(error)
  }
}

export const unVerifyStudentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId, classId, date } = req.body
    const { id } = req.params

    const updatedData = await unVerifyStudent(id, studentId, classId, date)

    res.status(200).json({
      status: 'success',
      message: 'Student unverified successfully',
      data: updatedData,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteFromClassHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { classId } = req.body
    const { id } = req.params

    await deleteStudentRegistration(id)

    res.status(200).json({
      status: 'success',
      message: 'Student registration deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}
