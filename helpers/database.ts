import { Sequelize, QueryTypes } from 'sequelize';
import { config } from '../config';
// define an async utility function to get a connection // run an SQL query then end the connection

export const run_insert = async function run_insert(sql: string, values: any) {
  try {
    const sequelize =
      new Sequelize(`postgres://${ config.user}:${config.password}@${config.host}:${config.port}/${config.database}`);
    await sequelize.authenticate();
    let data = await sequelize.query(sql, {
      replacements: values,
      type: QueryTypes.INSERT
    });
    await sequelize.close();
    return data;
  } catch (err: any) {
    console.error(err, query, values);
    throw 'Insert Data error';
  }
}


//run_query setup database session to run and await the response of select query
export const run_query = async (query: string, values: any) => {
  try {
    const sequelize =
      new Sequelize(`postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`);
    await sequelize.authenticate();
    let data = await sequelize.query(query, {
      replacements: values,  //values is array
      type: QueryTypes.SELECT
    });
    await sequelize.close();
    return data;
  } catch (err: any) {
    console.error(err, query, values);
    throw 'Database query error';
  }
}

export const run_update = async function run_update(sql: string, values: any) {
  try {
    const sequelize =
      new Sequelize(`postgres://${ config.user}:${config.password}@${config.host}:${config.port}/${config.database}`);
    await sequelize.authenticate();
    let data = await sequelize.query(sql, {
      replacements: values,
      type: QueryTypes.UPDATE
    });
    await sequelize.close();
    return data;
  } catch (err: any) {
    console.error(err, query, values);
    throw 'Update Data error';
  }
}