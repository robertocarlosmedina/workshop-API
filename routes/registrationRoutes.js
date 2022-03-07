const express = require('express');
const router = express.Router();
router.use(express.json());

const Workshop = require('../db/workshop');
const Validation = require('../src/validations');


router.get('/', express.json(), async (req, res) => {
	const users = await Workshop.getRegisteredUsers();

	if (!users) return res.sendStatus(500) // internal error
	return res.json(
	    users.map((user) => ({
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            personal_code: user.personal_code,
            scholar_year: user.scholar_year, 
            degree_type: user.degree_type,
            course_name: user.course_name,
            presential: user.presential
		}))
	)
});

router.post('/make_registration', express.json(), async (req, res) => {
	const { 
        email, full_name, scholar_year, degree_type, 
        course_description, phone_number, presential } = req.body;
    const new_registre = {
        email: email, 
        full_name: full_name, 
        scholar_year: scholar_year, 
        degree_type: degree_type, 
        course_description: course_description, 
        phone_number: phone_number, 
        presential: presential
    }
	const all_users = await Workshop.getRegisteredUsers();
	const userAlredyExits = Validation.checkIfRegisteAlreadyExists(new_registre.email, all_users);

	if(userAlredyExits){
		return res.sendStatus(401);
	}
    
	const new_user = await Workshop.postNewRegistration(new_registre);
	const updated_all_users = await Workshop.getRegisteredUsers();
	const last_user = updated_all_users[updated_all_users.length-1];
	if(!new_user) return res.sendStatus(500);
	
	return res.json(last_user);
});

module.exports = router;