//npm i koa koa-bodyparser koa-json koa-logger koa-router @types/koa @types/koa-bodyparser @types/koa-json @types/koa-logger @types/koa-router
//  npm install @koa/cors


import Koa from "koa";  //koa
//import Router, { RouterContext } from "koa-router";
import logger from "koa-logger";  //log of koa
import passport from 'koa-passport';  //log-in passport of koa
import cors from '@koa/cors';  //cors setting
import json from "koa-json";  //body parsing middleware
import serve from 'koa-static-folder';  //npm i koa-static-folder 

//Endpoint including user (log-in), cat (Newcat, Allcat etc.)
import { router as articles } from "./routes/articles";
import { router as cat } from "./routes/cat";
import { router as user } from './routes/special';
import { router as upload } from './routes/upload';


const app: Koa = new Koa();

app.use(cors());  //change the limit of cors
app.use(serve('./docs'));
app.use(logger());
app.use(json());
//app.use(router.routes());
//app.use(passport.initialize());
app.use(articles.routes());
app.use(cat.routes());
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
app.use(serve('./catimage'));
app.use(user.routes());
app.use(upload.routes());
app.use(upload.allowedMethods());
/*app.use(async (ctx, next)=> {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'authorization-text');
  ctx.set('Access-Control-Allow-Methods', 'POST');
  await next();
});*/


app.listen(10890);


