import { StatusCodes } from '../../../../enums/StatusCode';
import { SuccessMessages } from '../../../../enums/SuccessMessages';
import superAdminService from '../services/super.admin.service';
const { MasterController } = require('@orca/base-packages');

export default class GetSuperAdminDetails extends MasterController {
    static doc() {
        return {
            tags: ['Auth'],
            description: 'Login Api For All Users',
            summary: 'Login using email and password'
        };
    }

    static secured() {
        return false;
    }

    async controller() {
        const { user } = this.data;

        const response = await superAdminService.getSuperAdmin(
            user.entrepreneur.id
        );
        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.SUPER_ADMIN_LOGIN_SUCCESS
        );
    }
}
