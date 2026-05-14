//here we will readfile of db.json and sendback the data to controlleler

import path from "path";
import fs from "fs";

const filePath = path.join(process.cwd(), "./src/dataBase/db.json"); //joining files to have acces of the file we want to get access
export const fileRead = () => {
  const products = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(products); //parsing because in controller we will stringify the data
};
export const insertProduct = (payLoad : any) => {
  fs.writeFileSync(filePath,JSON.stringify(payLoad));
};
