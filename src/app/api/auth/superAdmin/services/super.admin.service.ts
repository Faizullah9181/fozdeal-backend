import EncryptionUtil from '../../../../utils/encrpytion.util';
import userRepository from '../../../../repository/user.repository';
import CryptoTokenService from '../../../../common/crypto.token.service';

class SuperAdminService {
    async createAdmin(data: any) {
        data.password = await EncryptionUtil.hashData(data.password);
        const result = await userRepository.createOrUpdate(data);
        let superAdmin = result[0];
        return CryptoTokenService.makeToken(superAdmin, 'admin');
    }

    async getSuperAdmin(data) {
        const result = await userRepository.findUser(data);
        return result;
    }
}

export default new SuperAdminService();
