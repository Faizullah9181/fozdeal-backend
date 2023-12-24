/*import { IUserRegister } from '../interface';
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
        const result = await userRepository.findUser({ email });
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
*/
/*
@Table
export default class Consultant extends Model<Consultant> {
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        unique: true
    })
    user_id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name_ar: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    image: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    resume: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description_ar: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title_ar: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    phone: string;

    @Column({
        type: DataType.NUMBER,
        allowNull: false
    })
    fees: number;

    @Column({
        type: DataType.ARRAY(DataType.NUMBER),
        defaultValue: [
            SLOTS.THIRTY,
            SLOTS.SIXTY,
            SLOTS.NINETY,
            SLOTS.ONE_TWENTY
        ]
    })
    type_of_slots: SLOTS[];

    @Column({
        type: DataType.JSON,
        allowNull: false
    })
    default_timings: {
        start_time: string;
        end_time: string;
    };

    @Column({
        type: DataType.ENUM(...Object.values(CONSULTATION_STATUS)),
        defaultValue: CONSULTATION_STATUS.PENDING
    })
    status: CONSULTATION_STATUS;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    isTeam: boolean;

    @Column({
        type: DataType.NUMBER,
        defaultValue: 0
    })
    order: number;

    // add colums for website
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    website: string;

    // coloum for social media links
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    facebook: string;
    // linkedin
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    linkedin: string;
    // twitter
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    twitter: string;

    // Add timestamps automatically
    createdAt: Date;
    updatedAt: Date;
}
 */

import Consultant from '../models/consultant.modal';
import CommonRepository from '../utils/common.repository';

//
class ConsultantRepository extends CommonRepository {
    //  funtion to change isTeam to false for all the consultants
    async updateAllIsTeamTofalse() {
        return Consultant.update({ isTeam: false }, { where: {} });
    }
    // creeate consulatanet with user_id= user.id
    async createConsultant(data) {
        return Consultant.create(data);
    }
    // get consultant by user id
    async getConsultant(filter: {}) {
        return Consultant.findOne({ where: filter });
    }
}

export default new ConsultantRepository();
