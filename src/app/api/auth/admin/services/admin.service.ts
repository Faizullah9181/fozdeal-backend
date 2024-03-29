import userRepository from '../../../../repository/user.repository';

class AdminService {
    async getAdmin(data) {
        const result = await userRepository.findUser(data);
        return result;
    }

    async UpdateAdmin(data: any) {
        const user = await userRepository.findUser({ id: data.user_id });
        if (!user) throw new Error('No Users Found');
        const result = await userRepository.updateUser(
            {
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone,
                about: data.about,
                country_code: data.country_code,
                country: data.country,
                gender: data.gender
            },
            data.user_id
        );
        if (!result) throw new Error('Failed to update admin profile');
        return result;
    }
}

export default new AdminService();
