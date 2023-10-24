import { Request, Response } from "express";
import { Student } from "../entity/students.entity";
import { DeepPartial } from "typeorm";
import { AppDataSource } from "../data-source";

const studentRepository = AppDataSource.getRepository(Student);

export const getStudents = async (req: Request, res: Response) => {
  const students = await studentRepository.find();
  res.status(200).json({
    status: "success",
    students,
  });
};

export const createStudent = async (data: DeepPartial<Student>) => {
  return studentRepository.save(studentRepository.create(data));
};

export const getStudent = async (req: Request, res: Response) => {};
export const deleteStudent = async (req: Request, res: Response) => {};
