import authService from '../../auth.service';
import ValidationError from '../../../../../custom/validationErrors';
import { ErrorMessages } from '../../../../enums/ErrorMessages';
import { StatusCodes } from '../../../../enums/StatusCode';
import { SuccessMessages } from '../../../../enums/SuccessMessages';
import superAdminService from '../services/super.admin.service';

const {
    MasterController,
    Joi,
    RequestBuilder
} = require('@orca/base-packages');

export default class CreateAdminController extends MasterController {
    static doc() {
        return {
            tags: ['Auth'],
            description: 'Create Admin user',
            summary: 'Register Admin user using email and password'
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
                password: Joi.string().min(8).max(20).required()
            })
        );
        return payload;
    }

    async controller() {
        const { first_name, last_name, email, password } = this.data;
        let user = await authService.getUserFromEmailAndRole(email);
        if (user) {
            throw new ValidationError(ErrorMessages.USER_ALREADY_EXISTS);
        }
        const response = await superAdminService.createAdmin({
            first_name,
            last_name,
            email,
            password
        });
        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.ADMIN_CREATED_SUCESSFULLY
        );
    }
}
