import { StatusCodes } from '../../../enums/StatusCode';
import { SuccessMessages } from '../../../enums/SuccessMessages';
import ProjectService from '../services/project.service';
import ValidationError from '../../../../custom/validationErrors';
const { MasterController } = require('@orca/base-packages');

export default class GetProjectDataController extends MasterController {
    static doc() {
        return {
            tags: ['Project'],
            description: 'Get Project Analytics',
            summary: 'get project analytics '
        };
    }

    static secured() {
        return false;
    }

    async controller() {
        const response = await ProjectService.getProjectData();

        if (!response) throw new ValidationError('Project not found');

        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.PROJECT_FETCHED
        );
    }
}
