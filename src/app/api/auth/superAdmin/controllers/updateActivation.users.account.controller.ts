import { StatusCodes } from '../../../../enums/StatusCode';
import { SuccessMessages } from '../../../../enums/SuccessMessages';
import superAdminService from '../services/super.admin.service';
const {
    MasterController,
    Joi,
    RequestBuilder
} = require('@orca/base-packages');

export default class UpdateActivationController extends MasterController {
    static doc() {
        return {
            tags: ['Auth'],
            description:
                'UpdateActivation Account For All Users Including Admins , Entrepreneurs , Investors',
            summary:
                'UpdateActivation Account For All Users Including Admins , Entrepreneurs , Investors'
        };
    }

    static validate() {
        const payload = new RequestBuilder();
        payload.addToBody(
            Joi.object().keys({
                activation_status: Joi.string()
                    .valid('active', 'inactive')
                    .required(),
                user_id: Joi.string().required()
            })
        );
        return payload;
    }

    static secured() {
        return false;
    }

    async controller() {
        const { user_id, activation_status } = this.data;
        await superAdminService.UpdateActivation({
            user_id: user_id,
            activation_status: activation_status
        });
        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            SuccessMessages.UPDATE_USER_ACTIVATION_STATUS
        );
    }
}
