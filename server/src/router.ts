import Router from 'koa-router';
import { Context, DefaultState } from 'koa';

import { RootControllers } from './controllers';

const router = new Router<DefaultState, Context>();

const { sayHello } = new RootControllers();

router.get('/', sayHello);

export default router;
