import mongoose from "mongoose";


const PropertySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    location:{
        type: String,
        require: true
    },
    beds:{
        type: Number,
        require: true
    },
    bathroom:{
        type: Number,
        require: true
    }
    ,
    area:{
        type: String,
        require: true
    }
    ,
    price:{
        type: Number,
        require: true
    }
    ,
    type:{
        type: Number,
        require: true
    }
    ,
    photo:{
        type: String,
        require: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    unavailableDates:{
        type:[Date]
    }

})

export default mongoose.model("Property",PropertySchema);