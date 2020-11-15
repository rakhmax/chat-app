import { Context } from 'koa';

interface IRootControllers {
    sayHello: (ctx: Context) => void
}

class RootControllers implements IRootControllers {
    async sayHello(ctx: Context) {
        ctx.body = { message: 'hello' };
    }
}

export default RootControllers;
