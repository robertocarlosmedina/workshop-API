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
        console.log("\n\n\n", all_user_codes, "\n\n\n");

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
}

module.exports = AuxiliarFunction;