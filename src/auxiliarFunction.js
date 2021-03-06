const Workshop = require("../db/workshop");
const buffer = require("buffer/").Buffer;

class AuxiliarFunction {
  static chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  static code_length = 6;
  static accessTokenLength = 24;
  static gradeMetrics = [
    { name: "Code Readability", percentage: 10 },
    { name: "Algorithm Efficiency", percentage: 20 },
    { name: "Completed Tasks", percentage: 30 },
    { name: "Solution Creactivity", percentage: 10 },
    { name: "Results Analysis", percentage: 30 },
  ];

  /**
   *
   * @param {*} all_user
   * Generate a unique code for a new user
   */
  static personalCodeGenerator = async (all_user_codes = null) => {
    if (!all_user_codes) {
      all_user_codes = await this.getRegisteredUsersCodes();
    }

    let personal_code = "";
    for (let i = 0; i < this.code_length; i++) {
      personal_code += this.chars.charAt(
        Math.floor(Math.random() * this.chars.length)
      );
    }

    if (all_user_codes.includes(personal_code)) {
      //prevents duplicate codes
      return personalCodeGenerator(all_user_codes);
    }
    return personal_code;
  };
  /**
   *
   * @returns accessToken
   */
  static generateAccessToken = () => {
    let accessToken = "";
    for (let i = 0; i < this.accessTokenLength; i++) {
      accessToken += this.chars.charAt(
        Math.floor(Math.random() * this.chars.length)
      );
    }
    return this.base64Encoder(accessToken);
  };

  /**
   *
   * @returns
   */
  static getRegisteredUsersCodes = async () => {
    const all_users = await Workshop.getRegisteredUsers();
    let user_codes = [];
    for (let i = 0; i < all_users.length; i++) {
      user_codes.push(all_users[i].personal_code);
    }
    return user_codes;
  };

  static getUserIdFromCode = async (code) => {
    const all_users = await Workshop.getRegisteredUsers();
    for (let i = 0; i < all_users.length; i++) {
      if (all_users[i].personal_code === code) {
        return all_users[i].id;
      }
    }
    return false; // if id is not found, it means that the user does not exist
  };

  /**
   *
   * @param {*} all_grades    Array of objects from all the grades
   * @param {*} id_team
   * Get the grade of a specific team from it's ID
   */
  static getTeamGrade(all_grades, id_team) {}

  /**
   *
   * @param {*} all_grades
   * @param {*} id_team
   * Filter for all the grades from a specific team
   */
  static filterTeamAllGrades(all_grades, id_team) {}

  static getTeamIdFromName = async (team_name) => {
    const all_teams = await Workshop.getAllTeams();
    for (let i = 0; i < all_teams.length; i++) {
      if (all_teams[i].team_name === team_name) {
        return all_teams[i].id;
      }
    }
  };

  /**
   *
   * @param {*} coordinator_name
   * @returns
   */
  static getCoordinatorIdFromName = async (coordinator_name) => {
    const all_coordinators = await Workshop.getCoordinators();
    for (let i = 0; i < all_coordinators.length; i++) {
      if (all_coordinators[i].username === coordinator_name) {
        return all_coordinators[i].id;
      }
    }
  };

  /**
   *
   * @param {*} statusCode
   * @param {*} errorMessage
   * @param {*} successMessage
   * @param {*} data
   * @returns
   */
  static generatJSONResponseObject = (
    statusCode,
    errorMessage,
    successMessage,
    data
  ) => {
    return {
      statusCode: statusCode,
      errorMessage: errorMessage,
      successMessage: successMessage,
      data: data,
    };
  };

  /**
   * Method to enconde a string
   * @param {*} string
   * @returns
   */
  static base64Encoder = (string) => {
    return buffer.from(string).toString("base64");
  };

  /**
   * Method to decode a string
   * @param {*} string
   * @returns
   */
  static base64Decoder = (string) => {
    return buffer.from(string, "base64").toString("ascii");
  };

  /**
   * Method to return the name and the email of a user
   * according the the userID
   * @param {*} allUsers
   * @param {*} userID
   * @returns
   */
  static makeTeamsMembersJsonFormat = (allUsers, userID) => {
    const user = allUsers.filter((user) => {
      return user.id === userID;
    });
    return { name: user[0].full_name, email: user[0].email };
  };

  /**
   *
   * @param {*} allGrades
   * @param {*} teamID
   * @returns
   */
  static filterTeamByID = (allGrades, teamID) => {
    return allGrades.filter((gradedTeam) => {
      return gradedTeam.id_team === teamID;
    });
  };

  /**
   *
   * @param {*} allGrades
   * @param {*} teamID
   * @returns
   */
  static checkIfTeamHadBeenGraded = (allGrades, teamID) => {
    if (this.filterTeamByID(allGrades, teamID).length === 0) return false;
    else return true;
  };

  /**
   * Method that return a JSON with the grade
   * @param {*} coordinatorID
   * @param {*} teamID
   * @returns
   */
  static makeTeamsGradeInfoJson = (allGrades, teamID) => {
    let gradeInfo;

    const teamGrade = this.filterTeamByID(allGrades, teamID);

    if (teamGrade.length === 0) {
      gradeInfo = this.gradeMetrics.map((matric, index) => ({
        metricID: (index + teamID * 2) * teamID,
        metricName: matric.name,
        metricValue: 0,
        metricPercentage: matric.percentage,
      }));
    } else {
      gradeInfo = this.gradeMetrics.map((matric, index) => ({
        metricID: index,
        metricName: matric.name,
        metricValue: eval(
          "teamGrade[0]." +
            matric.name.split(" ")[0].toLocaleLowerCase() +
            "_" +
            matric.name.split(" ")[1].toLocaleLowerCase()
        ),
        metricPercentage: matric.percentage,
      }));
    }
    return gradeInfo;
  };
}

module.exports = AuxiliarFunction;
