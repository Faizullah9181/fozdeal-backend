import Auth from '../middlewares/Auth';
import CreateProjectController from '../api/projects/controller/create.project.controller';
module.exports = function (app) {
    CreateProjectController.post(app, '/api/v1/project/create', [
        Auth.userToken
    ]);
};
