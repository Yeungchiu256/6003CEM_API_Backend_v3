import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from '../models/cat';
import { basicAuth } from '../controllers/auth';
import { catvalidation } from '../controllers/catvalidation';

//sample of cat 
/*const cat = [
  { catname: 'Cat01', shelterid: 'HK01' },
  { catname: 'Cat02', shelterid: 'KN01' },
  { catname: 'Cat03', shelterid: 'NT01' },
  { catname: 'Cat04', shelterid: 'NT01' }];
*/

//cat path!!!!
const router = new Router({ prefix: '/api/v1/cat' });

/*const router: Router = new Router();

const welcomeAPI = async (ctx: RouterContext, next: any) => {
  ctx.body = { message: "Welcome to the Cat Shelter API!" };
  await next();
}
*/
//router.get('/api/v1', welcomeAPI);  //v1, new version update to v2 etc

const getAll = async (ctx: RouterContext, next: any) => {
  let cat = await model.getAll();
  if (cat.length) {
    ctx.body = cat;
  } else {
    ctx.body = {}
  }
  await next();
};


const getById = async (ctx: RouterContext, next: any) => {
  //let id = +ctx.params.id;
  //if ((id < cat.length + 1) && (id > 0)) {
  //  ctx.body = cat[id - 1];
  //} else {
  //  ctx.status = 404;
  //}
  //await next();
  let id = ctx.params.id
  let cat = await model.getID(id);
  if (cat.length) {
    ctx.body = cat[0]; // [0] is better
  } else {
    ctx.status = 404
  }
  
  await next;
};

const createCat = async (ctx: RouterContext, next: any) => {
  /*let { catname, shelterid } = ctx.request.body;
  let newCat = { catname: catname, shelterid: shelterid };
  cat.push(newCat);
  ctx.status = 201;
  ctx.body = newCat;*/
  const body = ctx.request.body;
  let result = await model.add(body);
  if (result.status == 201) {
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = { err: "create data failed" };
  }
  await next;
};

/*const updateCat = async (ctx: RouterContext, next: any) => {  //Routercontext is data of html contnts
  let id = +ctx.params.id;  // read the value of ID
  let c: any = ctx.request.body;
  let catname = c.catname; // read the catname
  let shelterid = c.allText; // read the allText
  console.log('id'+id);
  let catname_body = c.catname
  //console.log('catname'+catname);
  //console.log('shelterid'+shelterid);
  console.log('c'+catname_body);
  //let { catname, shelterid } = ctx.request.body;
  if ((id < cat.length + 1) && (id > 0)) {
    cat[id-1].catname = catname;
    cat[id-1].shelterid = shelterid;
    ctx.status = 200;
    ctx.body = cat;
  } else {
    ctx.status = 404;
  }
  await next;
};*/

const updateCat = async (ctx: RouterContext, next: any) => {  //Routercontext is data of html contnts
  let id = +ctx.params.id;
  const body = ctx.request.body; //slipt the json from ctx
  let result = await model.update(id, body);
  if(result.status==201) {
    ctx.status = 201;
    //ctx.body = body;
    ctx.body = {
      message: 'Cat has been updated'
    };
  } else {
    ctx.status = 500;
    ctx.body = {err: "update data failed"};
  }
  await next();
};

const deleteCat = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
  if ((id < cat.length + 1) && (id > 0)) {
    cat.splice(id - 1, 1);
    ctx.status = 200;
    ctx.body = cat;
  } else {
    ctx.status = 404;
  }
  await next;
};

//get method: show all Cat
router.get('/', getAll);

//post method: add new Cat
router.post('/', basicAuth, bodyParser(),catvalidation, createCat);

//get method: show Cat by ID
router.get('/:id([0-9]{1,})', getById);

//put method: update Cat by ID
router.put('/:id([0-9]{1,})', basicAuth, bodyParser(),catvalidation, updateCat);

//del method: delete Cat by ID
router.del('/:id([0-9]{1,})', basicAuth, deleteCat);

export { router };