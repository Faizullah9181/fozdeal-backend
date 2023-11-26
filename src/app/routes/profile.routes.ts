import GetSuperAdminDetails from '../api/auth/superAdmin/controllers/get.super.admin.controller';
import GetUserDetails from '../api/auth/user/controllers/user.details.controller';
import GetAdminDetails from '../api/auth/admin/controllers/get.admin.profile';
import UpdateAdminProfileController from '../api/auth/admin/controllers/update.admin.profile.controller';
import UpdateSuperAdminProfileController from '../api/auth/superAdmin/controllers/update.superAdmin.profile.controller';
import UpdateUserProfileController from '../api/auth/user/controllers/update.user.profile.controller';
import GetAllCategories from '../api/projects/controller/get.all.project.category.controller';

import Auth from '../middlewares/Auth';
module.exports = function (app) {
    GetSuperAdminDetails.get(app, '/api/auth/v1/user/superAdmin/profile', [
        Auth.superAdminToken
    ]);

    GetUserDetails.get(app, '/api/auth/v1/user/profile', [Auth.userToken]);

    GetAdminDetails.get(app, '/api/auth/v1/user/admin/profile', [
        Auth.adminToken
    ]);

    UpdateAdminProfileController.put(
        app,
        '/api/auth/v1/user/admin/update/profile',
        [Auth.adminToken]
    );

    UpdateSuperAdminProfileController.put(
        app,
        '/api/auth/v1/user/update/superAdmin/profile',
        [Auth.superAdminToken]
    );

    UpdateUserProfileController.put(app, '/api/auth/v1/user/update/profile', [
        Auth.userToken
    ]);

    GetAllCategories.get(app, '/api/get/categories', []);
};
