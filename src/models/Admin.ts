
import mongoose, { model, models } from "mongoose";

export interface IAdmin{
    _id:mongoose.Types.ObjectId;
    username:string;
    password:string;
    name:string;
    role:string;

}

const adminSchema = new mongoose.Schema<IAdmin>(
    {
        username:{type:String,required:true,unique:true,trim:true},
        password:{type:String,required:true},
        name:{type:String,required:true},
        role:{type:String,default:"admin"},
    },
    {
        timestamps:true,
        collection: "admin",
    }
);
const Admin = models.Admin || model("Admin",adminSchema);
export default Admin;