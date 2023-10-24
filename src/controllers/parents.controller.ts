import { NextFunction, Request, Response } from 'express'
import { Parent } from '../entity/parents.entity'
import { CreateParentInput } from '../schemas/parents.schema'
import { DeepPartial } from 'typeorm'
import { AppDataSource } from '../data-source'

const parentRepository = AppDataSource.getRepository(Parent)

export const getParents = async (req: Request, res: Response) => {
  const parents = await parentRepository.find()
  res.status(200).json({
    status: 'success',
    parents,
  })
}

export const createParent = async (data: DeepPartial<Parent>) => {
  return parentRepository.save(parentRepository.create(data))
}

export const findParentByEmail = async ({ email }: { email: string }) => {
  return await parentRepository.findOneBy({ email })
}

export const findParentById = async (userId: string) => {
  return await parentRepository.findOneBy({ id: userId })
}

export const findUser = async (query: Object) => {
  return await parentRepository.findOneBy(query)
}

export const deleteParent = async (req: Request, res: Response) => {}
