import { StatusCodes } from '../../../../enums/StatusCode';
import { SuccessMessages } from '../../../../enums/SuccessMessages';
import loginService from '../services/login.service';

const {
    MasterController,
    Joi,
    RequestBuilder
} = require('@orca/base-packages');

export default class LoginController extends MasterController {
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

    static validate() {
        const payload = new RequestBuilder();
        payload.addToBody(
            Joi.object().keys({
                email: Joi.string().email().required(),
                password: Joi.string().required()
            })
        );
        return payload;
    }

    async controller() {
        const { email, password } = this.data;

        const response = await loginService.login({
            email,
            password
        });
        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.USER_LOGIN_SUCCESS
        );
    }
}
