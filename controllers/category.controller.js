import Category from "../models/category.model.js";

export const getAll = async (req, res) => {
  try {
    const allCateg = await Category.find();
    if (allCateg.length) {
      return res.status(200).json(allCateg);
    } else {
      return res.status(300).json({ message: "there is no Category" });
    }
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message: message });
  }
};

export const getOne = async (req, res) => {
  const id = req.params.id;
  try {
    const categ = await Category.findById({ _id: id });
    if (categ) {
      return res.status(200).json(categ);
    } else {
      return res.status(404).json({ message: "category Not Found!" });
    }
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message: message });
  }
};

export const updateCateg = async (req, res) => {
  const { id } = req.params;
  const found = await Category.find({ _id: id });
  if (!found) {
    return res.status(404).json("No category with this Id");
  }
  try {
    const { name } = req.body;
    const categ = await Category.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          range: name,
        },
      },
      { new: true }
    );

    return res.status(200).json(categ);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message: message });
  }
};

export const deleteCateg = async (req, res) => {
  const id = req.params.id;
  try {
    const categ = await Category.deleteOne({ _id: id });
    return res.status(200).json(categ);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message: message });
  }
};

export const createCateg = async (req, res) => {
  const { name } = req.body;
  try {
    const newCateg = new Category({
      range: name,
    });
    await newCateg.save();
    return res.status(200).json(newCateg);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message: message });
  }
};
