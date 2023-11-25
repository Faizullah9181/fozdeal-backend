import userRepository from '../../repository/user.repository';
import CryptoTokenService from '../../common/crypto.token.service';
import EncryptionUtil from '../../utils/encrpytion.util';

class AuthService {
    async getUserFromEmailAndRole(email) {
        return await userRepository.findUser({ email });
    }

    async generateForgotPasswordToken(user) {
        return CryptoTokenService.makeResetPasswordToken(
            user,
            'forgot_password'
        );
    }
    async resetPassword(user, password) {
        const encryptedPassword = await EncryptionUtil.hashData(password);
        const result = await userRepository.updateUser(
            { password: encryptedPassword },
            user.id
        );
        if (!result) throw new Error('Failed to reset password');
        return 'Password reset successfully';
    }
}

export default new AuthService();
