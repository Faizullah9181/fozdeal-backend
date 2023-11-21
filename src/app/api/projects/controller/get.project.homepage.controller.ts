import { StatusCodes } from '../../../enums/StatusCode';
import { SuccessMessages } from '../../../enums/SuccessMessages';
import ProjectService from '../services/project.service';
import { CategoryStatus } from '../../../enums/Category';
import { ProjectLevel } from '../../../enums/ProjectLevel';

const {
    MasterController,
    Joi,
    RequestBuilder
} = require('@orca/base-packages');

export default class GetProjectsForHomePageController extends MasterController {
    static doc() {
        return {
            tags: ['Project'],
            description: 'Get All Available Projects For Investors',
            summary: 'get all available projects for admins  for Investment'
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
                    )
                })
            })
        );
        return payload;
    }

    async controller() {
        const { user, limit, offset, filter } = this.data;
        const response = await ProjectService.getAllProjects({
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
