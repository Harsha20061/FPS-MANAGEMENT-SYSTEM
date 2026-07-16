import mongoose, { model, models } from "mongoose";

export interface IStock{
    _id : mongoose.Types.ObjectId;
    name:string;
    quantity:number;
    unit:string;
    price:number;
    available:boolean;
    icon:string;
}

const stockSchema = new mongoose.Schema<IStock>(

    {
        name:{type:String,required:true,unique:true,trim:true},
        quantity:{type:Number,required:true},
        unit:{type:String,required:true},
        price:{type:Number,required:true,min:0},
        available:{type:Boolean,default:true},
        icon:{type:String,required:true},

    },
    {
        timestamps:true,
    }
);
const Stock = models.Stock || model("Stock",stockSchema);
export default Stock;