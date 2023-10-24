import bcrypt from "bcrypt";

// ? Validate password
export const comparePassword = async (
  candidatePassword: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};
