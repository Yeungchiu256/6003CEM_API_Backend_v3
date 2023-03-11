//npm i koa-passport @types/koa-passport passport-http @types/passport-http

import * as db from '../helpers/database';

//export const findByUsername = async (username: string) => {
export const findByUsername = async (username) => {
  const query = 'SELECT * from users where username = ?';
  //console.log(`SELECT * from users where username = ${username}`);
  let user_array=[username];
  const user = await db.run_query(query, user_array);
  return user;
}
