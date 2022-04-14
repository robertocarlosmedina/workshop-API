const AuxiliarFunctions = require("../src/auxiliarFunction");
const Workshop = require("../db/workshop");

class Validation {
  /**
   * Arrow Function that filter all routes and retunr the route name
   *  @param username
   *  @param user_email
   * 	@param all_users
   *  @return The route name
   * */
  static checkIfUserAlreadyExists(username, user_email, all_users) {
    const related_user = all_users.filter((user) => {
      return user.username === username || user.email === user_email;
    });
    return related_user.length > 0;
  }

  /**
   *
   * @param {*} user_email
   * @param {*} all_users
   * @returns
   */
  static checkIfRegisteAlreadyExists(user_email, all_users) {
    const related_user = all_users.filter((user) => {
      return user.email === user_email;
    });
    return related_user.length > 0;
  }

  /**
   *
   * @param {*} all_users
   * @param {*} user_personal_code
   * @returns
   * Authenticate the user if the personal code match
   */
  static authenticateUserPersonalCode = async (user_personal_code) => {
    const allRegistredUserCodes =
      await AuxiliarFunctions.getRegisteredUsersCodes();
    if (allRegistredUserCodes.includes(user_personal_code)) return true;
    return false;
  };

  /**
   * 
   * @param {*} userID 
   * @returns 
   */
  static eraseTokenAccess = async (userID) => {
    const response = await Workshop.addCoordinatorAccessToken(userID, "");
    return response;
  };

  /**
   *
   * @param {*} all_teams
   * @param {*} id_team_member
   * @returns
   * Check if the team member is in another team
   */
  static checkTeamMemberAvailability(all_teams, id_team_member) {
    for (let i = 0; i < all_teams.length; i++) {
      if (
        all_teams[i].id_first_member === id_team_member ||
        all_teams[i].id_second_member === id_team_member
      ) {
        return false;
      }
    }
    return true;
  }

  static teamIsInvalid(all_teams, new_team) {
    if (
      new_team.team_name === null ||
      new_team.id_first_member == false ||
      new_team.id_first_member === new_team.id_second_member
    ) {
      return true;
    }

    if (!all_teams) {
      return false;
    }

    for (let i = 0; i < all_teams.length; i++) {
      if (
        all_teams[i].team_name === new_team.team_name ||
        all_teams[i].id_first_member === new_team.id_first_member ||
        all_teams[i].id_second_member === new_team.id_first_member
      ) {
        return true;
      }
    }
    return false;
  }

  static gradeIsInvalid(all_grades, grade) {
    if (
      grade.code_readability_grade > 10 ||
      grade.code_readability_grade < 0 ||
      grade.algorithm_efficiency_grade > 10 ||
      grade.algorithm_efficiency_grade < 0 ||
      grade.completed_tasks_grade > 10 ||
      grade.completed_tasks_grade < 0 ||
      grade.creativity_grade > 10 ||
      grade.creativity_grade < 0 ||
      grade.result_analisys_grade > 10 ||
      grade.result_analisys_grade < 0
    ) {
      return true;
    }

    for (let i = 0; i < all_grades.length; i++) {
      if (
        all_grades[i].id_team === grade.id_team &&
        all_grades[i].id_coordenator === grade.id_coordenator
      ) {
        return true;
      }
    }

    return false;
  }
}

module.exports = Validation;
