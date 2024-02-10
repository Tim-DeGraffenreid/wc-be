import { Prisma } from '@prisma/client'
import prisma from '../utils/prisma'
import { hashPassword } from '../utils/password.manager'

export const addAdmin = async (data: Prisma.adminCreateInput) => {
  try {
    data.password = await hashPassword(data.password)
    return await prisma.admin.create({
      data,
    })
  } catch (error) {
    throw error
  }
}

export const updateAdmin = async (id: string, data: Partial<Prisma.adminUpdateInput>) => {
  try {
    if (data.password) {
      data.password = await hashPassword(data.password as string)
    }
    return await prisma.admin.update({ where: { id }, data })
  } catch (error) {
    throw error
  }
}

export const deleteAdmin = async (id: string) => {
  try {
    return await prisma.admin.delete({ where: { id } })
  } catch (error) {}
}

export const checkIfSuperAdmin = async (id: string) => {
  const admin = await prisma.admin.findUnique({
    where: { id },
  })

  return admin?.isAdmin
}

export const findAdminByDetails = (data: any) => {
  const { name, phoneNumber } = data
  return prisma.admin.findFirstOrThrow({ where: { name, phoneNumber } })
}

export const updateAdminPassword = async (id: string, password: string) => {
  
}