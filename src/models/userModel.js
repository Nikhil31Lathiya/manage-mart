const prisma = require("./prisma");
const bcrypt = require("bcrypt");

exports.addUser = async (userData) => {
  try {
    return await prisma.user.create({
      data: userData,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to add product");
  }
};

exports.getUserByEmail = async (email) => {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error(`Error fetching user with email ${email}:`, error);
    throw new Error("Failed to fetch user");
  }
};

exports.getAllUsers = async () => {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

exports.passwordHasher = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

exports.passwordCompare = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
