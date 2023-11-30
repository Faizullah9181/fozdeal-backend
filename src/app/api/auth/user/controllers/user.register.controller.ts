import authService from '../../auth.service';
import { Roles } from '../../../../enums/Roles';
import ValidationError from '../../../../../custom/validationErrors';
import { ErrorMessages } from '../../../../enums/ErrorMessages';
import { StatusCodes } from '../../../../enums/StatusCode';
import { SuccessMessages } from '../../../../enums/SuccessMessages';
import userService from '../services/user.service';

const {
    MasterController,
    Joi,
    RequestBuilder
} = require('@orca/base-packages');

export default class UserRegisterController extends MasterController {
    static doc() {
        return {
            tags: ['Auth'],
            description: 'Register user',
            summary: 'Register new user using email and password'
        };
    }

    static secured() {
        return false;
    }

    static validate() {
        const payload = new RequestBuilder();
        payload.addToBody(
            Joi.object().keys({
                first_name: Joi.string().required(),
                last_name: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(6).max(20).required(),
                gender: Joi.string(),
                user_type: Joi.string()
                    .valid(Roles.ENTERPRENEUR, Roles.INVESTOR)
                    .required(),
                country_code: Joi.string().required(),
                phone_number: Joi.string(),
                about: Joi.string(),
                language: Joi.string().valid('en', 'ar').required()
            })
        );
        return payload;
    }

    async controller() {
        const {
            first_name,
            last_name,
            email,
            password,
            user_type,
            country_code,
            about,
            phone_number,
            gender,
            language
        } = this.data;
        let user = await authService.getUserFromEmailAndRole(email);
        if (user) {
            throw new ValidationError(ErrorMessages.USER_ALREADY_EXISTS);
        }
        const response = await userService.registerUser({
            first_name,
            last_name,
            email,
            password,
            role: user_type,
            phone: phone_number,
            country_code,
            about,
            gender,
            language
        });
        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.USER_REGISTER_SUCCESS
        );
    }
}
