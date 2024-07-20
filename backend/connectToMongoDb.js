import mongoose from 'mongoose';
import dotenv from 'dotenv'


dotenv.config();

const connectToMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
            console.log('DB connection succesful');
        }
        catch (error) {
        console.log('error connecting to mongodb', error.message);
    }
}

export default connectToMongoDb;