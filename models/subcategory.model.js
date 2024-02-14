import mongoose from "mongoose";
const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;
