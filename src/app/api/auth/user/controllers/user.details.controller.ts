import { StatusCodes } from '../../../../enums/StatusCode';
import { SuccessMessages } from '../../../../enums/SuccessMessages';
import userService from '../services/user.service';
import userRepository from '../../../../repository/user.repository';
const { MasterController } = require('@orca/base-packages');

export default class GetUserDetails extends MasterController {
    static doc() {
        return {
            tags: ['Profile'],
            description: 'Get Details  For user',
            summary: 'Get Details  For user'
        };
    }

    static secured() {
        return false;
    }

    async controller() {
        const { user } = this.data;

        if (user.role === 'investor') {
            const result = await userRepository.findUser({ id: user.id });
            const subscriptionFlag: number = result.is_subscribe;
            if (subscriptionFlag === 1) {
                const date1 = new Date(result.subscription_started_at);
                const date2 = new Date();
                const diffTime = Math.abs(date2.getTime() - date1.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays > 180) {
                    console.log('datepassed', diffDays);
                    await userRepository.updateUser(
                        {
                            is_subscribe: 0
                        },
                        user.id
                    );
                }
            }
        }
        const response = await userService.getUser(user.id);
        console.log('response', response);
        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.USER_DETAILS_FETCHED_SUCCESS
        );
    }
}
