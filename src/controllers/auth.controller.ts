import { CookieOptions, NextFunction, Request, Response } from "express";
import { createStudent } from "./students.controller";
import AppDataSource from "../data-source";
import { Student } from "../entity/students.entity";
import { Parent } from "../entity/parents.entity";
import AppError from "../utils/appError";
import { createParent } from "../services/parents.service";
import { signTokens } from "../services/auth.service";

const cookiesOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
};

if (process.env.NODE_ENV === "production") cookiesOptions.secure = true;

const accessTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(
    Date.now() + process.env.ACCESS_TOKEN_EXPIRES_IN * 60 * 1000
  ),
  maxAge: process.env.ACCESS_TOKEN_EXPIRES_IN * 60 * 1000,
};

const refreshTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(
    Date.now() + process.env.REFRESH_TOKEN_EXPIRES_IN * 60 * 1000
  ),
  maxAge: process.env.REFRESH_TOKEN_EXPIRES_IN * 60 * 1000,
};

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
      return next(new AppError(400, "Invalid email or password"));
    }

    //
    const { access_token, refresh_token } = await signTokens(user);

    res.cookie("access_token", access_token, accessTokenCookieOptions);
    res.cookie("refresh_token", refresh_token, refreshTokenCookieOptions);
    res.cookie("user_type", userType, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    // 4. Send response
    res.status(200).json({
      status: "success",
      access_token,
    });
  } catch (error: any) {
    next(error);
  }
};
