const User = require('../models/User');
const Books = require('../models/Books');
const { default: mongoose } = require('mongoose');

exports.viewBooks = async (req,res)=>{
    const books = await Books.find({});
    const availableBooks = books.filter((element)=>element.status === 'AVAILABLE');
    return res.status(200).json({
        success:true,
        message:"Fetched all books",
        availableBooks
    })
}

exports.showBooksWithUser = async (req,res)=>{
    const id = req.user._id;
    var objectIdUser = new mongoose.Types.ObjectId(id);
    const books = await User.findById(objectIdUser).populate('books');
    const details = books.books;
    return res.status(200).json({
        success:true,
        message:"Fetched books with user",
        details
    })
}

exports.borrowBook = async (req,res)=>{
    const id = req.user._id;
    const {bookId} = req.body;
    var objectIdUser = new mongoose.Types.ObjectId(id);
    var objectIdBook =new mongoose.Types.ObjectId(bookId);
    const bookDetails = await Books.findById(objectIdBook);
    // console.log(bookDetails);
    const userDetails = await User.findById(objectIdUser);
    var updatedBookDetails;
    var updatedUserDetails;
    if(bookDetails.status === 'AVAILABLE')
    {
        updatedBookDetails = await Books.findByIdAndUpdate(objectIdBook,{$set:{status:"BORROWED"}},{new:true});
        updatedUserDetails = await User.findByIdAndUpdate(objectIdUser,{$push:{books:objectIdBook}},{new:true}); 
    }
    return res.status(200).json({
        success:true,
        message:"Successfully achieved",
        updatedUserDetails,
        updatedBookDetails
    }) 
}

exports.returnBook = async (req,res)=>{
    const id = req.user._id;
    const {bookId} = req.body;
    var objectIdUser =new mongoose.Types.ObjectId(id);
    var objectIdBook =new mongoose.Types.ObjectId(bookId);
    const bookDetails = await Books.findById(objectIdBook);
    var updatedBookDetails;
    var updatedUserDetails;
    if(bookDetails.status === 'BORROWED')
    {
        updatedBookDetails = await Books.findByIdAndUpdate(objectIdBook,{$set:{status:"AVAILABLE"}},{new:true});
        updatedUserDetails = await User.findByIdAndUpdate(objectIdUser,{$pull:{books:objectIdBook}},{new:true}); 
    }
    return res.status(200).json({
        success:true,
        message:"Successfully achieved",
        updatedUserDetails,
        updatedBookDetails
    })
}

exports.deleteAccount = async (req,res)=>{
    const {userId} = req.user._id;
    await User.findByIdAndDelete(userId);
    return res.status(200).json({
        success:true,
        message:"Successfully deleted"
    })
}