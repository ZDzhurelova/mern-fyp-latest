const dotenv = require('dotenv');
dotenv.config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;
connection.on("connected", () => {
  console.log("MongoDB connection is successful");
});

connection.on("error", (error) => {
  console.log("Error in MongoDB connection", error);
});


const express = require('express');
const app = express();
app.use(express.json());

const userRoutes = require("./routes/userRoute");
const adminRoutes = require("./routes/adminRoute")
const contractorsRoutes = require("./routes/contractorsRoute")

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctor", contractorsRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Node Express Server Started at ${port}!`));
