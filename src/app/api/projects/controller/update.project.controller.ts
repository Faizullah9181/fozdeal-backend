import { StatusCodes } from '../../../enums/StatusCode';
import { SuccessMessages } from '../../../enums/SuccessMessages';
import ProjectService from '../services/project.service';
import { CategoryStatus } from '../../../enums/Category';
import { ProjectLevel } from '../../../enums/ProjectLevel';
import { ProjectMediaStatus } from '../../../enums/ProjectMediaStatus';
import ValidationError from '../../../../custom/validationErrors';
import { SubCategoryStatus } from '../../../enums/Category';
import { GeoStatus } from '../../../enums/GeoStatus';
import { ProjectSizeStatus } from '../../../enums/ProjectSizeStatus';

const {
    MasterController,
    Joi,
    RequestBuilder
} = require('@orca/base-packages');

export default class UpdateProjectController extends MasterController {
    static doc() {
        return {
            tags: ['Project'],
            description: 'Upadte Project',
            summary: 'update project'
        };
    }

    static secured() {
        return false;
    }

    static validate() {
        const payload = new RequestBuilder();
        payload.addToBody(
            Joi.object().keys({
                project_id: Joi.number().required(),
                project_name: Joi.string().required(),
                project_description: Joi.string().required(),
                project_gist: Joi.string().required(),
                project_level: Joi.valid(
                    ...Object.values(ProjectLevel)
                ).required(),
                project_sub_category: Joi.string()
                    .valid(...Object.values(SubCategoryStatus))
                    .required(),
                project_geo_location: Joi.string()
                    .valid(...Object.values(GeoStatus))
                    .required(),
                project_size: Joi.string()
                    .valid(...Object.values(ProjectSizeStatus))
                    .required(),
                project_category: Joi.string()
                    .valid(...Object.values(CategoryStatus))
                    .required(),
                project_media: Joi.array().items(
                    Joi.object().keys({
                        url: Joi.string().required(),
                        media_type: Joi.string()
                            .valid(...Object.values(ProjectMediaStatus))
                            .required()
                    })
                )
            })
        );
        return payload;
    }

    async controller() {
        const {
            user,
            project_id,
            project_name,
            project_description,
            project_gist,
            project_level,
            project_category,
            project_media,
            project_sub_category,
            project_geo_location,
            project_size
        } = this.data;

        const project = await ProjectService.getProjectById(project_id);

        if (!project) {
            throw new ValidationError('Project not found');
        }

        if (project.createdBy !== user.id) {
            throw new ValidationError(
                'You are not authorized to update this project'
            );
        }

        const response = await ProjectService.updateProject({
            user_id: user.id,
            project_name,
            project_description,
            project_gist,
            project_level,
            project_category,
            project_media,
            project_sub_category,
            project_geo_location,
            project_size,
            project_id
        });
        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.PROJECT_UPDATED
        );
    }
}
