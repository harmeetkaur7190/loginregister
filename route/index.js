const express = require('express');
const cRoute = express.Router();
const studentController = require('../controller');


cRoute.route('/studentlogin').post(studentController.register);
cRoute.route('/studentlogin/:id').delete(studentController.delete);
cRoute.route('/studentlogin/login').post(studentController.login);
cRoute.route('/studentlogin/:id').put(studentController.update);
cRoute.route('/studentlogin').get(studentController.getUsers);
cRoute.route('/studentlogin/:id').get(studentController.getUser);
//cRoute.route('/studentlogin/logout').get(studentController.logout);

cRoute.route('/studentlogin/registerteacher').post(studentController.registerteacher);
cRoute.route('/studentlogin/deleteteacher/:id').delete(studentController.deleteteacher);
cRoute.route('/studentlogin/loginteacher').post(studentController.loginteacher);
cRoute.route('/studentlogin/updateteacher/:id').put(studentController.updateteacher);
cRoute.route('/studentlogin/getUsersteacher').get(studentController.getUsersteacher);
cRoute.route('/studentlogin/getUserteacher/:id').get(studentController.getUserteacher);

cRoute.route('/studentlogin/registeradmin').post(studentController.registeradmin);
cRoute.route('/studentlogin/deleteadmin/:id').delete(studentController.deleteadmin);
cRoute.route('/studentlogin/loginadmin').post(studentController.loginadmin);
cRoute.route('/studentlogin/updateadmin/:id').put(studentController.updateadmin);
cRoute.route('/studentlogin/getUsersadmin').get(studentController.getUsersadmin);
cRoute.route('/studentlogin/getUseradmin/:id').get(studentController.getUseradmin);




module.exports = cRoute;