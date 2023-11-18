import CommonRepository from '../utils/common.repository';
import User from '../models/user.model';
import { IUserRegister } from '../api/auth/superAdmin/interface';

class UserRepository extends CommonRepository {
    async findUser(filter: {}, projection?: {}) {
        return User.findOne({
            where: filter,
            include: projection
        });
    }

    async createOrUpdate(data: IUserRegister) {
        return User.upsert(data, {
            returning: true
        });
    }

    async getAllUsers() {
        return User.findAll({
            where: {
                role: ['admin', 'entrepreneur', 'investor']
            }
        });
    }

    async UpdateActivation(data: any, actiVationStatus: number) {
        return User.update(
            { isActive: actiVationStatus },
            {
                where: {
                    id: data.user_id
                }
            }
        );
    }
}

export default new UserRepository();
