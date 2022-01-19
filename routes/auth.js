const express = require('express');
const router = express.Router();
const {isAuthenticatedUser} = require('../middlewares/auth') 
const {registerUser,loginUser, logout,getUserProfile, updatePassword} = require('../controllers/authController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/logout').get(logout);
router.route('/me').get(isAuthenticatedUser,getUserProfile);
router.route('/password/update').put(isAuthenticatedUser,updatePassword);

module.exports = router;