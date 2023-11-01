import { DeepPartial } from "typeorm";
import AppDataSource from "../data-source";
import { Classes } from "../entity/class.entity";

const classRepository = AppDataSource.getRepository(Classes);

export const getCLasses = async () => {
  return await classRepository.find();
};

export const addClass = async (data: DeepPartial<Classes>) => {
  return await classRepository.save(classRepository.create(data));
};

export const findClassById = async (id: string) => {
  return await classRepository.findOneBy({ id });
};

export const findClassByName = async (name: string) => {
  return await classRepository.findOneBy({ name });
};
