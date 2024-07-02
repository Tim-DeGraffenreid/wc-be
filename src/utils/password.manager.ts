import bcrypt from 'bcrypt'

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 12)
}

// ? Validate password
export const comparePasswords = async (
  candidatePassword: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(candidatePassword, hashedPassword)
}
