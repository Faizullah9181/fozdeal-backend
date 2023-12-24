import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey
} from 'sequelize-typescript';
import User from './user.model';

import { CONSULTATION_STATUS, SLOTS } from '../enums/ConsultationEnums';

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
        type: DataType.INTEGER,
        allowNull: false
    })
    fees: number;

    @Column({
        type: DataType.ARRAY(DataType.INTEGER),
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
        type: DataType.INTEGER,
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
