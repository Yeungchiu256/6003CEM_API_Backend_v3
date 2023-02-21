import Router, {RouterContext} from "koa-router";
import bodyParser from "koa-bodyparser";

const articles = [
  {title:'hello article', fullText:'some text here to fill the body'},
  {title:'another article', fullText:'again here is some text here to fill'},
  {title:'coventry university ', fullText:'some news about coventry university'},
  {title:'smart campus', fullText:'smart campus is coming to IVE'} ];


const router = new Router({prefix:'/api/v1/articles'});

const getAll = async (ctx: RouterContext, next: any)=>{
  ctx.body = articles;
  await next();
}

//const getAll = async (ctx:RouterContent, next: any)=>{};
const getById = async (ctx: RouterContext, next: any)=>{
  let id = +ctx.params.id
  if ((id < articles.length+1) && (id > 0)) {
    ctx.body = articles[id-1];
  } else {
    ctx.status = 404;
  }
  await next();
}
const createArticle = async (ctx:RouterContext, next: any)=>{
  let {title, fullText} =ctx.request.body;
  let newArticle = {title: title, fullText: fullText};
  articles.push(newArticle);
  ctx.status = 201;
  ctx.body = newArticle;
  await next();
};
const updateArticle = async (ctx:RouterContext, next: any)=>{};
const deleteArticle = async (ctx:RouterContext, next: any)=>{};

router.get('/', getAll);
router.post('/', bodyParser(), createArticle);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', updateArticle);
router.del('/:id([0-9]{1,})', deleteArticle);

export { router };