// 스킬 효과등을 명시해 놓는 곳.
import {Table, Column, Model, HasMany, DataType, ForeignKey} from 'sequelize-typescript';

@Table
export class CS extends Model<CS>
{
    @Column({primaryKey: true, type: DataType.TEXT})
    id!: string; // id

    @Column(DataType.TEXT)
    name!: string; // 이름

    @Column(DataType.TEXT)
    desc!: string; // 설명

    @Column(DataType.INTEGER)
    cs_type!: number; // 버프? 디버프?
}
