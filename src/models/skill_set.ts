import {Skill} from './skill';
import {Table, Column, Model, HasMany, DataType, ForeignKey} from 'sequelize-typescript';

@Table
export class SkillSet extends Model<SkillSet>
{
    @Column( {primaryKey: true, type: DataType.INTEGER, autoIncrement: true} )
    id! : number;

    @Column(DataType.TEXT)
    skill_set_name! : string;

    @ForeignKey(()=> Skill )
    @Column
    skill_id1! : number;

    @ForeignKey(()=> Skill )
    @Column
    skill_id2! : number;

    @ForeignKey(()=> Skill )
    @Column
    skill_id3! : number;
}