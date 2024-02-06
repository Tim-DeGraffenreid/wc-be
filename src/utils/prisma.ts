import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const createSuperAdmin = async () => {
  try {
    const superAdmin = await prisma.admin.findUnique({
      where: { email: 'adrienne.story@wecodekc.org' },
    })

    if (!superAdmin) {
      const password = await bcrypt.hash('testing', 10)
      await prisma.admin.create({
        data: {
          email: 'adrienne.story@wecodekc.org',
          name: 'Adrienne Story',
          isAdmin: true,
          password,
        },
      })
      console.log('Super admin created')
    } else {
      console.log('Super admin already exists')
    }
  } catch (error) {
    console.log('Error creating super admin', error)
  }
}

prisma
  .$connect()
  .then(() => {
    console.log('Connected to database')
    createSuperAdmin()
  })
  .catch((error) => {
    console.log('Error connecting to database', error)
  })

export default prisma
