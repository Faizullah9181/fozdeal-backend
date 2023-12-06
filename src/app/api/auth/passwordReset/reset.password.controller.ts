import { StatusCodes } from '../../../enums/StatusCode';
import { SuccessMessages } from '../../../enums/SuccessMessages';
import authService from '../auth.service';

const {
    MasterController,
    RequestBuilder,
    Joi
} = require('@orca/base-packages');

export default class AuthResetPasswordController extends MasterController {
    static doc() {
        return {
            tags: ['Auth'],
            description: 'Reset password',
            summary: 'Reset password'
        };
    }

    static secured() {
        return false;
    }

    static validate() {
        const payload = new RequestBuilder();
        payload.addToBody(
            Joi.object().keys({
                password: Joi.string().required()
            })
        );
        return payload;
    }

    async controller() {
        const { user, password } = this.data;

        const response = await authService.resetPassword(user, password);

        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.PASSWORD_RESET_SUCCESS
        );
    }
}
