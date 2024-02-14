import SubCategory from "../models/subcategory.model.js";

export const getAll = async (req, res) => {
  try {
    const allSubCateg = await SubCategory.find();
    if (allSubCateg.length) {
      return res.status(200).json(allSubCateg);
    } else {
      return res.status(300).json({ message: "there is no SubCategory" });
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
    const subCateg = await SubCategory.findById(id);
    if (subCateg) {
      return res.status(200).json(subCateg);
    } else {
      return res.status(404).json({ message: "SubCategory Not Found!" });
    }
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message: message });
  }
};

export const updateSubCateg = async (req, res) => {
  const id = req.params.id;
  const found = await SubCategory.find({ _id: id });
  if (!found) {
    return res.status(404).json("No SubCategory with this Id");
  }
  try {
    const { name } = req.body;

    const subCateg = await SubCategory.findByIdAndUpdate(
      id,
      {
        $set: {
          name: name,
        },
      },
      { new: true }
    );

    return res.status(200).json(subCateg);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message: message });
  }
};

export const deleteSubCateg = async (req, res) => {
  const { id } = req.params;
  try {
    const subCateg = await SubCategory.findByIdAndDelete(id);
    return res.status(200).json(subCateg);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message: message });
  }
};

export const createSubCateg = async (req, res) => {
  const { name } = req.body;
  try {
    const newSubCateg = new SubCategory({
      name,
    });
    await newSubCateg.save();
    return res.status(200).json(newSubCateg);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message: message });
  }
};
