import { StatusCodes } from '../../../enums/StatusCode';
import { SuccessMessages } from '../../../enums/SuccessMessages';
import ProjectService from '../services/project.service';
import ValidationError from '../../../../custom/validationErrors';
const {
    MasterController,
    Joi,
    RequestBuilder
} = require('@orca/base-packages');

export default class GetProjectByIdController extends MasterController {
    static doc() {
        return {
            tags: ['Project'],
            description: 'Get Project By Id',
            summary: 'get project by id '
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
        const { project_id } = this.data;
        const response = await ProjectService.getProjectById(project_id);

        if (!response) throw new ValidationError('Project not found');

        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.PROJECT_FETCHED
        );
    }
}
