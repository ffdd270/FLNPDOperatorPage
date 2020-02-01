import {Table, Column, Model, HasMany, DataType} from 'sequelize-typescript';

@Table
export class User extends Model<User>
{
    @Column( {primaryKey: true, type: DataType.TEXT} )
    id! : string;

    @Column(DataType.TEXT)
    name! : string;

    @Column( { type: DataType.TEXT, comment: "SHA512 Value." } )
    password! : string;

    @Column( { type: DataType.TEXT, comment: "Account Permission. Is Admin or User?" })
    permission! : string;

    @Column(DataType.DATE)
    create_time! : Date;
}
