import { NextFunction, Request, Response } from "express";
import { createParent } from "./parents.controller";
import { createStudent } from "./students.controller";
import { AppDataSource } from "../data-source";
import jwt from "jsonwebtoken";
import { Student } from "../entity/students.entity";
import { Parent } from "../entity/parents.entity";
import { comparePassword } from "../utils/password.bcrypt";
import AppError from "../utils/appError";

export const registerParent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parent = await createParent({ ...req.body });

    res.status(201).json({
      status: "success",
      data: {
        parent,
      },
    });
  } catch (error: any) {
    if (error?.code === "23505") {
      return res.status(409).json({
        status: "fail",
        message: "Parent with email already exists",
      });
    }
  }
};

export const registerStudent = async (
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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, userType } = req.body;
    const repository = userType === "student" ? Student : Parent;
    const userRepository = AppDataSource.getRepository(repository);

    const user = await userRepository.findOneBy({ email });
    if (
      !user ||
      !(await repository.comparePasswords(password, user.password))
    ) {
      return next(next(new AppError(400, "Invalid email or password")));
    }

    // 
  } catch (error: any) {
    next(error);
  }
};
