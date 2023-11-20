import ValidationError from '../../../../custom/validationErrors';
import projectRepository from '../../../repository/project.repository';
import projectMediaRepository from '../../../repository/media.repository';
import { v4 as uuidv4 } from 'uuid';

class ProjectService {
    async createProject(data: any) {
        const projectUUid = data.user_id + '-' + uuidv4();
        const result = await projectRepository.createProject({
            uuid: projectUUid,
            createdBy: data.user_id,
            project_status: 'pending',
            project_name: data.project_name,
            project_description: data.project_description,
            project_gist: data.project_gist,
            project_level: data.project_level,
            project_category: data.project_category,
            isActive: 0
        });

        if (!result) throw new ValidationError('Failed to create project');

        const { id } = result;

        const projectMedia = data.project_media.map((media: any) => {
            return {
                project_id: id,
                url: media.url,
                media_type: media.media_type,
                user_id: data.user_id
            };
        });

        for (let i = 0; i < projectMedia.length; i++) {
            const projectMediaResult =
                await projectMediaRepository.createProjectMedia(
                    projectMedia[i]
                );
            if (!projectMediaResult)
                throw new ValidationError('Failed to create project media');
        }

        const project = await projectRepository.getProjectById(id);

        return project;
    }
}

export default new ProjectService();
