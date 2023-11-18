import { IUserRegister } from '../interface';
import EncryptionUtil from '../../../../utils/encrpytion.util';
import userRepository from '../../../../repository/user.repository';
import CryptoTokenService from '../../../../common/crypto.token.service';

class UserService {
    async registerUser(data: IUserRegister) {
        data.password = await EncryptionUtil.hashData(data.password);
        const result = await userRepository.createOrUpdate(data);
        let user = result[0];
        return CryptoTokenService.makeToken(user, data.role);
    }
}

export default new UserService();
