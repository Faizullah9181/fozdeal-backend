import userRepository from '../../repository/user.repository';

class AuthService {
    async getUserFromEmailAndRole(email) {
        return await userRepository.findUser({ email });
    }
}

export default new AuthService();
