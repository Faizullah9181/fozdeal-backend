import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';
import User from './user.model';
import Project from './projects.model';

@Table
export default class Transaction extends Model<Transaction> {
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        unique: false,
        allowNull: false
    })
    user_id: number;

    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false
    })
    order_id: string;

    @ForeignKey(() => Project)
    @Column({
        type: DataType.INTEGER,
        unique: false,
        allowNull: false
    })
    project_id: number;

    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: false
    })
    status: string;

    //associations
    @BelongsTo(() => User)
    user: User;
}
