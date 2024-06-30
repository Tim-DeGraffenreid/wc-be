import { object, string } from "zod";

export const classSchema = object({
  body: object({
    name: string({ required_error: "Class name is required" }),
  }),
});

const params = {
  params: object({
    id: string(),
  }),
};

export const getClassSchema = object({
  ...params,
});

export const updateClassSchema = object({
  ...params,
  body: object({
    name: string({ required_error: "Class name is required" }),
  }),
});

export const deleteClassSchema = object({
  ...params,
});
