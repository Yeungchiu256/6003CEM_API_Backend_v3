import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";

const app: Koa = new Koa();
const router: Router = new Router();

router.get('api/v1', async(ctx: RouterContext, next: any)=>{
  ctx.body = {message: "Welcome to the blog API!"};
  await next();
});  //v1, new version update to v2 etc

app.use(logger());
app.use(json());
app.use(router.routes());
app.listen(10888);


