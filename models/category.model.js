import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
  {
    range: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
