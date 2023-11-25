import UserRegisterController from '../api/auth/user/controllers/user.register.controller';
import UserLoginController from '../api/auth/login/controller/global.login.controller';
import CreateAdminController from '../api/auth/superAdmin/controllers/create.admin.account.controller';
import GetAllUsers from '../api/auth/superAdmin/controllers/get.all.users.controller';
import UpdateActivationController from '../api/auth/superAdmin/controllers/updateActivation.users.account.controller';
import ForgotPasswordController from '../api/auth/passwordReset/forget.password.controller';
import AuthResetPasswordController from '../api/auth/passwordReset/reset.password.controller';
import Auth from '../middlewares/Auth';
module.exports = function (app) {
    UserRegisterController.post(app, '/api/auth/v1/user/register', []);

    UserLoginController.post(app, '/api/auth/v1/user/login', []);

    GetAllUsers.get(app, '/api/auth/v1/user/allUsers', [Auth.superAdminToken]);

    CreateAdminController.post(
        app,
        '/api/auth/v1/user/superAdmin/createAdmin',
        [Auth.superAdminToken]
    );

    UpdateActivationController.post(app, '/api/auth/v1/user/updateActivation', [
        Auth.superAdminToken
    ]);

    ForgotPasswordController.post(app, '/api/auth/v1/user/forgotPassword', []);

    AuthResetPasswordController.post(app, '/api/auth/v1/user/resetPassword', [
        Auth.verifyResetPasswordToken
    ]);
};
