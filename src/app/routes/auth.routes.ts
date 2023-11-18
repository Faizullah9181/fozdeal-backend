import UserRegisterController from '../api/auth/user/controllers/user.register.controller';
import UserLoginController from '../api/auth/login/controller/global.login.controller';
import GetSuperAdminDetails from '../api/auth/superAdmin/controllers/get.super.admin.controller';
import CreateAdminController from '../api/auth/superAdmin/controllers/create.admin.account.controller';
import Auth from '../middlewares/Auth';
module.exports = function (app) {
    UserRegisterController.post(app, '/api/auth/v1/user/register', []);

    UserLoginController.post(app, '/api/auth/v1/user/login', []);

    GetSuperAdminDetails.get(app, '/api/auth/v1/user/superAdmin/details', [
        Auth.userToken
    ]);

    CreateAdminController.post(
        app,
        '/api/auth/v1/user/superAdmin/createAdmin',
        [Auth.SuperAdminToken]
    );
};
