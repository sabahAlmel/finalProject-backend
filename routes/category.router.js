import express from "express";
import {
  getAll,
  getOne,
  createCateg,
  deleteCateg,
  updateCateg,
} from "../controllers/category.controller.js";

export const categoryRouter = express.Router();

categoryRouter.get("/getone/:id", getOne);
categoryRouter.get("/getall", getAll);

categoryRouter.put("/update/:id", updateCateg);

categoryRouter.post("/create", createCateg);

categoryRouter.delete("/delete/:id", deleteCateg);
