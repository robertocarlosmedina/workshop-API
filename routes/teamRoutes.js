const express = require("express");
const router = express.Router();
router.use(express.json());

const Workshop = require("../db/workshop");
const Auxiliar = require("../src/auxiliarFunction");
const Validation = require("../src/validations");

router.get("/:accessToken", express.json(), async (req, res) => {
  const teams = await Workshop.getAllTeams();
  const users = await Workshop.getRegisteredUsers();
  const { accessToken } = req.params.accessToken;

  const authAccessToken = users.filter((user) => {
    return user.access_token === accessToken;
  });

  if (!users) return res.sendStatus(500); // internal error

  return res.json(
    teams.map((team) => ({
      id: team.id,
      team_name: team.team_name,
      members: [
        Auxiliar.makeTeamsJsonFormat(users, team.id_first_member),
        Auxiliar.makeTeamsJsonFormat(users, team.id_second_member),
      ],
      gradeInfo: [
        
      ],
      final_grade: team.final_grade,
    }))
  );
});

router.post("/create_team", express.json(), async (req, res) => {
  const { team_name, code_first_member, id_second_member } = req.body;

  const id_first_member = await Auxiliar.getUserIdFromCode(code_first_member);
  const new_team = {
    team_name: team_name,
    id_first_member: id_first_member,
    id_second_member: id_second_member,
  };

  const all_teams = await Workshop.getAllTeams();
  const invalidTeam = Validation.teamIsInvalid(all_teams, new_team); // if invalid should return the error
  // console.log(`invalid Team: ${invalidTeam}`);
  if (invalidTeam)
    return res.json(
      Auxiliar.generatJSONResponseObject(
        401,
        "Invalid team! Team Member not available.",
        null,
        null
      )
    );
  await Workshop.postNewTeam(new_team);
  return res.json(
    Auxiliar.generatJSONResponseObject(
      200,
      null,
      "Team created Successfully.",
      null
    )
  );
});

router.post("/grade_team", express.json(), async (req, res) => {
  const {
    team_name,
    coordinator_name,
    code_readability_grade,
    algorithm_efficiency_grade,
    completed_tasks_grade,
    creativity_grade,
    result_analisys_grade,
  } = req.body;

  const id_team = await Auxiliar.getTeamIdFromName(team_name);
  const id_coordinator = await Auxiliar.getCoordinatorIdFromName(
    coordinator_name
  );
  const new_grade = {
    id_team: id_team,
    id_coordenator: id_coordinator,
    code_readability_grade: code_readability_grade,
    algorithm_efficiency_grade: algorithm_efficiency_grade,
    completed_tasks_grade: completed_tasks_grade,
    creativity_grade: creativity_grade,
    result_analisys_grade: result_analisys_grade,
  };
  const all_grades = await Workshop.getAllGrades();
  if (Validation.gradeIsInvalid(all_grades, new_grade)) {
    return res.sendStatus(500);
  }
  Workshop.postNewGrade(new_grade);
  return res.json(new_grade);
});

module.exports = router;
