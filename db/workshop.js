const DB = require('./db')

class Workshop {
	/* Sql connectors related to the user autentication */ 

	/**
	 * 
	 * @param {*} id 
	 * @returns 
	 */
	static getCoordinators =  async (id = null) => {
		let sql;
		if(id !== null){
			sql = `select * from coordenator WHERE id=${id}`;
		}
		else{
			sql = `select * from coordenator`;
		}
		return await DB.Select(sql);
	}

	/**
	 * 
	 * @param {*} nome 
	 * @param {*} email 
	 * @param {*} hash_password 
	 * @returns 
	 */
	static postCoordinators =  async (username, email, hash_password) => {
		const sql = `INSERT INTO coordenator (email , username, full_name, hash_password) VALUES 
		("${email}", "${username}", "", "${hash_password}");`;	
		const results = await DB.Insert(sql);
		return results;
	}

	/**
	 * 
	 * @param {*} id 
	 * @param {*} password 
	 * @returns 
	 */
	static editCoordinator =  async (id, password) => {
		
		const sql = `UPDATE coordenator SET hash_password="${password}"
		 WHERE id=${id};`;
		return await DB.Update(sql);
	}

	/**
	 * 
	 * @param {*} id 
	 * @returns 
	 */
	static deleteCoordinator =  async (id) => {
		const sql = `DELETE FROM coordenators WHERE id=${id}`;
		return await DB.Delete(sql);
	}

	/**
	 * ______________________________________________________________________
	 * 													Registe Table cursors
	 */

	/**
	 * 
	 * @param {*} id 
	 * @returns 
	 */
	 static getRegisteredUsers =  async (id = null) => {
		let sql;
		if(id !== null){
			sql = `select * from user_register WHERE id=${id}`;
		}
		else{
			sql = `select * from user_register`;
		}
		return await DB.Select(sql);
	}

	static postNewRegistration =  async (new_registre) => {
		const sql = `INSERT INTO coordenators (email, full_name, scholar_year, degree_type, 
			course_description, phone_number, presential) VALUES 
		("${new_registre.email}", "${new_registre.full_name}", 
		"${new_registre.scholar_year}","${new_registre.degree_type}", 
		"${new_registre.course_description}", "${new_registre.phone_number}", 
		"${new_registre.presential}");`;	
		const results = await DB.Insert(sql);
		return results;
	}
}

module.exports = Workshop;
