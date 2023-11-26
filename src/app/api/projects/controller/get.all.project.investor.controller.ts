import { StatusCodes } from '../../../enums/StatusCode';
import { SuccessMessages } from '../../../enums/SuccessMessages';
import ProjectService from '../services/project.service';
import { CategoryStatus } from '../../../enums/Category';
import { ProjectLevel } from '../../../enums/ProjectLevel';
import { ProjectStatus } from '../../../enums/ProjectStatus';
import { SubCategoryStatus } from '../../../enums/Category';
import { GeoStatus } from '../../../enums/GeoStatus';
import { ProjectSizeStatus } from '../../../enums/ProjectSizeStatus';
import ValidationError from '../../../../custom/validationErrors';

const {
    MasterController,
    Joi,
    RequestBuilder
} = require('@orca/base-packages');

export default class GetAllProjectsForInvestorController extends MasterController {
    static doc() {
        return {
            tags: ['Investor'],
            description: 'Get All Available Projects For Investor',
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
                        ...Object.values(ProjectLevel)
                    ),

                    project_category: Joi.string().valid(
                        ...Object.values(CategoryStatus)
                    ),

                    project_status: Joi.string().valid(
                        ...Object.values(ProjectStatus)
                    ),
                    project_sub_category: Joi.string()
                        .valid(...Object.values(SubCategoryStatus))
                        .required(),
                    project_geo_location: Joi.string()
                        .valid(...Object.values(GeoStatus))
                        .required(),
                    project_size: Joi.string()
                        .valid(...Object.values(ProjectSizeStatus))
                        .required()
                })
            })
        );
        return payload;
    }

    async controller() {
        const { user, limit, offset, filter } = this.data;

        if (user.role !== 'investor') {
            throw new ValidationError('Only investors can access this route');
        }
        const response = await ProjectService.getAllProjectsForInvestors({
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
