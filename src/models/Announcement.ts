import mongoose, { model, models } from "mongoose";

export interface IAnnouncement {
    _id : mongoose.Types.ObjectId;
    title:string;
    message:string;
    priority:"low"|"medium"|"high";
}

const announcementSchema = new mongoose.Schema<IAnnouncement>(
    {
        title:{type:String,required:true},
        message:{type:String,required:true},
        priority:{type:String,enum:["low","medium","high"],required:true},
    },
    {
        timestamps:true,
    }
);
const Announcement = models.Announcement || model("Announcement",announcementSchema);
export default Announcement;