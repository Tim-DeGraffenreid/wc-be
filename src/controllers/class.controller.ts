import { NextFunction, Request, Response } from 'express'
import {
  addClass,
  deleteClass,
  findClassById,
  getClasses,
  updateClass,
} from '../services/class.service'
import AppError from '../utils/appError'

export const getClassesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classes = await getClasses()
    res.status(200).json({
      status: 'success',
      classes,
    })
  } catch (error) {
    next(error)
  }
}

export const addClassHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newClass = await addClass(req.body)

    res.status(201).json({
      status: 'success',
      data: newClass,
    })
  } catch (error) {
    next(error)
  }
}

export const getClassByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const clss = await findClassById(id)
    if (!clss) {
      return next(new AppError(404, 'Class with id does not exist'))
    }
    res.status(200).json({
      status: 'success',
      data: clss,
    })
  } catch (error) {}
}

export const updateClassHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const clss = await findClassById(id)

    if (!clss) {
      return next(new AppError(404, 'Class with id does not exist'))
    }
    const updatedClass = await updateClass(id, clss)

    Object.assign(clss, req.body)

    res.status(200).json({
      status: 'success',
      data: {
        post: updatedClass,
      },
    })
  } catch (error) {}
}

export const deleteClassHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const clss = await findClassById(id)
    if (!clss) {
      return next(new AppError(404, 'Class with id does not exist'))
    }

    await deleteClass(id)
    res.status(204).json({
      status: 'success',
      data: null,
    })
  } catch (error) {
    next(error)
  }
}
