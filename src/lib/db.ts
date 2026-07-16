
import { connect } from "mongoose"   

let mongodburl = process.env.MONGODB_URL  


if(!mongodburl){
    throw new Error("mongodb url is not found ")    
}

let cached = global.mongoose  

if(!cached){
    cached=global.mongoose={conn:null,promise:null}
}


const connectDb=async ()=>{
    if(cached.conn){
        return cached.conn                   
    }
    if(!cached.promise){
       cached.promise = connect(mongodburl).then((c)=>c.connection)
    }
    try {
        cached.conn=await cached.promise
    } catch (error) {
        throw error
    }
return cached.conn
}

export default connectDb
