import { StatusCodes } from '../../../../enums/StatusCode';
import { SuccessMessages } from '../../../../enums/SuccessMessages';
import superAdminService from '../services/super.admin.service';
const { MasterController } = require('@orca/base-packages');

export default class GetSuperAdminDetails extends MasterController {
    static doc() {
        return {
            tags: ['Profile'],
            description: 'Get Detail  For Super Admin',
            summary: 'Get Detail  For  Super Admin'
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
