import { StatusCodes } from '../../../../enums/StatusCode';
import { SuccessMessages } from '../../../../enums/SuccessMessages';
import userService from '../services/user.service';
const { MasterController } = require('@orca/base-packages');

export default class GetUserDetails extends MasterController {
    static doc() {
        return {
            tags: ['Auth'],
            description: 'Get Details  For user',
            summary: 'Get Details  For user'
        };
    }

    static secured() {
        return false;
    }

    async controller() {
        const { user } = this.data;

        const response = await userService.getUser(user.id);
        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.USER_DETAILS_FETCHED_SUCCESS
        );
    }
}
