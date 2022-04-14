const express = require("express");
const router = express.Router();
router.use(express.json());

const Workshop = require("../db/workshop");
const Validation = require("../src/validations");
const Auxiliar = require("../src/auxiliarFunction");

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
    Auxiliar.base64Encoder(password)
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
      password === Auxiliar.base64Decoder(user.hash_password)
    );
  });

  if (authenticated_user.length > 0) {
    const accessToken = Auxiliar.generateAccessToken();
    console.log(authenticated_user[0].id)
    setTimeout(Validation.eraseTokenAccess, 60000*5, authenticated_user[0].id)
    Workshop.addCoordinatorAccessToken(authenticated_user[0].id, accessToken);
    return res.json(
      Auxiliar.generatJSONResponseObject(
        200,
        null,
        "User Authenticated Successfully.",
        {
          username: authenticated_user[0].username,
          fullName: authenticated_user[0].full_name,
          email: authenticated_user[0].email,
          accessToken: accessToken,
        }
      )
    );
  }
  return res.json(
    Auxiliar.generatJSONResponseObject(
      401,
      "Fail making user Authentication.",
      null,
      null
    )
  );
});

router.get(
  "/authAccessToken/:accessToken",
  express.json(),
  async (req, res) => {
    const accessToken = req.params.accessToken;
    const all_users = await Workshop.getCoordinators();

    const authAccessToken = all_users.filter((user) => {
      return user.access_token === accessToken;
    });

    if (authAccessToken.length > 0) {
      return res.json(
        Auxiliar.generatJSONResponseObject(
          200,
          null,
          "User Authenticated with the Access Token",
          {
            username: authAccessToken[0].username,
            fullName: authAccessToken[0].full_name,
          }
        )
      );
    }

    return res.json(
      Auxiliar.generatJSONResponseObject(
        401,
        "Fail making user Authentication.",
        null,
        null
      )
    );
  }
);

router.put("/edit", express.json(), async (req, res) => {
  const { id, password } = req.body;
  const edited_user = await Workshop.editCoordinator(
    id,
    Auxiliar.base64Encoder(password)
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
