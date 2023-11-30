import EncryptionUtil from '../../../../utils/encrpytion.util';
import userRepository from '../../../../repository/user.repository';
import CryptoTokenService from '../../../../common/crypto.token.service';

class SuperAdminService {
    async createAdmin(data: any) {
        data.password = await EncryptionUtil.hashData(data.password);
        const result = await userRepository.createOrUpdate(data);
        let superAdmin = result[0];
        return CryptoTokenService.makeToken(superAdmin, data.role);
    }

    async getSuperAdmin(data) {
        const result = await userRepository.findUser(data);
        return result;
    }

    async getAllUsers(data: any, limit: number, offset: number) {
        const role_filter = data?.role;
        const gender_filter = data?.gender;
        const status_filter = data?.status;

        const filters = {};

        if (role_filter) {
            filters['role'] = role_filter;
        } else {
            filters['role'] = ['admin', 'entrepreneur', 'investor'];
        }

        if (gender_filter) {
            filters['gender'] = gender_filter;
        }

        if (status_filter) {
            filters['isActive'] = status_filter === 'active' ? 1 : 0;
        }

        console.log('filters', filters);

        const result = await userRepository.getAllUsers(filters, limit, offset);

        if (!result) throw new Error('No Users Found');

        return result;
    }

    async UpdateActivation(data: any) {
        const user = await userRepository.findUser({ id: data.user_id });
        if (!user) throw new Error('No Users Found');
        let result: any;
        if (data.activation_status === 'active') {
            result = await userRepository.UpdateActivation(data, 1);
        } else {
            result = await userRepository.UpdateActivation(data, 0);
        }
        if (!result)
            throw new Error('Failed to cahnged actvation status of a  user');
        return result;
    }

    async UpdateSuperAdmin(data: any) {
        const user = await userRepository.findUser({ id: data.user_id });
        if (!user) throw new Error('No Users Found');
        const result = await userRepository.updateUser(
            {
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone,
                about: data.about,
                country_code: data.country_code,
                gender: data.gender
            },
            data.user_id
        );
        if (!result) throw new Error('Failed to update super admin profile');
        return result;
    }
}

export default new SuperAdminService();
