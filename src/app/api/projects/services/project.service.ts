import ValidationError from '../../../../custom/validationErrors';
import projectRepository from '../../../repository/project.repository';
import projectMediaRepository from '../../../repository/media.repository';
import transactionRepository from '../../../repository/transaction.repository';
import { v4 as uuidv4 } from 'uuid';
import investmentRepository from '../../../repository/investment.repository';
import userRepository from '../../../repository/user.repository';

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
            project_sub_category: data.project_sub_category,
            project_geo_location: data.project_geo_location,
            project_size: data.project_size,
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

        const order_id = Math.floor(100000 + Math.random() * 900000);

        await transactionRepository.createTransaction({
            user_id: data.user_id,
            order_id: order_id,
            project_id: id,
            status: 'pending'
        });

        const response = {
            order_id: order_id
        };

        console.log(order_id);

        return response;
    }

    async getAllProjects(data: any) {
        const level_filter = data?.filter?.project_level;
        const category_filter = data?.filter?.project_category;
        const status_filter = data?.filter?.project_status;
        const sub_category_filter = data?.filter?.project_sub_category;
        const geo_location_filter = data?.filter?.project_geo_location;
        const size_filter = data?.filter?.project_size;

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

        if (sub_category_filter) {
            filters['project_sub_category'] = sub_category_filter;
        }

        if (geo_location_filter) {
            filters['project_geo_location'] = geo_location_filter;
        }

        if (size_filter) {
            filters['project_size'] = size_filter;
        }

        const result = await projectRepository.getAll(
            filters,
            data.limit,
            data.offset,
            0
        );
        return result;
    }

    async getAllProjectsForInvestment(data: any) {
        const level_filter = data?.filter?.project_level;
        const category_filter = data?.filter?.project_category;
        const status_filter = data?.filter?.project_status;
        const sub_category_filter = data?.filter?.project_sub_category;
        const geo_location_filter = data?.filter?.project_geo_location;
        const size_filter = data?.filter?.project_size;

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

        if (sub_category_filter) {
            filters['project_sub_category'] = sub_category_filter;
        }

        if (geo_location_filter) {
            filters['project_geo_location'] = geo_location_filter;
        }

        if (size_filter) {
            filters['project_size'] = size_filter;
        }

        filters['isActive'] = 1;

        const result = await projectRepository.getAllInvestment(
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
        const sub_category_filter = data?.filter?.project_sub_category;
        const geo_location_filter = data?.filter?.project_geo_location;
        const size_filter = data?.filter?.project_size;

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

        if (sub_category_filter) {
            filters['project_sub_category'] = sub_category_filter;
        }

        if (geo_location_filter) {
            filters['project_geo_location'] = geo_location_filter;
        }

        if (size_filter) {
            filters['project_size'] = size_filter;
        }

        filters['createdBy'] = data.user_id;

        const result = await projectRepository.getAll(
            filters,
            data.limit,
            data.offset,
            data.user_id
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
                project_status: 'pending',
                project_sub_category: data.project_sub_category,
                project_geo_location: data.project_geo_location,
                project_size: data.project_size,
                isActive: 0
            },
            { id: data.project_id }
        );
        if (!result) throw new ValidationError('Failed to update project');
        return 'Project updated successfully';
    }
    async verifyProject(data: any) {
        const result = await projectRepository.updateProject(
            {
                project_status: data.project_status,
                isActive: data.project_status === 'approved' ? 1 : 0
            },
            { id: data.project_id }
        );
        if (!result) throw new ValidationError('Failed to update project');
        return 1;
    }

    async createInvestment(data: any) {
        const result = await investmentRepository.createInvestment(data);
        const order_id = Math.floor(100000 + Math.random() * 900000);
        if (!result) throw new ValidationError('Failed to create investment');
        else {
            await transactionRepository.createTransaction({
                user_id: data.user_id,
                order_id: order_id,
                project_id: data.project_id,
                status: 'pending'
            });
        }
        return { order_id: order_id };
    }

    async getAllProjectsForInvestors(data: any) {
        const level_filter = data?.filter?.project_level;
        const category_filter = data?.filter?.project_category;
        const status_filter = data?.filter?.project_status;
        const sub_category_filter = data?.filter?.project_sub_category;
        const geo_location_filter = data?.filter?.project_geo_location;
        const size_filter = data?.filter?.project_size;

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

        if (sub_category_filter) {
            filters['project_sub_category'] = sub_category_filter;
        }

        if (geo_location_filter) {
            filters['project_geo_location'] = geo_location_filter;
        }

        if (size_filter) {
            filters['project_size'] = size_filter;
        }

        filters['isActive'] = 1;

        const user = await userRepository.findUser({
            id: data.user_id
        });

        const isPremium: Number = user.is_subscribe;

        if (isPremium === 1) {
            const result = await projectRepository.getAll(
                filters,
                data.limit,
                data.offset,
                data.user_id
            );

            return result;
        }

        const investorProjects = await investmentRepository.getAll({
            user_id: data.user_id
        });

        const ids = investorProjects.map((project: any) => {
            return project.project_id;
        });

        filters['id'] = ids;

        const result = await projectRepository.getAll(
            filters,
            data.limit,
            data.offset,
            data.user_id
        );

        return result;
    }

    async getDetailForEnterprenuer(data: any) {
        if (data.is_subscribe === 1) {
            const premium_project = await projectRepository.getProjectById(
                data.project_id
            );

            if (!premium_project)
                throw new ValidationError('Project not found');

            const user = await userRepository.findUser({
                id: premium_project.createdBy
            });

            return user;
        } else {
            const result = await transactionRepository.getOne({
                project_id: data.project_id,
                user_id: data.user_id,
                status: 'paid'
            });

            if (!result)
                throw new ValidationError(
                    'you are not allowed to view details'
                );

            const project = await projectRepository.getProjectById(
                data.project_id
            );

            if (!project) throw new ValidationError('Project not found');

            if (result) {
                const user = await userRepository.findUser({
                    id: project.createdBy
                });

                return user;
            } else {
                throw new ValidationError(
                    'you are not allowed to view details'
                );
            }
        }
    }

    async getProjectData() {
        const result = await projectRepository.getProjectData();

        if (!result) throw new ValidationError('Project not found');

        return result;
    }
}

export default new ProjectService();
