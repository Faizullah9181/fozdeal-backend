import { StatusCodes } from '../../../enums/StatusCode';
import { SuccessMessages } from '../../../enums/SuccessMessages';
import ProjectService from '../services/project.service';
import ValidationError from '../../../../custom/validationErrors';
import GridEmailService from '../../../common/emal.service';
import userRepository from '../../../repository/user.repository';

const {
    MasterController,
    Joi,
    RequestBuilder
} = require('@orca/base-packages');

export default class VerifyProjectController extends MasterController {
    static doc() {
        return {
            tags: ['Project'],
            description: 'verify Project',
            summary: 'verify project'
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
                project_status: Joi.string().valid(
                    'approved',
                    'rejected',
                    'modification_required'
                )
            })
        );
        return payload;
    }

    async controller() {
        const { user, project_id, project_status } = this.data;

        const project = await ProjectService.getProjectById(project_id);

        if (!project) {
            throw new ValidationError('Project not found');
        }

        if (user.role !== 'super-admin' && user.role !== 'admin') {
            throw new ValidationError(
                'You are not authorized to perform this action'
            );
        }

        const response = await ProjectService.verifyProject({
            user_id: user.id,
            project_id,
            project_status
        });

        if (response === 1) {
            //send email to user
            const user = await userRepository.findUser({
                id: project.createdBy
            });

            const emailData = {
                email: user.email,
                name: user.first_name,
                project_name: project.project_name,
                project_status: project_status
            };

            const response = await GridEmailService.sendProjectStatusEmail(
                emailData
            );

            if (!response) {
                throw new ValidationError(
                    'Failed to send email but project status updated successfully'
                );
            }
        }

        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            'Project status updated successfully',
            SuccessMessages.PROJECT_STATUS_UPDATED
        );
    }
}
