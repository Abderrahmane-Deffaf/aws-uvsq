const knex = require("../db/db-init");

const bycrypt = require("bcrypt");
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function signInHandler(req, res) {
  res.render("signin.html");
}

async function signInPostHandler(req, res) {
  console.log(req.body);
  const { login, password, name, color1, color2 } = req.body;
  const loginValue = typeof login === "string" ? login.trim() : "";

  if (!EMAIL_PATTERN.test(loginValue)) {
    return res.render("signin.html", {
      error: "Enter a valid email address.",
      form: { login: loginValue, name, color1, color2 },
    });
  }

  try {
    const haschedPassword = await bycrypt.hash(password, 10);
    await knex("users").insert({ login: loginValue, password:haschedPassword, name, color1, color2 });
    req.session.login = loginValue;
    res.redirect("/users-list");
  } catch (error) {
    console.error(error);
    res.render("signin.html", {
      error: "Error creating user. Please try again.",
      form: { login: loginValue, name, color1, color2 },
    });
  }
}

module.exports = { signInHandler, signInPostHandler };
