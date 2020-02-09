import { CS } from './cs'
import {Table, Column, Model, HasMany, DataType, ForeignKey} from 'sequelize-typescript';


@Table
export class Skill extends Model<Skill>
{
    @Column( {primaryKey: true, type: DataType.INTEGER, autoIncrement: true} )
    id!: number;

    @Column( DataType.TEXT )
    name! : string;

    @Column( DataType.INTEGER )
    skill_type! : number; //enum SKILL_TYPE

    @Column( DataType.INTEGER )
    target_arrange! : number; // TARGET ARRANGE

    // CS 효과 명시.
    @ForeignKey(() => CS )
    @Column( DataType.TEXT )
    cs_key! : string;

    @Column(DataType.INTEGER)
    cs_timing! : number;

    @Column(DataType.INTEGER)
    cs_active_turn!: number; // CS 적용 턴

    @Column(DataType.FLOAT)
    cs_active_rate! : number; // CS 적용 확률.
    // 명시 끝.

    // 자원 소모 명시
    @Column(DataType.INTEGER)
    cooltime! : number;

    @Column(DataType.INTEGER)
    use_ap! : number;

    @Column(DataType.INTEGER)
    use_hp! : number;
    // 명시 끝.

    @Column( DataType.INTEGER )
    damage! : number; // 마이너스면 힐.

}