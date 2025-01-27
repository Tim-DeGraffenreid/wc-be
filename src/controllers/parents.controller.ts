import { NextFunction, Request, Response } from 'express'
import { findClassById } from '../services/class.service'
import { deleteImage, uploadImage } from '../services/cloudinary.service'
import { checkClassScheduledForDay } from '../services/knowledge.service'
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
  removeChildFromClass,
  updateParent,
} from '../services/parents.service'

import {
  deleteUser,
  updateParentSalesforce,
  addStudentWithRelationshipToSF
} from '../services/salesforce.service'
import { deleteStudent, findStudentById, updateStudent } from '../services/students.service'
import AppError from '../utils/appError'
import { generateQRCode } from '../utils/qr_generator'
import { any } from 'zod'
import { deleteStudentHandler } from './students.controller'

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

export const deleteParentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const parent = await findParentById(id)
    const students = await getStudents(id)
    if (!parent) {
      return next(new AppError(404, 'Parent with id does not exist'))
    }
    let salesforceSuccess = false

    const deleteParentFromSalesforce = await deleteUser(parent.salesforceId!, 'parent')
    if (deleteParentFromSalesforce) {
      const deleteStudentPromises = students.map(async (student: any) => {
        await deleteUser(student.salesforceId!, 'student')
      })

      await Promise.all(deleteStudentPromises)

      salesforceSuccess = true
    }

    if (salesforceSuccess) {
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
    //Add student to database
    const student = await createNewStudent({ ...req.body }, id)
    //add student to SF and create relationship to parent
    const salesforce = await addStudentWithRelationshipToSF(req.body, id)
    //Check is SF returns an object and there is a SF id associated with student
    //if successful it will be at index 0 of composite response
    if (typeof salesforce === 'object' && salesforce.compositeResponse[0].body.id) {
      await updateStudent(student, { salesforceId: salesforce.compositeResponse[0].body.id })
      student.salesforceId = salesforce.compositeResponse[0].body.id;

      res.status(201).json({
        status: 'success',
        data: student,
      })
    }else{
      //salesforce rejected adding the student and creating relationship in Sf with parent for 
      //and reason (all or none)
      const errorCodes = salesforce.compositeResponse
        .map((item:any) => item.body)
        .flat()
        .filter((bodyItem:any) => bodyItem.errorCode && bodyItem.errorCode !== "PROCESSING_HALTED")
        .map((filteredItem:any) => filteredItem.errorCode);
      //Rollback adding student to keep db and SF consistent
      await deleteStudent(student.id);

      res.status(409).json({
        status: 'error',
        message: errorCodes.toString() || "An error occurred adding student to Salesforce.",
        })
    }
  } catch (error: any) {
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
    const salesforce = await updateParentSalesforce(parent.salesforceId!, parent)
    if (salesforce) {
      res.status(200).json({
        status: 'success',
        data: parent,
      })
    }
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
    const { date } = req.body

    const student = await getParentChild(id, studentId)
    const getClass = await findClassById(classId)

    if (!student || !getClass) {
      return res.status(404).json({ error: 'Student or class not found' })
    }

    const checkClassScheduled = await checkClassScheduledForDay(studentId, date)

    if (checkClassScheduled) {
      return res.status(400).json({ error: 'Class already scheduled for that date' })
    }

    if (date < new Date()) {
      return res.status(400).json({ error: 'Date cannot be in the past' })
    }

    await addChildToClass(student, classId, date)
    const qrCode = await generateQRCode({
      studentId,
      classId,
      date,
      studentName: `${student.fName} ${student.lName}`,
      className: getClass.name,
    })

    console.log(qrCode)

    res.status(201).json({
      status: 'success',
      message: 'Student added to class successfully',
      qrCode,
    })
  } catch (error) {
    next(error)
  }
}

export const removeChildFromClassHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId, id } = req.params
    const { id: parentId } = res.locals.user

    const student = await getParentChild(parentId, studentId)

    if (!student) {
      return res.status(404).json({ error: 'Student or class not found' })
    }

    await removeChildFromClass(id, studentId)

    res.status(200).json({
      status: 'success',
      message: 'Student removed from class successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const addChildImageHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params
    const image = req.file as Express.Multer.File

    if (!image) {
      return next(new AppError(400, 'No image provided'))
    }

    const student = await findStudentById(studentId)

    if (!student) {
      return next(new AppError(404, 'Student with id does not exist'))
    }

    if (student.profileImagePublicId && student.profileImageSecureUrl) {
      await deleteImage(student.profileImagePublicId)
      student.profileImagePublicId = null
      student.profileImageSecureUrl = null
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
