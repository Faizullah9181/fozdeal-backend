import userRepository from '../../../../repository/user.repository';

class AdminService {
    async getAdmin(data) {
        const result = await userRepository.findUser(data);
        return result;
    }
}

export default new AdminService();
