import express, { type Request, type Response } from "express";
import config from "./config";
import {  pool } from "./db";

const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express Server",
    author: "Shafa",
  });
});

app.get("/api/user", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
    SELECT * FROM users
    `);
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
});
app.get("/api/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
        SELECT * FROM users
         WHERE id=$1`,
      [id],
    );
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
});
app.post("/api/user", async (req: Request, res: Response) => {
  //   console.log(req.body)
  const { name, email, password, age } = req.body;

  try {
    const result = await pool.query(
      `
    INSERT INTO users(name,email,password,age)
     VALUES ($1,$2,$3,$4)
     RETURNING *
    `,
      [name, email, password, age],
    );
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
});
app.put("/api/user/:id", async (req: Request, res: Response) => {
  const { name, is_active, age } = req.body;
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
    UPDATE users SET name=COALESCE($1,name),
    is_active=COALESCE($2,is_active),
    age=COALESCE($3,age)
    WHERE id = $4
    RETURNING *`,
      [name, is_active, age, id],
    );
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
});
app.delete("/api/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
        DELETE FROM users WHERE id=$1`,
      [id],
    );

    if(result.rowCount===0){
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
});

export default app
