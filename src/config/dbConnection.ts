import mongoose from 'mongoose';
import config from './config';
import Logging from '../library/Logging';

const dbConnection = async () => {
    await mongoose
        .connect(config.mongo.url)
        .then(() => {
            Logging.info('Connected to Database....');
        })
        .catch((error) => {
            console.error('Unable to Connect');
            console.error(error);
            process.exit(1);
        });
};

export default dbConnection;
