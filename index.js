const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const librarianRouter = require('./routes/librarianRoutes');
const memberRouter = require('./routes/memberRoutes');
const axios=require('axios');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/auth",authRouter);
app.use("/librarian",librarianRouter);
app.use("/member",memberRouter);
app.use(cors({
    origin:"https://localhost:3000",
    credentials:true
}))
const db = require('./config/dbConnect');
const { auth, isLibrarian, isMember } = require('./middlewares/auth');
db.connect();
app.get("/",(req,res)=>{
    res.sendFile(__dirname + '/Signup.html');
})

app.get("/login",(req,res)=>{
    res.sendFile(__dirname + '/Login.html');
})
// const options = {method: 'GET'};
app.get("/main",auth,isMember,async (req,res)=>{
    try {
        const response = await axios.get('http://localhost:4000/member/viewBooks')
        console.log(response)
    // .then(response => response.json())
    // .then(response => console.log(response))
    // .catch(err => console.error(err));
    // // const data = await response.json();
    // // console.log(data);
    res.send("Ok");
    } catch (error) {
        console.log(error);
    }
    
    
})
app.listen(4000,()=>{
    console.log("Server running at port 4000");
})