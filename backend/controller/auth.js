import Users from "../models/Users.js"
import Property from "../models/Property.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const signup = async (req,res,next)=>{
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new Users({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        await newUser.save()
        res.status(200).send("User has been created");
    }catch(err){
        next(err);
    }
}

export const login = async (req,res,next)=>{
    try{
        const user = await Users.findOne({username:req.body.username});
        if(!user){
            res.status(404).send("user not found");
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect){
            return res.status(400),send("wrong password or username");
        }
        const token = jwt.sign({id: user._id}, process.env.JWT);
        
        const {password,...otherDetails} = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true          //it dont allow client to reach the cookie
        }).status(200).json({...otherDetails});
       
    }catch(err){
        next(err);
    }
}

export const getAllProperties = async (req,res,next)=>{
    const allProperty = await Property.find();
    return res.status(200).json(allProperty);
}
