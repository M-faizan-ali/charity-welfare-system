import mongoose,{Schema} from "mongoose";

const donorSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    donorImage:{
        type:String,
        required:true
    }
},
{
    timestamps:true 
}

)

export const Donor = mongoose.model("Donor", donorSchema)

