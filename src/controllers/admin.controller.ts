import { NextFunction, Request, Response } from 'express'
import { addAdmin, deleteAdmin, updateAdmin } from '../services/admin.service'

export const createAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const admin = await addAdmin(req.body)
    res.status(201).json({
      status: 'success',
      data: admin,
    })
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
