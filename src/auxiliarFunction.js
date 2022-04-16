const Workshop = require("../db/workshop");
const buffer = require("buffer/").Buffer;

class AuxiliarFunction {
  static chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  static code_length = 6;
  static accessTokenLength = 24;

  /**
   *
   * @param {*} all_user
   * Generate a unique code for a new user
   */
  static personalCodeGenerator = async (all_user_codes = null) => {
    if (!all_user_codes) {
      all_user_codes = await this.getRegisteredUsersCodes();
    }

    // console.log("\n\n\n", all_user_codes, "\n\n\n");

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

  static getCoordinatorIdFromName = async (coordinator_name) => {
    const all_coordinators = await Workshop.getCoordinators();
    for (let i = 0; i < all_coordinators.length; i++) {
      if (all_coordinators[i].username === coordinator_name) {
        return all_coordinators[i].id;
      }
    }
  };

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
   * Method to tetunr the name and the email of a user
   * according the the userID 
   * @param {*} allUsers 
   * @param {*} userID 
   * @returns 
   */
  static makeTeamsJsonFormat = (allUsers, userID) => {
    const user = allUsers.filter((user) => {
      return user.id === userID;
    });
    return { name: user[0].full_name, email: user[0].email };
  };
}

module.exports = AuxiliarFunction;
