import ValidationError from '../../../../custom/validationErrors';
import { StatusCodes } from '../../../enums/StatusCode';
import { SuccessMessages } from '../../../enums/SuccessMessages';
import ProjectService from '../services/project.service';
import userRepository from '../../../repository/user.repository';
const {
    MasterController,
    Joi,
    RequestBuilder
} = require('@orca/base-packages');

export default class GetDetailsForEnterPrenuerController extends MasterController {
    static doc() {
        return {
            tags: ['Investor'],
            description: 'Get Details For Enterprenuer',
            summary: 'get details for enterprenuer'
        };
    }

    static secured() {
        return false;
    }

    static validate() {
        const payload = new RequestBuilder();
        payload.addToBody(
            Joi.object().keys({
                project_id: Joi.number().required()
            })
        );
        return payload;
    }

    async controller() {
        const { user, project_id } = this.data;
        const isSubscribe = await userRepository.findUser({
            id: user.id
        });

        if (
            user.role !== 'investor' &&
            user.role !== 'superAdmin' &&
            user.role !== 'admin'
        ) {
            throw new ValidationError(
                'Only investor can get details of enterprenuer'
            );
        }

        const response = await ProjectService.getDetailForEnterprenuer({
            project_id,
            user_id: user.id,
            is_subscribe: isSubscribe.is_subscribe
        });
        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.PROJECT_FETCHED
        );
    }
}
