import { StatusCodes } from '../../../enums/StatusCode';
import { SuccessMessages } from '../../../enums/SuccessMessages';
import ProjectService from '../services/project.service';
import { CategoryStatus } from '../../../enums/Category';
import { ProjectLevel } from '../../../enums/ProjectLevel';
import { ProjectMediaStatus } from '../../../enums/ProjectMediaStatus';
import { SubCategoryStatus } from '../../../enums/Category';
import { GeoStatus } from '../../../enums/GeoStatus';
import { ProjectSizeStatus } from '../../../enums/ProjectSizeStatus';
import emailService from '../../../common/email.service';

const {
    MasterController,
    Joi,
    RequestBuilder
} = require('@orca/base-packages');

export default class CreateProjectController extends MasterController {
    static doc() {
        return {
            tags: ['Project'],
            description: 'Create Project',
            summary: 'create project for investor as entrepreneur'
        };
    }

    static secured() {
        return false;
    }

    static validate() {
        const payload = new RequestBuilder();
        payload.addToBody(
            Joi.object().keys({
                project_name: Joi.string().required(),
                project_description: Joi.string().required(),
                project_gist: Joi.string().required(),
                project_level: Joi.valid(
                    ...Object.values(ProjectLevel)
                ).required(),
                project_category: Joi.string()
                    .valid(...Object.values(CategoryStatus))
                    .required(),
                project_sub_category: Joi.string()
                    .valid(...Object.values(SubCategoryStatus))
                    .required(),
                project_geo_location: Joi.string()
                    .valid(...Object.values(GeoStatus))
                    .required(),
                project_size: Joi.string()
                    .valid(...Object.values(ProjectSizeStatus))
                    .required(),
                project_media: Joi.array().items(
                    Joi.object().keys({
                        url: Joi.string().required(),
                        media_type: Joi.string()
                            .valid(...Object.values(ProjectMediaStatus))
                            .required()
                    })
                ),
                language: Joi.string().valid('en', 'ar').required()
            })
        );
        return payload;
    }

    async controller() {
        const {
            user,
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

        if (user.role !== 'entrepreneur')
            throw new Error('Only entrepreneur can create project');

        const response = await ProjectService.createProject({
            user_id: user.id,
            project_name,
            project_description,
            project_gist,
            project_level,
            project_category,
            project_media,
            project_sub_category,
            project_geo_location,
            project_size
        });
        if (response) {
            const emailData = {
                name: user.first_name,
                email: user.email
            };

            await emailService.sendProductUploadEmail(emailData);
        }
        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.PROJECT_CREATED
        );
    }
}
