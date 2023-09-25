const express = require('express');
const router = express.Router();

const {auth,isLibrarian} = require('../middlewares/auth');
const {addBook,viewBooks,updateBook,removeBook,addMember,updateMember,viewAllMembers,viewMember,removeMember} = require('../controllers/booksCrud');

router.post("/addBook",auth,isLibrarian,addBook);
router.post("/updateBook",auth,isLibrarian,updateBook);
router.post("/removeBook",auth,isLibrarian,removeBook);
router.post("/addMember",auth,isLibrarian,addMember);
router.post("/updateMember",auth,isLibrarian,updateMember);
router.get("/viewAllMembers",auth,isLibrarian,viewAllMembers);
router.post("/viewMember",auth,isLibrarian,viewMember);
router.delete("/removeMember",auth,isLibrarian,removeMember);
router.get("/viewBooks",auth,isLibrarian,viewBooks);
module.exports = router;