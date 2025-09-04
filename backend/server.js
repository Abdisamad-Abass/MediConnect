const express = require("express");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");

const app = express();

connectDB();

const port = process.env.PORT || 1000;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoute"));

app.get('/',(req,res)=>{
    res.send('API WORKING')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
