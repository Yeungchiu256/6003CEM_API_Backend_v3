//npm i koa koa-bodyparser koa-json koa-logger koa-router @types/koa @types/koa-bodyparser @types/koa-json @types/koa-logger @types/koa-router
//  npm install @koa/cors

import Koa from "koa";  //koa
//import Router, { RouterContext } from "koa-router";
import logger from "koa-logger";  //log of koa
import passport from 'koa-passport';  //log-in passport of koa
import cors from '@koa/cors';  
import json from "koa-json";  //body parsing middleware
//import { router as articles } from "./routes/articles";
import { router as user } from './routes/special';

import serve from 'koa-static-folder';  //npm i koa-static-folder 

const app: Koa = new Koa();
/*const router: Router = new Router();

const welcomeAPI = async (ctx: RouterContext, next: any) => {
  ctx.body = { message: "Welcome to the blog API!" };
  await next();
}
*/
//router.get('/api/v1', welcomeAPI);  //v1, new version update to v2 etc

//prevent cors
app.use(cors());

app.use(serve('./docs'));
app.use(logger());
app.use(json());
//app.use(router.routes());
app.use(passport.initialize());
app.use(articles.routes());
/*app.use(async (ctx: RouterContext, next: any) => {
  try {
    await next();
    if (ctx.status === 404) {
      ctx.status = 404;
      ctx.body = { err: "Resource not found" };
    }
  } catch (err: any) {
    ctx.body = { err: err }
  }
});*/
app.use(user.routes());
app.listen(10888);


