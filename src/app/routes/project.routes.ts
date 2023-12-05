import Auth from '../middlewares/Auth';
import CreateProjectController from '../api/projects/controller/create.project.controller';
import GetAllProjectsController from '../api/projects/controller/get.all.project.controller';
import GetProjectsForHomePageController from '../api/projects/controller/get.project.homepage.controller';
import GetAllProjectsForUserController from '../api/projects/controller/get.all.project.users.controller';
import UpdateProjectController from '../api/projects/controller/update.project.controller';
import GetProjectByIdController from '../api/projects/controller/get.project.by.id.controller';
import VerifyProjectController from '../api/projects/controller/project.verify.controller';
import HookController from '../api/projects/controller/hook.controllers';
import CreateInvestMentController from '../api/projects/controller/create.investment.project.controller';
import GetAllProjectsForInvestorController from '../api/projects/controller/get.all.project.investor.controller';
import GetDetailsForEnterPrenuerController from '../api/projects/controller/get.enterprenuer.details.controller';
import GetProjectDataController from '../api/projects/controller/get.projects.data.controller';
import CreateBuyInvestMentController from '../api/transactions/controller/create.subscription.controller';
import ContactEmailSenderController from '../api/auth/contactEmail/create.email.for.admin.controller';
import CreateSignedUrlController from '../api/projects/controller/create.signed.url.controller';
module.exports = function (app: any) {
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

    GetAllProjectsForInvestorController.post(
        app,
        '/api/v1/investor/project/getAll',
        [Auth.userToken]
    );

    UpdateProjectController.put(app, '/api/v1/project/update', [
        Auth.userToken
    ]);

    GetProjectByIdController.post(app, '/api/v1/project/getById', []);

    VerifyProjectController.post(app, '/api/v1/project/verify', [
        Auth.adminOrSuperAdminToken
    ]);

    CreateInvestMentController.post(app, '/api/v1/project/invest', [
        Auth.userToken
    ]);

    GetDetailsForEnterPrenuerController.post(
        app,
        '/api/v1/project/getDetailsOfEntrepreneur',
        [Auth.userToken]
    );

    HookController.post(app, '/callback', []);

    GetProjectDataController.get(app, '/api/v1/project/getAnalytics', [
        Auth.adminOrSuperAdminToken
    ]);

    CreateBuyInvestMentController.get(app, '/api/v1/buy', [Auth.userToken]);

    ContactEmailSenderController.post(app, '/api/v1/contactEmail', []);

    CreateSignedUrlController.post(app, '/api/v1/project/signedUrl', [
        Auth.userToken
    ]);
};
