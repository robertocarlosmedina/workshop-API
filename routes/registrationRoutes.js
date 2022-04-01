const express = require("express");
const router = express.Router();
router.use(express.json());

const Workshop = require("../db/workshop");
const Auxiliar = require("../src/auxiliarFunction");
const Validation = require("../src/validations");

router.get("/", express.json(), async (req, res) => {
  const users = await Workshop.getRegisteredUsers();

  if (!users) return res.sendStatus(500); // internal error
  return res.json(
    users.map((user) => ({
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      personal_code: user.personal_code,
      scholar_year: user.scholar_year,
      degree_type: user.degree_type,
      course_name: user.course_name,
      presential: user.presential,
    }))
  );
});

router.post("/auth_participant", express.json(), async (req, res) => {
  const { userPersonalCode } = req.body;
  const validAuth = await Validation.authenticateUserPersonalCode(userPersonalCode)
  if (validAuth) {
    return res.json({
      statusCode: 200,
      errorMessage: null,
      successMessage: "Participant Authenticated with his Personal Code.",
      data: null,
    });
  }
  return res.json({
    statusCode: 401,
    errorMessage: null,
    successMessage: "User doesn't exist",
    data: null,
  });
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
    return res.json({
      statusCode: 401,
      errorMessage: "Email already used by a registred user.",
      successMessage: null,
      data: null,
    });
  }

  const new_user = await Workshop.postNewRegistration(new_registre);
  const updated_all_users = await Workshop.getRegisteredUsers();
  const last_user = updated_all_users[updated_all_users.length - 1];
  if (!new_user) return res.sendStatus(500);

  return res.json({
    statusCode: 200,
    errorMessage: null,
    successMessage: "Registration Successfully Completed.",
    data: { userPersonalCode: last_user.personal_code },
  });
});

module.exports = router;
