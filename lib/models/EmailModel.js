import mongoose from "mongoose";

const schema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now()
    }
});
const emailModel = mongoose.models.Email || mongoose.model("Email",schema);
export default emailModel