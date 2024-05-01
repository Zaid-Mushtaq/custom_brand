const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
//path of the config file
const app = require("./app");

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Stutting down the server due to uncaughtException Rejection");
  process.exit(1);
});

// Database Connect
mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log("Data Base Connect Successfully");
  });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});

//unhandled Promise Rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Stutting down the server due to unhandled Promise Rejection");
  server.close(() => {
    process.exit();
  });
});
