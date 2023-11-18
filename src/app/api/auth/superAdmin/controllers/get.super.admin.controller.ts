import { StatusCodes } from '../../../../enums/StatusCode';
import { SuccessMessages } from '../../../../enums/SuccessMessages';
import superAdminService from '../services/super.admin.service';
const { MasterController } = require('@orca/base-packages');

export default class GetSuperAdminDetails extends MasterController {
    static doc() {
        return {
            tags: ['Auth'],
            description: 'Get Details  For All Super Admins',
            summary: 'Get Details  For All Super Admins'
        };
    }

    static secured() {
        return false;
    }

    async controller() {
        const { user } = this.data;

        const response = await superAdminService.getSuperAdmin(user.id);
        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.SUPER_ADMIN_LOGIN_SUCCESS
        );
    }
}
