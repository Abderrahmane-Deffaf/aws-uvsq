const knex = require("../db/db-init");

const bycrypt = require("bcrypt");

function signInHandler(req, res) {
  res.render("signin.html");
}

async function signInPostHandler(req, res) {
  console.log(req.body);
  const { login, password, name, color1, color2 } = req.body;
  try {
    const haschedPassword = await bycrypt.hash(password, 10);
    await knex("users").insert({ login, password:haschedPassword, name, color1, color2 });
    req.session.login = login;
    res.redirect("/users-list");
  } catch (error) {
    console.error(error);
    res.render("signin.html", { error: "Error creating user. Please try again." });
  }
}

module.exports = { signInHandler, signInPostHandler };
