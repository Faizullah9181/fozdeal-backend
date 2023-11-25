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

    async getAllUsers(filters: {}, limit: number, offset: number) {
        return User.findAll({
            where: {
                ...filters
            },
            limit,
            offset
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

    async updateUser(data: any, filter?: any) {
        await User.update(data, {
            where: {
                id: filter
            }
        });

        return User.findOne({
            where: {
                id: filter
            },
            attributes: [
                'first_name',
                'last_name',
                'phone',
                'about',
                'country_code'
            ]
        });
    }
}

export default new UserRepository();
