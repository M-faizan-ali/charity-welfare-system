import mongoose,{Schema} from "mongoose";

const donationType = new Schema({
    purposeOfDonation:{
        type:text,
        required:true
    }
},
{
    timestamps:true 
}

)

export const DonationType = mongoose.model("DonationType", donationType)