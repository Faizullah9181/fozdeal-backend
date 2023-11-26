import { StatusCodes } from '../../../enums/StatusCode';
import { SuccessMessages } from '../../../enums/SuccessMessages';
import ProjectService from '../services/project.service';

const {
    MasterController,
    Joi,
    RequestBuilder
} = require('@orca/base-packages');

export default class CreateInvestMentController extends MasterController {
    static doc() {
        return {
            tags: ['Investor'],
            description: 'Invest Project',
            summary: 'invest in project '
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
        const response = await ProjectService.createInvestment({
            user_id: user.id,
            project_id: project_id
        });
        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.PROJECT_INVESTED
        );
    }
}
