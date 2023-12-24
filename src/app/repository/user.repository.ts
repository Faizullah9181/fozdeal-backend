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

    async getAllUsers(filters: any, limit: number, offset: number) {
        const user = await User.findAndCountAll({
            where: {
                ...filters
            },
            limit,
            offset,
            order: [['createdAt', 'DESC']],
            distinct: true
        });

        const investorCountPromise = User.count({
            where: {
                role: 'investor'
            }
        });

        const entrepreneurCountPromise = User.count({
            where: {
                role: 'entrepreneur'
            }
        });

        const adminCountPromise = User.count({
            where: {
                role: 'admin'
            }
        });

        const [investorCount, entrepreneurCount, adminCount] =
            await Promise.all([
                investorCountPromise,
                entrepreneurCountPromise,
                adminCountPromise
            ]);

        return {
            user,
            invetsor_count: investorCount,
            entrepreneur_count: entrepreneurCount,
            admin_count: adminCount
        };
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
                'country_code',
                'country'
            ]
        });
    }
}

export default new UserRepository();
