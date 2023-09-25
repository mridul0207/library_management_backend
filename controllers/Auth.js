const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async(req,res)=>{
    const {accountType,userName,password,confirmPassword} = req.body;
    console.log(req.body);
    if(!userName || !accountType || !password || !confirmPassword){
        return res.status(401).json({
            success:false,
            message:"All fields are required"
        })
    }

    if(password !== confirmPassword)
    {
        return res.status(403).json({
            success:false,
            message:"Password and Confirm Password don't match"
        })
    }

    const existingUser = await User.findOne({userName:userName});
    if(existingUser)
    {
        return res.status(403).json({
            success:false,
            message:"User is already registered"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await User.create({userName,password:hashedPassword,accountType,books:[]});
    return res.status(200).json({
        success:true,
        message:"User Successfully created",
        newUser
    })
}

exports.login = async(req,res)=>{
    const {userName,password} = req.body;
    if(!userName || !password)
    {
        return res.status(401).json({
        success:false,
        message:"All fields are required"
       })
    }

    const user = await User.findOne({userName:userName});
    if (!user) {
        // Return 401 Unauthorized status code with error message
        return res.status(401).json({
          success: false,
          message: `User is not Registered with Us Please SignUp to Continue`,
        })
    }

    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { userName: user.userName, _id: user._id, accountType: user.accountType },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        )
  
        // Save token to user document in database
        user.token = token
        user.password = undefined
        // Set cookie for token and return success response
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        }
        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: `User Login Success`,
        })
    }else {
        return res.status(401).json({
          success: false,
          message: `Password is incorrect`,
        })
    }
}