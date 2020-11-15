import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import Koa from 'koa';

import database from './database';
import { PORT } from './config';
import router from './router';

const app = new Koa();

app.use(bodyParser());
app.use(cors());
app.use(router.routes());

database()
    .then(() => {
        app.listen(PORT, () => {
            console.clear();
            console.log('\x1b[32m%s\x1b[0m', `Server is running in http://localhost:${PORT}`);
        });
    });

export default app;
