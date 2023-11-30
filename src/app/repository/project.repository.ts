import CommonRepository from '../utils/common.repository';
import Project from '../models/projects.model';
import ProjectMedia from '../models/media.model';
import Transaction from '../models/transactions';
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

    async getAll(filter: any, limit: number, offset: number, user_id: number) {
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
                },
                {
                    model: Transaction,
                    as: 'transactions',

                    where: {
                        ...(user_id !== 0 && { user_id: user_id })
                    },
                    required: false
                }
            ],
            order: [['id', 'DESC']],
            distinct: true
        });
        return result;
    }

    async getAllInvestment(filter: any, limit: number, offset: number) {
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

    async getProjectData() {
        const totalProjectsPromise = Project.count();

        const approvedProjectsPromise = Project.count({
            where: {
                project_status: 'approved'
            }
        });

        const pendingProjectsPromise = Project.count({
            where: {
                project_status: 'pending'
            }
        });

        const rejectedProjectsPromise = Project.count({
            where: {
                project_status: 'rejected'
            }
        });

        const modificationRequestedProjectsPromise = Project.count({
            where: {
                project_status: 'modification_required'
            }
        });

        const [
            totalProjects,
            approvedProjects,
            pendingProjects,
            rejectedProjects,
            modificationRequestedProjects
        ] = await Promise.all([
            totalProjectsPromise,
            approvedProjectsPromise,
            pendingProjectsPromise,
            rejectedProjectsPromise,
            modificationRequestedProjectsPromise
        ]);

        return {
            total_projects: totalProjects,
            approved_projects: approvedProjects,
            pending_projects: pendingProjects,
            rejected_projects: rejectedProjects,
            modification_requested_projects: modificationRequestedProjects
        };
    }
}

export default new ProjectRepository();
