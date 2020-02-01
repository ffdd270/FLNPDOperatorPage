import {Table, Column, Model, HasMany, DataType} from 'sequelize-typescript';

@Table
export class ModelExample extends  Model<ModelExample>
{
    @Column( {primaryKey: true, type: DataType.INTEGER} )
    id! : number;

    @Column(DataType.TEXT)
    name! : string;

    @Column(DataType.INTEGER)
    age! : number;

    @Column(DataType.DATE)
    create_time! : Date;
}
