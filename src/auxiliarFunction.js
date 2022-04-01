const Workshop = require('../db/workshop');

class AuxiliarFunction{
  
    /**
     * 
     * @param {*} all_user 
     * Generate a unique code for a new user
     */
    static personalCodeGenerator = async (all_user_codes=null) => {
        if (! all_user_codes){all_user_codes = await this.getRegisteredUsersCodes();}

        const code_length = 6;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        // console.log("\n\n\n", all_user_codes, "\n\n\n");

        let personal_code = '';
        for (let i = 0; i < code_length; i++) {
            personal_code += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        if (all_user_codes.includes(personal_code)){   //prevents duplicate codes
            return personalCodeGenerator(all_user_codes);
        }
        return personal_code;
    }

    static getRegisteredUsersCodes =  async () => {
		const all_users = await Workshop.getRegisteredUsers();
		let user_codes = [];
		for (let i = 0; i < all_users.length; i++) {
            user_codes.push(all_users[i].personal_code);
		}
        return user_codes;
	}

    static getUserIdFromCode =  async (code) => {
		const all_users = await Workshop.getRegisteredUsers();
		for (let i = 0; i < all_users.length; i++) {
            if (all_users[i].personal_code === code){
                return all_users[i].id
            }
		}
        return false;  // if id is not found, it means that the user does not exist
	}

    /**
     * 
     * @param {*} all_grades    Array of objects from all the grades
     * @param {*} id_team       
     * Get the grade of a specific team from it's ID
     */
    static getTeamGrade(all_grades, id_team){

    }

    /**
     * 
     * @param {*} all_grades 
     * @param {*} id_team 
     * Filter for all the grades from a specific team
     */
    static filterTeamAllGrades(all_grades, id_team){

    }

    static getTeamIdFromName =  async (team_name) => {
		const all_teams = await Workshop.getAllTeams();
		for (let i = 0; i < all_teams.length; i++) {
            if (all_teams[i].team_name === team_name){
                return all_teams[i].id;
            }
		}
	}

    static getCoordinatorIdFromName =  async (coordinator_name) => {
		const all_coordinators = await Workshop.getCoordinators();
		for (let i = 0; i < all_coordinators.length; i++) {
            if (all_coordinators[i].username === coordinator_name){
                return all_coordinators[i].id;
            }
		}
	}
    
    static generatJSONResponseObject = (statusCode, errorMessage, successMessage, data) =>{
        return {statusCode: statusCode, errorMessage: errorMessage, successMessage: successMessage, data: data} 
    }
}

module.exports = AuxiliarFunction;