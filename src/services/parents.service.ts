import { DeepPartial } from "typeorm";
import AppDataSource from "../data-source";
import { Parent } from "../entity/parents.entity";
import { Student } from "../entity/students.entity";

const parentRepository = AppDataSource.getRepository(Parent);
const studentRepository = AppDataSource.getRepository(Student);

export const getParents = async () => {
  return await parentRepository.find();
};

export const createParent = async (data: DeepPartial<Parent>) => {
  return parentRepository.save(parentRepository.create(data));
};

export const findParentByEmail = async ({ email }: { email: string }) => {
  return await parentRepository.findOneBy({ email });
};

export const findParentById = async (userId: string) => {
  return await parentRepository.findOneBy({ id: userId });
};

export const createNewStudent = async (
  student: DeepPartial<Student>,
  parent: DeepPartial<Parent>
) => {
  const createdStudent = await studentRepository.save(
    studentRepository.create({ ...student, parent })
  );
  return createdStudent;
};

export const getStudents = async (id: string) => {
  return await studentRepository.findBy({ parent: { id } });
};
