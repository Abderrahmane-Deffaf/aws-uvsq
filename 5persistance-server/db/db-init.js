const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: 'db.sqlite3',
  },
  useNullAsDefault: true,
});

async function createUserTable() {
  try {
    await knex.raw(
      `
        drop table if exists users
      `
    );

    await knex.raw(`
        create table users (
          login text primary key,
          password text not null,
          name varchar(255) , 
          color1 varchar(10) , 
          color2 varchar(10) 
        )
      `)
    console.log(await knex.select('*').from('users'));
  } catch (error) {
    console.error(error);
  } finally {
    await knex.destroy();
  }
}

//createUserTable();

module.exports = knex ;