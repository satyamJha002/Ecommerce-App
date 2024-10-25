const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectionDB = require("./connection/db");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const authRoute = require("./routes/authRoute");
const app = express();

dotenv.config();

connectionDB();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/v1/", categoryRoute);
app.use("/api/v1/", productRoute);
app.use("/api/v1/", authRoute);

app.listen(3000, () => {
  console.log("Server is listening at http://localhost:3000/");
});

/* 
Topic to know about them:
  1. What is express?
  2. CORS-Cross Origin Rresource Sharing.
  3. What is purpose of express.json() we use in node.js ?
  4. Hashing password with the help of bcrypt?
 */
