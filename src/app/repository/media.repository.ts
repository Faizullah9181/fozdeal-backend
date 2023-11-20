import CommonRepository from '../utils/common.repository';
import ProjectMedia from '../models/media.model';
class ProjectMediaRepository extends CommonRepository {
    async createProjectMedia(data: any) {
        const result = await ProjectMedia.create(data);
        return result;
    }
}

export default new ProjectMediaRepository();
