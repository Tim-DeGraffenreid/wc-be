import { NextFunction, Request, Response } from 'express'
import {
  addToClass,
  createStudent,
  deleteStudent,
  findStudentById,
  getStudentClasses,
  getStudents,
  updateStudent,
} from '../services/students.service'
import AppError from '../utils/appError'
import { findClassById } from '../services/class.service'
import { deleteUser, updateStudentSalesforce } from '../services/salesforce.service'
import { uploadImage } from '../services/cloudinary.service'

export const getStudentsHandler = async (req: Request, res: Response) => {
  const students = await getStudents()
  res.status(200).json({
    status: 'success',
    students,
  })
}

export const createStudentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const student = await createStudent({ ...req.body })

    res.status(201).json({
      status: 'success',
      data: {
        student,
      },
    })
  } catch (error: any) {
    if (error?.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'Student with email already exists',
      })
    }
  }
}

export const getStudentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const student = await findStudentById(id)
    if (!student) {
      return next(new AppError(404, 'Student with id does not exist'))
    }
    res.status(200).json({
      status: 'success',
      data: student,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteStudentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const student = await findStudentById(id)
    const deleteFromSalesforce = await deleteUser(student.salesforceId, 'student')

    if (deleteFromSalesforce) {
      if (!student) {
        return next(new AppError(404, 'Student with id does not exist'))
      }

      await deleteStudent(id)
      res.status(204).json({
        status: 'success',
        data: null,
      })
    }
  } catch (error) {
    next(error)
  }
}

export const updateStudentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    let student = await findStudentById(id)

    if (!student) {
      return next(new AppError(404, 'Student with id does not exist'))
    }

    student = await updateStudent(student, req.body)
    const salesforce = await updateStudentSalesforce(student.salesforceId, student)
    if (salesforce) {
      res.status(200).json({
        status: 'success',
        data: student,
      })
    }
  } catch (error) {
    next(error)
  }
}

export const addToClassHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { classId } = req.params

    const getClass = await findClassById(classId)

    if (!getClass) {
      return res.status(404).json({ error: 'Class not found' })
    }

    await addToClass(res.locals.user.id, getClass.id)

    res.status(201).json({
      status: 'success',
      message: 'Added to class successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const getStudentClassHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = res.locals.user
    const classes = await getStudentClasses(id)

    res.status(200).json({
      status: 'success',
      classes,
    })
  } catch (error) {
    next(error)
  }
}

export const updateStudentImageHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = res.locals.user
    const image = req.file as Express.Multer.File

    if (!image) {
      return next(new AppError(400, 'No image provided'))
    }

    const student = await findStudentById(id)

    if (!student) {
      return next(new AppError(404, 'Student with id does not exist'))
    }

    const b64 = Buffer.from(image.buffer).toString('base64')
    let dataURI = 'data:' + image.mimetype + ';base64,' + b64
    const { public_id, secure_url } = await uploadImage(dataURI)
    const updatedStudent = await updateStudent(student, {
      profileImagePublicId: public_id,
      profileImageSecureUrl: secure_url,
    })
    res.status(200).json({
      status: 'success',
      data: updatedStudent,
    })
  } catch (error) {
    next(error)
  }
}
