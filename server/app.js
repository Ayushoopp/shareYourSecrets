const dotenv = require("dotenv").config()
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());


mongoose.connect(process.env.URI).then((e)=>{
    console.log(`Database is Connected to ${e.connection.host}`)
})
// Define the schema for the User model
const userSchema = new mongoose.Schema({
  name:String,
  secret:String,
  // Other fields of the User model can be defined here
});

// Register the User schema as a model
mongoose.model("User", userSchema);

// Now you can use the User model in your code
const User = mongoose.model("User");
app.get("/", async (req, res) => {
    try {
      const users = await User.find();
   
     
      res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch users",
      });
    }
  });
  

app.post("/post", async (req,res)=>{
    const { name, secret } = req.body;

    const user = new User({
      name,
      secret,
    });
  
    await user.save();
  
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
    });
})


app.listen(process.env.PORT,(req,res)=>{
    console.log(`Server on port ${process.env.PORT}`)
})