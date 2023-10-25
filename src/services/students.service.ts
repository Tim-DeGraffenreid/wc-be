import { DeepPartial } from "typeorm";
import AppDataSource from "../data-source";
import { Student } from "../entity/students.entity";

const studentRepository = AppDataSource.getRepository(Student);

export const getStudents = async () => {
  return await studentRepository.find();
};

export const createStudent = async (data: DeepPartial<Student>) => {
  return studentRepository.save(studentRepository.create(data));
};

export const findStudentByEmail = async ({ email }: { email: string }) => {
  return await studentRepository.findOneBy({ email });
};

export const findStudentById = async (userId: string) => {
  return await studentRepository.findOneBy({ id: userId });
};
