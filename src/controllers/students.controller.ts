import { NextFunction, Request, Response } from "express";
import { Student } from "../entity/students.entity";
import AppDataSource from "../data-source";
import {
  addToClass,
  createStudent,
  findStudentById,
  getStudentClasses,
  getStudents,
} from "../services/students.service";
import AppError from "../utils/appError";
import { findClassById } from "../services/class.service";

export const getStudentsHandler = async (req: Request, res: Response) => {
  const students = await getStudents();
  res.status(200).json({
    status: "success",
    students,
  });
};

export const createStudentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const student = await createStudent({ ...req.body });

    res.status(201).json({
      status: "success",
      data: {
        student,
      },
    });
  } catch (error: any) {
    if (error?.code === "23505") {
      return res.status(409).json({
        status: "fail",
        message: "Student with email already exists",
      });
    }
  }
};

export const getStudentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const student = await findStudentById(id);
    if (!student) {
      return next(new AppError(404, "Student with id does not exist"));
    }
    res.status(200).json({
      status: "success",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStudentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const student = await findStudentById(id);
    if (!student) {
      return next(new AppError(404, "Student with id does not exist"));
    }

    console.log(student);

    student.knowledge = [];
    await student.remove();
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStudentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const student = await findStudentById(id);

    if (!student) {
      return next(new AppError(404, "Student with id does not exist"));
    }

    Object.assign(student, req.body);
    await student.save();

    res.status(200).json({
      status: "success",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

export const addToClassHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { classId } = req.params;

    const getClass = await findClassById(classId);

    if (!getClass) {
      return res.status(404).json({ error: "Class not found" });
    }

    await addToClass(res.locals.user, getClass);

    res.status(201).json({
      status: "success",
      message: "Added to class successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentClassHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = res.locals.user;
    const classes = await getStudentClasses(id);

    res.status(200).json({
      status: "success",
      classes,
    });
  } catch (error) {
    next(error);
  }
};
