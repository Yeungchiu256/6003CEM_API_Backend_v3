import { Validator, ValidationError } from 'jsonschema';
import { RouterContext } from 'koa-router';
import { catschema } from '../schemas/cat.schema';
const v = new Validator()
export const catvalidation = async (ctx: RouterContext, next: any) => {
  const validationOptions = {
    throwError: true,
    allowUnknownAttributes: false
  }
  const body = ctx.request.body;
  try {
    v.validate(body, catschema, validationOptions)
    await next()
  } catch (error) {
    if (error instanceof ValidationError) {
      ctx.body = error;
      ctx.status = 400;
    } else {
      throw error;
    }
  }
}