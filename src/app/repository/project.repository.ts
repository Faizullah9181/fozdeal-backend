import CommonRepository from '../utils/common.repository';
import Project from '../models/projects.model';
import ProjectMedia from '../models/media.model';
class ProjectRepository extends CommonRepository {
    async createProject(data: any) {
        const result = await Project.create(data);
        return result;
    }

    async getProjectById(id: number) {
        return Project.findOne({
            where: {
                id: id
            },
            attributes: [
                'id',
                'uuid',
                'project_name',
                'project_description',
                'project_gist',
                'project_level',
                'project_category',
                'project_status',
                'isActive'
            ],
            include: [
                {
                    model: ProjectMedia,
                    as: 'project_media'
                }
            ]
        });
    }

    async getAll(filter: any, limit: number, offset: number) {
        const result = await Project.findAndCountAll({
            where: {
                ...filter
            },
            limit: limit,
            offset: offset,
            attributes: [
                'id',
                'uuid',
                'project_name',
                'project_description',
                'project_gist',
                'project_level',
                'project_category',
                'project_status',
                'isActive'
            ],
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
}

export default new ProjectRepository();
