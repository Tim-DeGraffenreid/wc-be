import { NextFunction, Request, Response } from 'express'
import AppError from '../utils/appError'
import {
  addChildToClass,
  addDemographic,
  createNewStudent,
  deleteParent,
  findParentById,
  getDemographicInfo,
  getParentChild,
  getParents,
  getStudents,
  updateParent,
} from '../services/parents.service'
import { findClassById } from '../services/class.service'
import { deleteUser } from '../services/salesforce.service'

/**
 * The below function is an asynchronous handler that retrieves a list of parents and sends a JSON
 * response with the parents.
 * @param {Request} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as the request headers, query parameters, and request
 * body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the response status,
 * headers, and body. In this code snippet, `res.status(200)` sets the response status code to 200 (
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically used to handle errors or to
 * move on to the next middleware function after the current one has completed its task.
 */
export const getParentsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parents = await getParents()
    res.status(200).json({
      status: 'success',
      parents,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * The `getParentHandler` function is an asynchronous function that retrieves a parent object by its ID
 * and sends a JSON response with the parent data if it exists, or throws an error if it doesn't.
 * @param {Request} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as headers, query parameters, and request body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the response status,
 * headers, and body. In this code snippet, `res.status(200)` is used to set the response status to
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically used to handle errors or to
 * move on to the next middleware function in the chain.
 * @returns a JSON response with a status of "success" and the data of the parent object.
 */
export const getParentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const parent = await findParentById(id)
    if (!parent) {
      return next(new AppError(404, 'Parent with id does not exist'))
    }
    res.status(200).json({
      status: 'success',
      data: parent,
    })
  } catch (error) {
    next(error)
  }
}

/* The `deleteParentHandler` function is an asynchronous function that handles the deletion of a parent
record. It takes in three parameters: `req` (the request object), `res` (the response object), and
`next` (a function to pass control to the next middleware function). */
export const deleteParentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const parent = await findParentById(id)
    if (!parent) {
      return next(new AppError(404, 'Parent with id does not exist'))
    }

    const deleteFromSalesforce = await deleteUser(id)

    if (deleteFromSalesforce) {
      await deleteParent(id)
      res.status(204).json({
        status: 'success',
        data: null,
      })
    }
  } catch (error) {
    next(error)
  }
}

export const addStudentsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userType, id } = res.locals.user
  if (userType !== 'parent') {
    return next(new AppError(401, 'Unauthorized'))
  }

  try {
    const student = await createNewStudent(req.body, id)

    res.status(201).json({
      status: 'success',
      data: student,
    })
  } catch (error) {
    next(error)
  }
}

export const getStudentsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = res.locals.user

  try {
    const students = await getStudents(id)

    res.status(200).json({
      status: 'success',
      students,
    })
  } catch (error) {
    next(error)
  }
}

export const updateParentsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    let parent = await findParentById(id)

    if (!parent) {
      return next(new AppError(404, 'Parent with id does not exist'))
    }

    parent = await updateParent(parent, req.body)

    res.status(200).json({
      status: 'success',
      data: parent,
    })
  } catch (error) {
    next(error)
  }
}

export const addDemographicHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = res.locals.user

    const updatedData = await addDemographic(id, req.body)

    res.status(201).json({
      status: 'success',
      data: {
        parent: updatedData,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getDemographicHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = res.locals.user

    const data = await getDemographicInfo(id)

    res.status(200).json({
      status: 'success',
      data,
    })
  } catch (error) {
    next(error)
  }
}

export const addChildToClassHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = res.locals.user
    const { studentId, classId } = req.params

    const student = await getParentChild(id, studentId)
    const getClass = await findClassById(classId)

    if (!student || !getClass) {
      return res.status(404).json({ error: 'Student or class not found' })
    }

    await addChildToClass(student, classId)

    res.status(201).json({
      status: 'success',
      message: 'Student added to class successfully',
    })
  } catch (error) {
    next(error)
  }
}
