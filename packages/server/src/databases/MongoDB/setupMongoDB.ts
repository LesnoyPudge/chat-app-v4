import { env } from '@constants';
import mongoose from 'mongoose';



export const setupMongoDB = async () => {
    mongoose.set('strictQuery', true);
    await mongoose.connect(env._DB_CONNECTION_URL);
};