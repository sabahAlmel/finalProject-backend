import mongoose from "mongoose";
import slugify from "slugify";
import mongooseAutoPopulate from "mongoose-autopopulate";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    people: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    nbOfRecommendation: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      default:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fthesavvycouple.com%2Fwp-content%2Fuploads%2F2019%2F10%2FParenting-Blog.jpg&tbnid=SgdNB-0fQZeqiM&vet=12ahUKEwi4jamnmqiEAxVJVaQEHaQyB1oQMygAegQIARBW..i&imgrefurl=https%3A%2F%2Fthesavvycouple.com%2Fparenting-blogs%2F&docid=WFn03oxoHpI_fM&w=1000&h=667&q=image%20for%20parenting%20blog&ved=2ahUKEwi4jamnmqiEAxVJVaQEHaQyB1oQMygAegQIARBW",
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: false,
      autopopulate: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,
      autopopulate: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      autopopulate: true,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

postSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

postSchema.plugin(mongooseAutoPopulate);
const Post = mongoose.model("Post", postSchema);

export default Post;
