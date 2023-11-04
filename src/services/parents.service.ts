import { DeepPartial } from "typeorm";
import AppDataSource from "../data-source";
import { Parent } from "../entity/parents.entity";
import { Student } from "../entity/students.entity";
import { DemographicInfo } from "../entity/demographic.entity";
import { Classes } from "../entity/class.entity";
import { Knowledge } from "../entity/knowledge.entity";

const parentRepository = AppDataSource.getRepository(Parent);
const studentRepository = AppDataSource.getRepository(Student);
const demographicRepository = AppDataSource.getRepository(DemographicInfo);
const knowledgeRepository = AppDataSource.getRepository(Knowledge);

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

export const addDemographic = async (
  id: string,
  data: DeepPartial<DemographicInfo>
) => {
  const parent = await parentRepository.findOneBy({ id });

  if (parent) {
    const demographicInfo = await demographicRepository.save(
      demographicRepository.create(data)
    );
    Object.assign(parent.demographicInfo, demographicInfo);

    return parent.save();
  }
};

export const getParentChild = async (parentId: string, childId: string) => {
  return await studentRepository.findOneBy({
    id: childId,
    parent: { id: parentId },
  });
};

export const addChildToClass = async (
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
