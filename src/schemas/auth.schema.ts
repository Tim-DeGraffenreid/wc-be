import { TypeOf, ZodEnum, object, string } from "zod";

enum UserType {
  PARENT = "parent",
  STUDENT = "student",
}

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: "Email address is required",
    }).email("Invalid email address"),
    password: string({
      required_error: "Password is required",
    }).min(8, "Invalid email or password"),
    userType: string({}),
  }),
});
