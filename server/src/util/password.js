import bcrypt from "bcrypt";

// generating hashed password by bcrypt
export async function hashPassword(password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

// compere plain text Password and encrypted password from Mongo
export async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}
