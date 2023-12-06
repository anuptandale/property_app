import express from "express";
import { login, signup ,getAllProperties} from "../controller/auth.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";
import {addProperty, deleteProperty, getCities, getPropertyByCity, myProperty, updateProperty} from "../controller/property.js"
import Property from "../models/Property.js";

const router = express.Router();

//add
router.post("/property", verifyUser, addProperty)

//getall
router.get("/list-properties",getAllProperties);

//delete
router.delete("/property/:id", verifyUser, deleteProperty);

//update
router.put("/property/:id",verifyUser, updateProperty);

//list my property
router.get("/property",verifyUser, myProperty);

//fetch all city
router.get("/cities", getCities);

//get property by city
router.get("/citywiseproperty", getPropertyByCity);

router.post("/login",login);
router.post("/signup",signup);
// router.get("/check",verifyToken,(req,res,next)=>{
//     console.log("hello")
//     res.send("you are authenticate");
// })

export default router;