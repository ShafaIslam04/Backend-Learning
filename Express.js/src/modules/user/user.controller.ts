import type { Request, Response } from "express";
import { useService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  //   console.log(req.body)

  try {
    const result = await useService.createUserIntodb(req.body);
    // console.log(result.rows[0]);

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
const getUser = async (req: Request, res: Response) => {
  try {
    const result = await useService.getUserFromDb();
    res.status(200).json({
      success: true,
      message: "Data Retrived Successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await useService.getSingleUserFromDb(id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found!!",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "User Retrived Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  const { name, is_active, age } = req.body;
  const { id } = req.params;
  try {
    const result = await useService.updateUserFromDb(req.body, id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found!!",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await useService.deleteUserFromDb(id as string);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found!!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const useController = {
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
};
