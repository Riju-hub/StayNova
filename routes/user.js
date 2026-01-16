const express=require('express');
const router=express.Router();
const User=require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync.js');
const passport=require('passport');
const {saveRedirectUrl}=require('../Middleware.js');

const userController=require('../controllers/users.js');
const { render } = require('ejs');

router
    .route('/signup')
    .get(userController.renderSignUpForm)
    .post(wrapAsync(userController.signUp));

router
    .route('/login')
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl,passport.authenticate('local',{
        failureFlash:true,
        failureRedirect:'/login'
    }),userController.login);

router.get('/logout',userController.logout);

module.exports=router;