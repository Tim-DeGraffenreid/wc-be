import { DeepPartial } from "typeorm";
import AppDataSource from "../data-source";
import { Parent } from "../entity/parents.entity";

const parentRepository = AppDataSource.getRepository(Parent);

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
