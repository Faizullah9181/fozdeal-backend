import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany
} from 'sequelize-typescript';
import { ProjectStatus } from '../enums/ProjectStatus';
import { ProjectLevel } from '../enums/ProjectLevel';
import { CategoryStatus } from '../enums/Category';
import User from './user.model';
import ProjectMedia from './media.model';

@Table
export default class Project extends Model<Project> {
    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    uuid: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        unique: false,
        allowNull: false
    })
    createdBy: number;

    @Column({
        type: DataType.ENUM,
        values: Object.values(ProjectStatus),
        allowNull: false
    })
    project_status: ProjectStatus;

    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    project_name: string;

    @Column({
        type: DataType.STRING(5000),
        allowNull: false
    })
    project_description: string;

    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    project_gist: string;

    @Column({
        type: DataType.ENUM,
        values: Object.values(ProjectLevel),
        allowNull: false
    })
    project_level: ProjectLevel;

    @Column({
        type: DataType.ENUM,
        values: Object.values(CategoryStatus),
        allowNull: false
    })
    project_category: CategoryStatus;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: 1
    })
    isActive: number;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => ProjectMedia)
    project_media: ProjectMedia[];
}
