import { NextFunction, Request, Response } from "express";
import { Student } from "../entity/students.entity";
import { DeepPartial } from "typeorm";
import AppDataSource from "../data-source";
import {
  createStudent,
  findStudentById,
  getStudents,
} from "../services/students.service";
import AppError from "../utils/appError";

const studentRepository = AppDataSource.getRepository(Student);

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

export const getStudentHandler = async (req: Request, res: Response) => {};
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

    await student.remove();
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
