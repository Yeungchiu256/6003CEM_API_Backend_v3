import Koa from "koa";
import json from "koa-json";
import passport from 'koa-passport';
import { router } from '../routes/articles';
import request from 'supertest';

const app: Koa = new Koa();

app.use(json());
app.use(passport.initialize());
app.use(router.middleware());

//app.listen(10888);
app.listen(3000);

describe('Get / - endpoint of getAll', ()=> {
  test('Get all article', async ()=>{
    const result = await
request(app.callback()).get('/api/v1/articles');
    expect(result.statusCode).toEqual(200);
  })
})

/*describe('Post / - endpoint of getById', ()=> {
  test('Post an article', async ()=>{
    const result =
await request(app.callback()).post('/api/v1/articles')
      .header({key: value})
      .send({json: body});
    expect(result.statusCode).toEqual(201);
}) })

describe('Put / - endpoint of createArticle', ()=> {
  test('Put an article', async ()=>{
    const result =
await request(app.callback()).put('/api/v1/articles/1')
      .header({key: value})
      .send({json: body});
    expect(result.statusCode).toEqual(201);
}) })*/