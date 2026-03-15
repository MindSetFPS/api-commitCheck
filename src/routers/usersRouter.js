const {Router} = require('express');
const router = Router();
const {getUsers, postUsers, putUser, deleteUser} = require('../controllers/usersController.js');

router.get('/', getUsers);
router.post('/', postUsers);
router.put('/:id', putUser);
router.delete('/:id', deleteUser);

module.exports = router;