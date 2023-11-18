import UserRegisterController from '../api/auth/user/controllers/user.register.controller';
import UserLoginController from '../api/auth/login/controller/global.login.controller';
import GetSuperAdminDetails from '../api/auth/superAdmin/controllers/get.super.admin.controller';
import CreateAdminController from '../api/auth/superAdmin/controllers/create.admin.account.controller';
import GetUserDetails from '../api/auth/user/controllers/user.details.controller';
import GetAdminDetails from '../api/auth/admin/controllers/get.admin.profile';
import GetAllUsers from '../api/auth/superAdmin/controllers/get.all.users.controller';
import UpdateActivationController from '../api/auth/superAdmin/controllers/updateActivation.users.account.controller';
import Auth from '../middlewares/Auth';
module.exports = function (app) {
    UserRegisterController.post(app, '/api/auth/v1/user/register', []);

    UserLoginController.post(app, '/api/auth/v1/user/login', []);

    GetSuperAdminDetails.get(app, '/api/auth/v1/user/superAdmin/profile', [
        Auth.superAdminToken
    ]);

    GetUserDetails.get(app, '/api/auth/v1/user/profile', [Auth.userToken]);

    GetAllUsers.get(app, '/api/auth/v1/user/allUsers', [Auth.superAdminToken]);

    CreateAdminController.post(
        app,
        '/api/auth/v1/user/superAdmin/createAdmin',
        [Auth.superAdminToken]
    );

    UpdateActivationController.post(app, '/api/auth/v1/user/updateActivation', [
        Auth.superAdminToken
    ]);

    GetAdminDetails.get(app, '/api/auth/v1/user/admin/profile', [
        Auth.adminToken
    ]);
};
