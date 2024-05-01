const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Products = require("../../models/productModel");

dotenv.config({ path: "backend/config/config.env" });

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log("Data Base Connect Successfully");
  });

//   Read File Sync Way
const productData = JSON.parse(
  fs.readFileSync(`${__dirname}/data.json`, "utf-8")
);

const importData = async () => {
  try {
    await Products.create(productData);
    console.log("Data Successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Products.deleteMany();
    console.log("Data Successfully delete");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

console.log(process.argv);

if (process.argv[2] === "--import") {
  importData();
}

if (process.argv[2] === "--delete") {
  deleteData();
}
