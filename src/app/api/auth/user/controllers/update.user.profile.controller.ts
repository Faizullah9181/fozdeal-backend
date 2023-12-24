import { StatusCodes } from '../../../../enums/StatusCode';
import { SuccessMessages } from '../../../../enums/SuccessMessages';
import userService from '../services/user.service';

const {
    MasterController,
    Joi,
    RequestBuilder
} = require('@orca/base-packages');

export default class UpdateUserProfileController extends MasterController {
    static doc() {
        return {
            tags: ['Profile'],
            description: 'Update  User Profile',
            summary: 'Update  User Profile'
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
                phone: Joi.string().required(),
                about: Joi.string().required(),
                country_code: Joi.string().required(),
                country: Joi.string().required(),
                gender: Joi.string().required()
            })
        );
        return payload;
    }

    async controller() {
        const {
            user,
            first_name,
            last_name,
            phone,
            about,
            country_code,
            country,
            gender
        } = this.data;
        const response = await userService.updateUser({
            user_id: user.id,
            first_name,
            last_name,
            phone,
            about,
            country_code,
            country,
            gender
        });
        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.UPDATE_ADMIN_PROFILE
        );
    }
}
