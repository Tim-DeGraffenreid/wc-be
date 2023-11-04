import { DeepPartial } from "typeorm";
import AppDataSource from "../data-source";
import { Student } from "../entity/students.entity";
import { Classes } from "../entity/class.entity";
import { Knowledge } from "../entity/knowledge.entity";

const studentRepository = AppDataSource.getRepository(Student);
const knowledgeRepository = AppDataSource.getRepository(Knowledge);

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

export const addToClass = async (
  student: Student,
  classes: DeepPartial<Classes>
) => {
  const knowledge = await knowledgeRepository.save(
    knowledgeRepository.create({
      student,
      class: classes,
    })
  );

  student.knowledge.push(knowledge);

  await studentRepository.save(student);
};
