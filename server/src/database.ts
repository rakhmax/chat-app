import { connect } from 'mongoose';

import { MONGO_URI } from './config';

const database = async () => {
    try {
        await connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (error) {
        console.error('Unable to connect to database\n');
        console.error(error);
        process.exit(1);
    }
};

export default database;
