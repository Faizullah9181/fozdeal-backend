import { StatusCodes } from '../../../../enums/StatusCode';
import { SuccessMessages } from '../../../../enums/SuccessMessages';
import AdminService from '../services/admin.service';
const { MasterController } = require('@orca/base-packages');

export default class GetAdminDetails extends MasterController {
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

        const response = await AdminService.getAdmin(user.id);
        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.ADMIN_LOGIN_SUCCESS
        );
    }
}
