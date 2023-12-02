import { ErrorMessages } from '../../../enums/ErrorMessages';
import { StatusCodes } from '../../../enums/StatusCode';
import { SuccessMessages } from '../../../enums/SuccessMessages';
import GridEmailService from '../../../common/email.service';
import authService from '../auth.service';

const {
    MasterController,
    RequestBuilder,
    Joi
} = require('@orca/base-packages');
export default class ForgotPasswordController extends MasterController {
    static doc() {
        return {
            tags: ['Auth'],
            description: 'Forgot password',
            summary: 'Send forgot password email'
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
                language: Joi.string().valid('en', 'ar').required()
            })
        );
        return payload;
    }

    async controller() {
        const { email, language } = this.data;
        const user = await authService.getUserFromEmailAndRole(email);
        if (!user) {
            return new this.ResponseBuilder(
                StatusCodes.NOT_FOUND,
                null,
                ErrorMessages.USER_INVALID
            );
        }
        const token = await authService.generateForgotPasswordToken(user);
        const emailData = {
            email: email,
            token: token['reset-token'],
            language: language
        };
        const response = await GridEmailService.sendForgotPasswordEmail(
            emailData
        );
        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.FORGOT_PASSWORD_EMAIL_SENT
        );
    }
}
