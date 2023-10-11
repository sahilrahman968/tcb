import mongoose from 'mongoose';
import handler from '../pages/api/hello';

const connectDb = handler => async (req,res)=>{
    if(mongoose.connections[0].readyState){
        return handler(req,res)
    }

    await mongoose.connect(process.env.MONGODB_URI);
    return handler(req,res);
}

export default connectDb;