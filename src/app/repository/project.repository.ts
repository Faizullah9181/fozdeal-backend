import CommonRepository from '../utils/common.repository';
import Project from '../models/projects.model';
import ProjectMedia from '../models/media.model';
class ProjectRepository extends CommonRepository {
    async createProject(data: any) {
        const result = await Project.create(data);
        return result;
    }

    async getProjectById(id: number) {
        const project = await Project.findOne({
            where: {
                id: id
            },

            include: [
                {
                    model: ProjectMedia,
                    as: 'project_media'
                }
            ]
        });

        return project;
    }

    async getAll(filter: any, limit: number, offset: number) {
        const result = await Project.findAndCountAll({
            where: {
                ...filter
            },
            limit: limit,
            offset: offset,
            include: [
                {
                    model: ProjectMedia,
                    as: 'project_media'
                }
            ],
            order: [['id', 'DESC']],
            distinct: true
        });
        return result;
    }

    async updateProject(data: any, filter: any) {
        const result = await Project.update(data, {
            where: {
                ...filter
            }
        });
        return result;
    }
}

export default new ProjectRepository();
