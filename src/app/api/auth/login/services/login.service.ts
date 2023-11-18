import EncryptionUtil from '../../../../utils/encrpytion.util';
import userRepository from '../../../../repository/user.repository';
import ValidationError from '../../../../../custom/validationErrors';
import { ErrorMessages } from '../../../../enums/ErrorMessages';
import CryptoTokenService from '../../../../common/crypto.token.service';
import { IUserLogin } from '../../user/interface';

class LoginService {
    async login({ email, password }: IUserLogin) {
        const user = await userRepository.findUser({
            email
        });
        if (!user) {
            throw new ValidationError(ErrorMessages.USER_DETAILS_NOT_FOUND);
        }
        const isPasswordMatch = await EncryptionUtil.comparePassword(
            password,
            user.password
        );
        if (!isPasswordMatch) {
            throw new ValidationError(ErrorMessages.USER_DETAILS_NOT_FOUND);
        }
        const type = user.role;
        return CryptoTokenService.makeToken(user, type);
    }
}

export default new LoginService();
