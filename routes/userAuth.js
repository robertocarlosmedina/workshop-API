const express = require("express");
const router = express.Router();
router.use(express.json());

const Workshop = require("../db/workshop");
const Validation = require("../src/validations");
const buffer = require("buffer/").Buffer;

router.get("/", express.json(), async (req, res) => {
  const users = await Workshop.getCoordinators();

  if (!users) return res.sendStatus(500); // internal error
  return res.json(
    users.map((user) => ({
      id: user.id,
      username: user.username,
      full_name: user.full_name,
      email: user.email,
      password: user.hash_password,
    }))
  );
});

router.post("/create", express.json(), async (req, res) => {
  const { name, email, password } = req.body;
  const all_users = await Workshop.getCoordinators();
  const userAlredyExit = Validation.checkIfUserAlreadyExists(
    name,
    email,
    all_users
  );

  if (userAlredyExit || name === "" || email === "") {
    return res.sendStatus(401);
  }

  const new_user = await Workshop.postCoordinators(
    name,
    email,
    buffer.from(password).toString("base64")
  );
  const updated_all_users = await Workshop.getCoordinators();

  const last_user = updated_all_users[updated_all_users.length - 1];

  if (!new_user) return res.sendStatus(500);

  return res.json(last_user);
});

router.post("/auth", express.json(), async (req, res) => {
  const { email_or_username, password } = req.body;
  const all_users = await Workshop.getCoordinators();

  if (!all_users) return res.sendStatus(500);

  const authenticated_user = all_users.filter((user) => {
    return (
      (user.username === email_or_username ||
        user.email === email_or_username) &&
      password === buffer.from(user.hash_password, "base64").toString("ascii")
    );
  });

  if (authenticated_user.length > 0) {
    return res.json(authenticated_user[0]);
  }
  return res.sendStatus(401);
});

router.put("/edit", express.json(), async (req, res) => {
  const { id, password } = req.body;
  const edited_user = await Workshop.editCoordinator(
    id,
    buffer.from(password).toString("base64")
  );
  const user_data = await Workshop.getCoordinators(id);

  if (!edited_user) return res.sendStatus(500);
  if (!user_data) return res.sendStatus(500);

  return res.json(user_data[0]);
});

router.post("/delete", express.json(), async (req, res) => {
  const { id } = req.body;
  const deletedClass = await Workshop.deleteCoordinator(id);

  console.log(deletedClass);

  if (!deletedClass) return res.sendStatus(401);
  return res.sendStatus(200);
});

module.exports = router;
