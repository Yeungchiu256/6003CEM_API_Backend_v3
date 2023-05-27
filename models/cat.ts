import * as db from '../helpers/database';

//get all cat info
export const getAll = async () => {
  let query = 'select * from cat';
  let data = await db.run_query(query, null);
  return data;
}

//filter cat information by ID
export const getID = async (catID: any) => {
  let query = 'select * from cat where catID = ?';  // must add ?
  let values = [catID];
  let data = await db.run_query(query, values);
  return data;
}


//update cat
export const update = async (id: number, cat: any) => {
  let keys = Object.keys(cat);
  let values = Object.values(cat);
  let updates = '';
  for (let i: number = 0; i < values.length; i++) {
    updates += `${keys[i]}=?,`
  }
  updates = updates.slice(0, -1);
  //console.log(parm);
  //console.log('key is ' + key);
  //console.log(updates);
  let sql = `UPDATE cat SET ${updates} WHERE catID = ${id}`;
  console.log(sql);
  try {
    await db.run_update(sql, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
}

//add new cat in table
export const add = async (cat: any) => {
  let keys = Object.keys(cat);
  let values = Object.values(cat);
  let key = keys.join(',');
  let parm = '';
  for(let i: number = 0; i<values.length; i++) { parm += '?,'}
  parm =parm.slice(0,-1);
  let sql = `INSERT INTO cat (${key}) VALUES (${parm})`;
  console.log(sql);
  try{
      await db.run_insert(sql, values);
      return {status: 201};
    } catch(err: any) {
  return err; }
}

