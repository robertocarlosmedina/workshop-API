const express = require("express");
const router = express.Router();
router.use(express.json());

const Workshop = require("../db/workshop");
const Auxiliar = require("../src/auxiliarFunction");
const Validation = require("../src/validations");

router.get("/:accessToken", express.json(), async (req, res) => {
  const users = await Workshop.getRegisteredUsers();
  const all_users = await Workshop.getCoordinators();
  const accessToken = req.params.accessToken;

  const authAccessToken = all_users.filter((user) => {
    return user.access_token === accessToken;
  });

  if (!authAccessToken.length) {
    return res.json(
      Auxiliar.generatJSONResponseObject(
        200,
        "Fail making user Authentication.",
        null,
        null
      )
    );
  }

  if (!users) return res.sendStatus(500); // internal error
  return res.json(
    Auxiliar.generatJSONResponseObject(
      200,
      null,
      "User Successfully Authenticated",
      users.map((user) => ({
        email: user.email,
        name: user.full_name,
        personalCode: user.personal_code,
        schoolYear: user.scholar_year,
        degree_type: user.degree_type,
        course: user.course_name,
        presential: user.presential,
      }))
    )
  );
});

router.post("/auth_participant", express.json(), async (req, res) => {
  const { userPersonalCode } = req.body;
  const validAuth = await Validation.authenticateUserPersonalCode(
    userPersonalCode
  );
  if (validAuth) {
    return res.json(
      Auxiliar.generatJSONResponseObject(
        200,
        null,
        "Participant Authenticated with his Personal Code.",
        null
      )
    );
  }
  return res.json(
    Auxiliar.generatJSONResponseObject(401, null, "User doesn't exist", null)
  );
});

router.post("/make_registration", express.json(), async (req, res) => {
  const {
    email,
    full_name,
    scholar_year,
    degree_type,
    course_name,
    presential,
  } = req.body;

  const personal_code = await Auxiliar.personalCodeGenerator();

  const new_registre = {
    email: email,
    full_name: full_name,
    personal_code: personal_code,
    scholar_year: scholar_year,
    degree_type: degree_type,
    course_name: course_name,
    presential: presential,
  };

  const all_users = await Workshop.getRegisteredUsers();
  const userAlredyExits = Validation.checkIfRegisteAlreadyExists(
    new_registre.email,
    all_users
  );

  if (userAlredyExits) {
    return res.json(
      Auxiliar.generatJSONResponseObject(
        401,
        "Email already used by a registred user.",
        null,
        null
      )
    );
  }

  const new_user = await Workshop.postNewRegistration(new_registre);
  const updated_all_users = await Workshop.getRegisteredUsers();
  const last_user = updated_all_users[updated_all_users.length - 1];
  if (!new_user) return res.sendStatus(500);

  return res.json(
    Auxiliar.generatJSONResponseObject(
      200,
      null,
      "Registration Successfully Completed.",
      { userPersonalCode: last_user.personal_code }
    )
  );
});

module.exports = router;
