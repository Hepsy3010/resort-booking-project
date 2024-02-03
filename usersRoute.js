const express = require("express");
const router = express.Router();
const User = require('../Models/user');


router.post("/register",async(req,res)=>{
    const newuser=new User({name:req.body.name,email:req.body.email,password:req.body.password})
    try {
        const user=await newuser.save()
        res.send("User Registered Successfully")
    } catch (error) {
        return res.status(400).json({error});
        
    }

});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password }); // Find user by email and password
        if (user) {
            const userData = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id,
            };
            res.send(userData); // Send user data if login successful
        } else {
            return res.status(400).json({ message: 'Login failed' });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error });
    }
});


module.exports=router