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

    async getAllUsers() {
        const result = await userRepository.getAllUsers();

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
                country_code: data.country_code
            },
            data.user_id
        );
        if (!result) throw new Error('Failed to update super admin profile');
        return result;
    }
}

export default new SuperAdminService();
