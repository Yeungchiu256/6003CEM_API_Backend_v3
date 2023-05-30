//  npm install @koa/multer multer
//  https://medium.com/@bviveksingh96/uploading-images-files-with-multer-in-node-js-f942e9319600

import Router, { RouterContext } from "koa-router";
import multer from '@koa/multer';
import { config } from '../api';
//import path from 'path';


//upload path!!!!
const router = new Router();

//diskstorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './catimage/');
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname)
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
    if(file.mimetype ==="image/jpg"  || 
       file.mimetype ==="image/jpeg"  || 
       file.mimetype ==="image/png"){
     
    cb(null, true);
      
    }else{
      cb(new Error("Please upload jpg or png"),false);
    }
}

const upload = multer({storage: storage, fileFilter : fileFilter});

// add a route for uploading single files
router.post(
  '/api/v1/upload',
  upload.single('avatar'),
  ctx => {
    console.log('ctx.request.file', ctx.request.file);
    console.log('ctx.file', ctx.file);
    console.log('ctx.request.body', ctx.request.body);
//    ctx.body = 'done';
    ctx.body = `${config.url}\\${ctx.file.originalname}`;
  }
);




export { router };