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
import { ProjectMediaStatus } from '../enums/ProjectMediaStatus';

@Table
export default class ProjectMedia extends Model<ProjectMedia> {
    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    image_url: string;

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

    @Column({
        type: DataType.ENUM,
        values: Object.values(ProjectMediaStatus),
        allowNull: false
    })
    media_type: ProjectMediaStatus;

    @BelongsTo(() => User)
    user: User;
}
