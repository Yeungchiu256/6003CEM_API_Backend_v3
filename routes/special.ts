//router for intial autherication testing
// refer to https://www.jianshu.com/p/2552cdf35e66

import Router, { RouterContext } from 'koa-router';
import { basicAuth } from '../controllers/auth';

const router = new Router({ prefix: '/api/v1' });

router.get('/', async (ctx: RouterContext, next: any) => {
  ctx.body = {
    message: 'Public API return'
  };
  await next;
})

router.get('/private', basicAuth);

export { router };
