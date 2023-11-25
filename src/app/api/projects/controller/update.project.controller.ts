import { StatusCodes } from '../../../enums/StatusCode';
import { SuccessMessages } from '../../../enums/SuccessMessages';
import ProjectService from '../services/project.service';
import { CategoryStatus } from '../../../enums/Category';
import { ProjectLevel } from '../../../enums/ProjectLevel';
import { ProjectMediaStatus } from '../../../enums/ProjectMediaStatus';
import ValidationError from '../../../../custom/validationErrors';

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
                project_level: Joi.string()
                    .valid(
                        ProjectLevel.EARLY,
                        ProjectLevel.EXIT,
                        ProjectLevel.EXPANSION,
                        ProjectLevel.GROWTH,
                        ProjectLevel.PRESEED,
                        ProjectLevel.SEED
                    )
                    .required(),
                project_category: Joi.string()
                    .valid(
                        CategoryStatus.AGRICULTURE,
                        CategoryStatus.EDUCATION,
                        CategoryStatus.FINANCE,
                        CategoryStatus.HEALTH,
                        CategoryStatus.TECHNOLOGY,
                        CategoryStatus.ENERGY
                    )
                    .required(),
                project_media: Joi.array().items(
                    Joi.object().keys({
                        url: Joi.string().required(),
                        media_type: Joi.string()
                            .valid(
                                ProjectMediaStatus.BANNER,
                                ProjectMediaStatus.PRODUCTIMAGE,
                                ProjectMediaStatus.PROJECT_ATTACHMENT,
                                ProjectMediaStatus.ISFEATURED
                            )
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
            project_media
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
            project_media
        });
        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.PROJECT_UPDATED
        );
    }
}
