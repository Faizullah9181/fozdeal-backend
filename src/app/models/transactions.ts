import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';
import Invest from './invest.table';
import User from './user.model';

@Table
export default class Transaction extends Model<Transaction> {
    @ForeignKey(() => Invest)
    @Column({
        type: DataType.INTEGER,
        unique: false,
        allowNull: false
    })
    invest_id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        unique: false,
        allowNull: false
    })
    user_id: number;

    //associations
    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Invest)
    invest: Invest;
}
