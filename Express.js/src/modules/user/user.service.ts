import { pool } from "../../db";
import type { IUser } from "./user.interface";

const createUserIntodb = async (payload: any) => {
  const { name, email, password, age } = payload;
  const result = await pool.query(
    `
    INSERT INTO users(name,email,password,age)
     VALUES ($1,$2,$3,$4)
     RETURNING *
    `,
    [name, email, password, age],
  );
  return result;
};
const getUserFromDb = async () => {
  const result = await pool.query(`
    SELECT * FROM users
    `);
  return result;
};
const getSingleUserFromDb = async (id: string) => {
  const result = await pool.query(
    `
        SELECT * FROM users
         WHERE id=$1`,
    [id],
  );
  return result;
};
const updateUserFromDb = async (payload: IUser, id: string) => {
  const { name, is_active, age } = payload;
  const result = await pool.query(
    `
    UPDATE users SET name=COALESCE($1,name),
    is_active=COALESCE($2,is_active),
    age=COALESCE($3,age)
    WHERE id = $4
    RETURNING *`,
    [name, is_active, age, id],
  );
  return result;
};
const deleteUserFromDb = async (id: string) => {
  const result = await pool.query(
    `
        DELETE FROM users WHERE id=$1`,
    [id],
  );
  return result;
};
export const useService = {
  createUserIntodb,
  getUserFromDb,
  getSingleUserFromDb,
  updateUserFromDb,
  deleteUserFromDb,
};
