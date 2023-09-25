const mongoose = require('mongoose');
const Books = require('../models/Books');
const User = require('../models/User');
const bcrypt = require('bcrypt');
exports.addBook = async(req,res)=>{
    const {bookName} = req.body;
    const addedBook = await Books.create({bookName});
    return res.status(200).json({
        success:true,
        message:"Book added successfully",
        addedBook
    })
}

exports.viewBooks = async (req,res)=>{
    const books = await Books.find({});
    return res.status(200).json({
        success:true,
        message:"Fetched all books",
        books
    })
}

exports.updateBook = async(req,res)=>{
    const {bookId,newBookName} = req.body;
    var objectId = new mongoose.Types.ObjectId(bookId);
    const book = await Books.findByIdAndUpdate(objectId,{$set:{bookName:newBookName}},{new:true});
    return res.status(200).json({
        success:true,
        message:"Successfully updated",
        book
    })
}

exports.removeBook = async (req,res)=>{
    const {bookId} = req.body;
    var objectId =new mongoose.Types.ObjectId(bookId);
    const deletedBook = await Books.findByIdAndDelete(objectId);
    return res.status(200).json({
        success:true,
        message:"Successfully deleted"
    })
}

exports.addMember = async (req,res)=>{
    const {userName,password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    const addedMember = await User.create({userName:userName,password:hashedPassword,accountType:"Member"});
    return res.status(200).json({
        success:true,
        message:"Successfully added"
    })
};

exports.updateMember = async (req,res)=>{
    const {userId,userName} = req.body;
    var objectId =new mongoose.Types.ObjectId(userId);
    const updatedMember = await User.findByIdAndUpdate(objectId,{$set:{userName:userName}});
    return res.status(200).json({
        success:true,
        message:"Successfully updated"
    })
};

exports.viewAllMembers = async (req,res)=>{
    const members = await User.find({});
    const filteredMembers = members.filter((element)=>element.accountType === 'Member');
    return res.status(200).json({
        success:true,
        message:"Successfully fetched",
        filteredMembers
    })
}

exports.viewMember = async (req,res)=>{
    const {memberId} = req.body;
    var objectId =new mongoose.Types.ObjectId(memberId);
    const member = await User.findById(objectId);
    return res.status(200).json({
        success:true,
        message:"Successfully fetched",
        member
    })
}

exports.removeMember = async (req,res)=>{
    const {memberId} = req.body;
    var objectId =new mongoose.Types.ObjectId(memberId);
    const member = await User.findByIdAndDelete(memberId);
    return res.status(200).json({
        success:true,
        message:"Successfully deleted",
        member
    })
}
