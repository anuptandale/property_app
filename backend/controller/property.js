import Property from "../models/Property.js";
import { verifyUser } from "../utils/verifyToken.js";
import jwt from "jsonwebtoken";
export const addProperty = async (req,res)=>{
    
    
    try{
        var uid;
        verifyUser(req,res,()=>{
            uid=req.user.id;
        })
        const newProperty = new Property({
            ...req.body,
            user:uid
        });
        
        console.log(newProperty)
        const savedProperty = await newProperty.save();
        
        res.status(200).json(savedProperty);
    }catch(err){
        res.status(500).json(err);
    }
}

export const deleteProperty = async(req,res)=>{
    try{
        var uid;
        const token = req.cookies.access_token;
        console.log(token)
        jwt.verify(token, process.env.JWT, (err, user)=>{
            if(err){
                return res.status(403).send("Token is not valid!");
            }
            uid = user.id;
        })
        const propData = await Property.findOne({_id:req.params.id,user:uid});
        console.log(req.params.id, " ",uid)
        console.log(propData);
        console.log(req.params.id," ",uid)
        if(!propData){
            return res.status(500).send("You can not delete data!")
        }else{
            await Property.deleteOne({_id:req.params.id,user:uid});
            return res.status(200).send("property has been deleted");
        }
        
    }catch(err){  
        return res.status(500).send("Internal Server Error");
    }
    
}

export const updateProperty = async (req,res)=>{
    try{
        console.log(req.params.id);
        console.log(req.body);
        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true});
        res.status(200).json(updatedProperty);
    }catch(err){
        return res.status(500).send("Internal Server Error");
    }
}

export const myProperty = async (req, res)=>{
        try{
            var uid;
            const token = req.cookies.access_token;
            jwt.verify(token, process.env.JWT, (err, user)=>{
                if(err){
                    return res.status(403).send("Token is not valid!");
                }
                uid = user.id;
            })
            const myProp = await Property.find({user:uid});
            return res.status(200).json(myProp);
        }catch(err){
            return res.status(500).send("Internal Server Error");
        }
        
}

export const getCities = async (req,res)=>{
    const cityarr=[];
    
    try{
        const prop = await Property.find();
        prop.forEach((data)=>{
            cityarr.push( data.location)
        })
        let unique = cityarr.reduce(function (acc, curr) {
            if (!acc.includes(curr))
                acc.push(curr);
            return acc;
        }, []);
        res.status(200).json(unique);
    }catch(err){
        return res.status(500).send("Internal Server Error");
    }
}

export const getPropertyByCity = async (req,res)=>{
    try{
        const prop = await Property.find({location:req.query.city});
        return res.status(200).json(prop);
    }catch(err){
        return res.status(500).send("Internal Server Error");
    }
}