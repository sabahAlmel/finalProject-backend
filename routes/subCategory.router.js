import express from "express";
import {
  getAll,
  getOne,
  createSubCateg,
  deleteSubCateg,
  updateSubCateg,
} from "../controllers/subcategory.controller.js";

export const subCategoryRouter = express.Router();

subCategoryRouter.get("/getone/:id", getOne);
subCategoryRouter.get("/getall", getAll);

subCategoryRouter.put("/update/:id", updateSubCateg);

subCategoryRouter.post("/create", createSubCateg);

subCategoryRouter.delete("/delete/:id", deleteSubCateg);
