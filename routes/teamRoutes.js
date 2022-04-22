const express = require("express");
const router = express.Router();
router.use(express.json());

const Workshop = require("../db/workshop");
const Auxiliar = require("../src/auxiliarFunction");
const Validation = require("../src/validations");

router.get("/allteams/:accessToken", express.json(), async (req, res) => {
  const teams = await Workshop.getAllTeams();
  const users = await Workshop.getRegisteredUsers();
  const allGrades = await Workshop.getAllGrades();
  let coordinatorGrades;
  const { accessToken } = req.params.accessToken;

  const authAccessToken = users.filter((user) => {
    return user.access_token === accessToken;
  });

  if (authAccessToken.length === 0) {
    return res.json(
      Auxiliar.generatJSONResponseObject(
        401,
        "Fail making Authencication",
        null,
        null
      )
    );
  }

  coordinatorGrades = allGrades.filter((grade) => {
    return grade.id_coordinator === authAccessToken.id;
  });

  if (!users)
    return res.json(
      Auxiliar.generatJSONResponseObject(
        500,
        "Action Interropted by an Internal Error",
        null,
        null
      )
    ); // internal error

  return res.json(
    Auxiliar.generatJSONResponseObject(
      200,
      null,
      "User Successfully Authenticated",
      teams.map((team) => ({
        id: team.id,
        name: team.team_name,
        members: [
          Auxiliar.makeTeamsMembersJsonFormat(users, team.id_first_member),
          Auxiliar.makeTeamsMembersJsonFormat(users, team.id_second_member),
        ],
        gradeInfo: Auxiliar.makeTeamsGradeInfoJson(coordinatorGrades, team.id),
        final_grade: team.final_grade,
        teamGraded: Auxiliar.checkIfTeamHadBeenGraded(
          coordinatorGrades,
          team.id
        ),
      }))
    )
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

  console.log(new_team);

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

router.post("/gradeTeam/:accessToken", express.json(), async (req, res) => {
  const users = await Workshop.getRegisteredUsers();
  const { accessToken } = req.params.accessToken;
  const {
    teamID,
    codeReadability,
    algorithmEfficiency,
    completedTasks,
    creactivity,
    resultAnalisys,
  } = req.body;

  const authAccessToken = users.filter((user) => {
    return user.access_token === accessToken;
  });

  if (authAccessToken.length === 0) {
    return res.json(
      Auxiliar.generatJSONResponseObject(
        401,
        "Fail making Authencication",
        null,
        null
      )
    );
  }

  const newGrade = {
    id_team: teamID,
    id_coordenator: authAccessToken[0].id,
    code_readability_grade: codeReadability,
    algorithm_efficiency_grade: algorithmEfficiency,
    completed_tasks_grade: completedTasks,
    creativity_grade: creactivity,
    result_analisys_grade: resultAnalisys,
  };

  const allGrades = await Workshop.getAllGrades();
  if (Validation.gradeIsInvalid(allGrades, newGrade)) {
    return res.json(
      Auxiliar.generatJSONResponseObject(
        500,
        "Action Interropted by an Internal Error",
        null,
        null
      )
    );
  }
  await Workshop.postNewGrade(newGrade);
  return res.json(
    Auxiliar.generatJSONResponseObject(
      200,
      null,
      "Team Graded Successfully",
      null
    )
  );
});

module.exports = router;
