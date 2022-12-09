import * as bcrypt from 'bcrypt';

export const generateHashedPassword = async (
  password: string,
): Promise<string> => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePasswords = (
  enteredPassword: string,
  passwordInDatabase: string,
) => bcrypt.compare(enteredPassword, passwordInDatabase);
