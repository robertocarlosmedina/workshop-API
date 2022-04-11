const { user } = require("pg/lib/defaults");
const DB = require("./db");

class Workshop {
  /* Sql connectors related to the user autentication */

  /**
   *
   * @param {*} id
   * @returns
   */
  static getCoordinators = async (id = null) => {
    let sql;
    if (id !== null) {
      sql = `select * from coordenator WHERE id=${id}`;
    } else {
      sql = `select * from coordenator`;
    }
    return await DB.Select(sql);
  };

  /**
   *
   * @param {*} nome
   * @param {*} email
   * @param {*} hash_password
   * @returns
   */
  static postCoordinators = async (username, email, hash_password) => {
    const sql = `INSERT INTO coordenator (email , username, full_name, hash_password) VALUES 
		("${email}", "${username}", "", "${hash_password}");`;
    const results = await DB.Insert(sql);
    return results;
  };

  /**
   *
   * @param {*} id
   * @param {*} password
   * @returns
   */
  static editCoordinator = async (id, password) => {
    const sql = `UPDATE coordenator SET hash_password="${password}" WHERE id=${id};`;
    return await DB.Update(sql);
  };

  /**
   *
   * @param {*} id
   * @param {*} access_token
   * @returns
   */
   static addCoordinatorAccessToken = async (id, access_token) => {
    const sql = `UPDATE coordenator SET access_token="${access_token}" WHERE id=${id};`;
    return await DB.Update(sql);
  };

  /**
   *
   * @param {*} id
   * @returns
   */
  static deleteCoordinator = async (id) => {
    const sql = `DELETE FROM coordenator WHERE id=${id}`;
    return await DB.Delete(sql);
  };

  /**
   * ______________________________________________________________________
   * 													Registe Table cursors
   */

  /**
   *
   * @param {*} id
   * @returns
   */
  static getRegisteredUsers = async (id = null) => {
    let sql;
    if (id !== null) {
      sql = `select * from user_register WHERE id=${id}`;
    } else {
      sql = `select * from user_register`;
    }
    return await DB.Select(sql);
  };

  static getAllTeams = async () => {
    return await DB.Select( `select * from wsh_team`);
  };

  static getAllGrades = async () => {
    return await DB.Select( `select * from wsh_grade`);
  };

  static getTeam = async (id) => {
    return await DB.Select( `select * from wsh_team WHERE id=${id}`);
  };

  static postNewRegistration = async (new_registre) => {
    const sql = `INSERT INTO user_register (email, full_name, personal_code, scholar_year, degree_type, course_name, presential) VALUES 
		("${new_registre.email}",
		"${new_registre.full_name}",
		"${new_registre.personal_code}", 
		"${new_registre.scholar_year}",
		"${new_registre.degree_type}", 
		"${new_registre.course_name}",
		${new_registre.presential});`;
    const results = await DB.Insert(sql);
    return results;
  };

  static postNewTeam = async (new_team) => {
    const sql = `INSERT INTO wsh_team (team_name, id_first_member, id_second_member) VALUES 
    ("${new_team.team_name}",
      ${new_team.id_first_member},
      ${new_team.id_second_member}
    );`
    
    const results = await DB.Insert(sql);
    return results;
  };

  static postNewGrade = async (new_grade) => {
    const sql = `INSERT INTO wsh_grade 
    (id_team,
     id_coordenator,
     code_readability, 
     algorithm_efficiency, 
     completed_tasks, 
     creativity, 
     results_analysis
    )
    VALUES 
    (${new_grade.id_team},
      ${new_grade.id_coordenator},
      ${new_grade.code_readability_grade},
      ${new_grade.algorithm_efficiency_grade},
      ${new_grade.completed_tasks_grade},
      ${new_grade.creativity_grade},
      ${new_grade.result_analisys_grade}
    );`
    
    const results = await DB.Insert(sql);
    return results;
  };
}


module.exports = Workshop;
