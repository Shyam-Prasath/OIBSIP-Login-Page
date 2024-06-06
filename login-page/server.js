const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const users = require("./model/user");
const bcrypt = require('bcryptjs');
const app = express();
const jwt=require("jsonwebtoken")

const mongoURI = 'mongoURI';
const jwt_token = 'your_jwt_token'

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

app.use('/', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());

app.post("/change-password", async (req, res) => {
    const { email, newpassword: plainTextPassword } = req.body;

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Password must be a string' });
    }

    if (plainTextPassword.length < 8) {
        return res.json({ status: 'error', error: 'Password must be at least 8 characters long' });
    }

    try {
        const proof = await users.findOne({email})
        const _id = proof.id;

        const password = await bcrypt.hash(plainTextPassword, 10);

        await users.updateOne({ _id }, {
            $set: { password }
        });

        res.json({ status: 'ok' });
        
    } catch (error) {
        console.error('Error updating password', error);
        return res.json({ status: 'error', error: 'Error updating password' });
    }
});

app.post("/login",async (req,res)=>{
    const {email,password}=req.body

    const userdetail= await users.findOne({email}).lean()

    if(!userdetail){
        return res.json({status:'error',error:'Incorrect Information/detail'})
    }

    if(await bcrypt.compare(password,userdetail.password)){
        const token=jwt.sign({id:userdetail._id,email:userdetail.email},jwt_token)
        return res.json({status:'ok',data:{name:userdetail.name}})
    }

    return res.json({status:'error',error:'Incorrect Information/detail'})

})

app.post("/register", async (req, res) => {
    console.log(req.body);
    const { name,email, password: plainTextPassword} = req.body;

    if(!plainTextPassword  || typeof plainTextPassword!=='string'){
        return req.json({status:'error',error:'password must be string'})
    }

    if(plainTextPassword.length<8){
        return res.json({status:'error',error:'password length must be greater than 8'})
    }

    const password = await bcrypt.hash(plainTextPassword, 10);
    console.log(password);

    try {
        const userDetail = await users.create({
            name,
            email,
            password
        });
        console.log("User Created: ", userDetail);
        return res.json({ status: 'ok' ,data :'sucess'});
    } 
    catch (error) {
        if (error.code === 11000) {
            res.json({ status: 'error', error: 'Email already in use' });
        }
        console.log('Error creating user', error.message);
        return res.json({ status: 'error', error: 'Error creating user' });
    }
});

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000/");
});
