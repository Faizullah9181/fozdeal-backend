import { StatusCodes } from '../../../enums/StatusCode';
import { SuccessMessages } from '../../../enums/SuccessMessages';
import ProjectService from '../services/project.service';
import { CategoryStatus } from '../../../enums/Category';
import { ProjectLevel } from '../../../enums/ProjectLevel';
import { ProjectStatus } from '../../../enums/ProjectStatus';

const {
    MasterController,
    Joi,
    RequestBuilder
} = require('@orca/base-packages');

export default class GetAllProjectsForUserController extends MasterController {
    static doc() {
        return {
            tags: ['Project'],
            description: 'Get All Available Projects',
            summary: 'get all available projects for admins  for approval'
        };
    }

    static secured() {
        return false;
    }

    static validate() {
        const payload = new RequestBuilder();
        payload.addToBody(
            Joi.object().keys({
                limit: Joi.number().required(),
                offset: Joi.number().required(),
                filter: Joi.object().keys({
                    project_level: Joi.string().valid(
                        ProjectLevel.EARLY,
                        ProjectLevel.EXIT,
                        ProjectLevel.EXPANSION,
                        ProjectLevel.GROWTH,
                        ProjectLevel.PRESEED,
                        ProjectLevel.SEED
                    ),
                    project_category: Joi.string().valid(
                        CategoryStatus.AGRICULTURE,
                        CategoryStatus.EDUCATION,
                        CategoryStatus.FINANCE,
                        CategoryStatus.HEALTH,
                        CategoryStatus.TECHNOLOGY,
                        CategoryStatus.ENERGY
                    ),
                    project_status: Joi.string().valid(
                        ProjectStatus.APPROVED,
                        ProjectStatus.PENDING,
                        ProjectStatus.REJECTED,
                        ProjectStatus.MODIFICATION_REQUIRED
                    )
                })
            })
        );
        return payload;
    }

    async controller() {
        const { user, limit, offset, filter } = this.data;
        const response = await ProjectService.getAllProjectsForUsers({
            user_id: user.id,
            limit,
            offset,
            filter
        });
        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.PROJECT_FETCHED
        );
    }
}
