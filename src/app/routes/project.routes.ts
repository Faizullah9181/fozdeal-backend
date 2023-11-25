import Auth from '../middlewares/Auth';
import CreateProjectController from '../api/projects/controller/create.project.controller';
import GetAllProjectsController from '../api/projects/controller/get.all.project.controller';
import GetProjectsForHomePageController from '../api/projects/controller/get.project.homepage.controller';
import GetAllProjectsForUserController from '../api/projects/controller/get.all.project.users.controller';
import UpdateProjectController from '../api/projects/controller/update.project.controller';
import GetProjectByIdController from '../api/projects/controller/get.project.by.id.controller';
module.exports = function (app) {
    CreateProjectController.post(app, '/api/v1/project/create', [
        Auth.userToken
    ]);

    GetAllProjectsController.post(app, '/api/v1/admin/project/getAll', [
        Auth.adminToken
    ]);

    GetAllProjectsController.post(app, '/api/v1/superAdmin/project/getAll', [
        Auth.superAdminToken
    ]);

    GetProjectsForHomePageController.post(app, '/api/v1/project/homepage', []);

    GetAllProjectsForUserController.post(app, '/api/v1/user/project/getAll', [
        Auth.userToken
    ]);

    UpdateProjectController.put(app, '/api/v1/project/update', [
        Auth.userToken
    ]);

    GetProjectByIdController.post(app, '/api/v1/project/getById', [
        Auth.verifyToken
    ]);
};
