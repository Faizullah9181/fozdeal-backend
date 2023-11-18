import { StatusCodes } from '../../../../enums/StatusCode';
import { SuccessMessages } from '../../../../enums/SuccessMessages';
import superAdminService from '../services/super.admin.service';
const { MasterController } = require('@orca/base-packages');

export default class GetAllUsers extends MasterController {
    static doc() {
        return {
            tags: ['Auth'],
            description:
                'Get All Users Including Admins , Entrepreneurs , Investors',
            summary:
                'Get All Users Including Admins , Entrepreneurs , Investors'
        };
    }

    static secured() {
        return false;
    }

    async controller() {
        const response = await superAdminService.getAllUsers();
        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.SUPER_ADMIN_LOGIN_SUCCESS
        );
    }
}
