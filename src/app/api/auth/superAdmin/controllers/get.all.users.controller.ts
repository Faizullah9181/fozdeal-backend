import { StatusCodes } from '../../../../enums/StatusCode';
import { SuccessMessages } from '../../../../enums/SuccessMessages';
import superAdminService from '../services/super.admin.service';
const {
    MasterController,
    RequestBuilder,
    Joi
} = require('@orca/base-packages');

export default class GetAllUsers extends MasterController {
    static doc() {
        return {
            tags: ['Auth'],
            description:
                'Get All Users Including Admins , Entrepreneurs , Investors',
            summary:
                'Get All Users Including Admins , Entrepreneurs , Investors'
        };
    }

    static secured() {
        return false;
    }

    static validate() {
        const payload = new RequestBuilder();
        payload.addToBody(
            Joi.object().keys({
                filter: Joi.object().keys({
                    role: Joi.string().valid(
                        'admin',
                        'entrepreneur',
                        'investor'
                    ),
                    gender: Joi.string().valid('male', 'female'),
                    status: Joi.string().valid('active', 'inactive')
                }),
                limit: Joi.number().required(),
                offset: Joi.number().required()
            })
        );
        return payload;
    }

    async controller() {
        const { filter, limit, offset } = this.data;
        const response = await superAdminService.getAllUsers(
            filter,
            limit,
            offset
        );
        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.SUPER_ADMIN_LOGIN_SUCCESS
        );
    }
}
