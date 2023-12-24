import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Roles } from '../enums/Roles';

@Table
export default class User extends Model<User> {
    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    first_name: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    last_name: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    country_code: number;

    @Column({
        type: DataType.STRING(50),
        allowNull: true
    })
    country: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
        unique: true
    })
    phone: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        unique: true
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    about: string;

    @Column({
        type: DataType.ENUM,
        values: Object.values(Roles),
        allowNull: true
    })
    role: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    password: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: 0
    })
    is_subscribe: 0;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    subscription_started_at: string;

    @Column({
        type: DataType.ENUM,
        values: ['male', 'female'],
        allowNull: true
    })
    gender: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: 1
    })
    isActive: number;

    //association
}
