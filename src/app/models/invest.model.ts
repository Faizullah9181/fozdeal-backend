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
export default class Invest extends Model<Invest> {
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        unique: false,
        allowNull: false
    })
    user_id: number;

    @ForeignKey(() => Project)
    @Column({
        type: DataType.INTEGER,
        unique: false,
        allowNull: false
    })
    project_id: number;

    //associations
    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Project)
    project: Project;
}
