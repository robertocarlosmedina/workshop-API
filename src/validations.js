
class Validation{
  
  /**
   * Arrow Function that filter all routes and retunr the route name
   *  @param username
   *  @param user_email
   * 	@param all_users
   *  @return The route name
   * */ 
  static checkIfUserAlreadyExists(username, user_email, all_users){
    const related_user = all_users.filter( (user) =>{
        return user.username === username || user.email === user_email
    });
    return related_user.length > 0;
  }
  
  /**
   * 
   * @param {*} user_email 
   * @param {*} all_users 
   * @returns 
   */
  static checkIfRegisteAlreadyExists(user_email, all_users){
    const related_user = all_users.filter( (user) =>{
        return user.email === user_email
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
  static authenticateUserPersonalCode(all_users, user_personal_code){
    return false
  }

  /**
   * 
   * @param {*} all_teams 
   * @param {*} id_team_member 
   * @returns 
   * Check if the team member is in another team
   */
  static checkTeamMemberAvailability(all_teams, id_team_member){
    return true
  }

}

module.exports = Validation;