import { IUserRegister } from '../interface';
import EncryptionUtil from '../../../../utils/encrpytion.util';
import userRepository from '../../../../repository/user.repository';
import CryptoTokenService from '../../../../common/crypto.token.service';
import emailService from '../../../../common/email.service';

class UserService {
    async registerUser(data: IUserRegister) {
        data.password = await EncryptionUtil.hashData(data.password);
        const result = await userRepository.createOrUpdate(data);
        let user = result[0];
        await emailService.sendRegistrationEmail(data);
        return CryptoTokenService.makeToken(user, data.role);
    }

    async getUser(data) {
        const result = await userRepository.findUser(data);
        return result;
    }
    // get user with email
    async getUserFromEmail(email: string) {
        const result = await userRepository.findUser({ email: email });
        return result;
    }

    async updateUser(data: any) {
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
        if (!result) throw new Error('Failed to update admin profile');
        return result;
    }
}

export default new UserService();
