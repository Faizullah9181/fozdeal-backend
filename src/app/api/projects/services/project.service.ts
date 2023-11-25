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

    async getAllProjects(data: any) {
        const level_filter = data?.filter?.project_level;
        const category_filter = data?.filter?.project_category;
        const status_filter = data?.filter?.project_status;

        const filters = {};
        if (level_filter) {
            filters['project_level'] = level_filter;
        }
        if (category_filter) {
            filters['project_category'] = category_filter;
        }

        if (status_filter) {
            filters['project_status'] = status_filter;
        }

        const result = await projectRepository.getAll(
            filters,
            data.limit,
            data.offset
        );
        return result;
    }

    async getAllProjectsForInvestment(data: any) {
        const level_filter = data?.filter?.project_level;
        const category_filter = data?.filter?.project_category;
        const status_filter = data?.filter?.project_status;

        const filters = {};
        if (level_filter) {
            filters['project_level'] = level_filter;
        }
        if (category_filter) {
            filters['project_category'] = category_filter;
        }

        if (status_filter) {
            filters['project_status'] = status_filter;
        }

        filters['isActive'] = 1;

        const result = await projectRepository.getAll(
            filters,
            data.limit,
            data.offset
        );
        return result;
    }

    async getAllProjectsForUsers(data: any) {
        const level_filter = data?.filter?.project_level;
        const category_filter = data?.filter?.project_category;
        const status_filter = data?.filter?.project_status;

        const filters = {};
        if (level_filter) {
            filters['project_level'] = level_filter;
        }
        if (category_filter) {
            filters['project_category'] = category_filter;
        }

        if (status_filter) {
            filters['project_status'] = status_filter;
        }

        filters['createdBy'] = data.user_id;

        const result = await projectRepository.getAll(
            filters,
            data.limit,
            data.offset
        );
        return result;
    }

    async getProjectById(id: number) {
        const result = await projectRepository.getProjectById(id);
        return result;
    }

    async updateProject(data: any) {
        const result = await projectRepository.updateProject(
            {
                project_name: data.project_name,
                project_description: data.project_description,
                project_gist: data.project_gist,
                project_level: data.project_level,
                project_category: data.project_category,
                project_status: 'pending'
            },
            { id: data.project_id }
        );
        if (!result) throw new ValidationError('Failed to update project');
        return 'Project updated successfully';
    }
    async verifyProject(data: any) {
        const result = await projectRepository.updateProject(
            {
                project_status: data.project_status
            },
            { id: data.project_id }
        );
        if (!result) throw new ValidationError('Failed to update project');
        return 1;
    }
}

export default new ProjectService();
