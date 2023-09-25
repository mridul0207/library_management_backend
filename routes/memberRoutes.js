const express = require('express');
const router = express.Router();

const {auth,isMember} = require('../middlewares/auth');
const {viewBooks,showBooksWithUser,borrowBook,returnBook,deleteAccount} = require('../controllers/member');

router.get("/viewBooks",auth,isMember,viewBooks);
router.get("booksWithUser",auth,isMember,showBooksWithUser);
router.post("/borrowBook",auth,isMember,borrowBook);
router.post("/returnBook",auth,isMember,returnBook);
router.delete("/deleteAccount",auth,isMember,deleteAccount);

module.exports = router;