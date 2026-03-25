knex = require('../db/db-init');


async function getUsersList() {
  try {
    const users = await knex.select('*').from('users');
    return users;
  } catch (error) {
    console.error(error);
    return  [] ; 
    }
} 

async function usersListHandler(req, res) {
  const user = req.session.login;
  if (!user) {
    return res.redirect("/");
  }
  const users = await getUsersList();
  res.render("users-list.html", { users });
}

module.exports = { getUsersList, usersListHandler } ;