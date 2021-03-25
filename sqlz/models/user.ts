// "use strict";
// const { Model, Sequelize } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       this.hasMany(models.Todo, {foreignKey: 'user_num', sourceKey:'user_num'});
//     }
//   }
//   User.init(
//     {
//         user_num: {
//             allowNull: false,
//             autoIncrement: true,
//             primaryKey: true,
//             type: DataTypes.INTEGER
//         },
//         user_id: DataTypes.STRING,
//         user_name: DataTypes.STRING,
//     },
//     {
//       sequelize,
//       modelName: "User",
//       timestamps: false,
//       tableName: "user"
//     }
//   );
//   return User;
// };

// module.exports = (sequelize, DataTypes) => {
//   const Member = sequelize.define(
//     "member",
//     {
//       member_id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//       },
//       firstName: Sequelize.STRING,
//       lastName: Sequelize.STRING,
//     },
//     {
//       sequelize,
//       modelName: "Member",
//       timestamps: false,
//       tableName: "member"
//     }
//   )

//   Member.associate = function (models) {
//     Member.hasMany(models.todo, {
//       foreignKey: "member_id",
//       sourceKey: "member_id"
//     })
//   }

//   return Member;
// };

import {
  Table,
  Column,
  Model,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";
import { Todo } from "./todo";

// column error because typescript 2.7.2 included a strict class checking
// constructor가 없으면 각 column들에서 타입 에러 발생
@Table({
  tableName: "user",
  timestamps: false,
})
export class User extends Model {
  // constructor(user_id: string, user_name: string, user_num: number) {
  //   super();

  //   this.user_id = user_id;
  //   this.user_name = user_name;
  //   this.user_num = user_num;
  // }
  @Column
  user_id!: string;

  @Column
  user_name!: string;

  @Column({ primaryKey: true })
  @ForeignKey(() => Todo)
  user_num!: number;
  // @HasMany(() => Todo, ForeignKey: "user_num")
  // todos?: Todo[];

  @HasMany(() => Todo, "user_num")
  todos?: Todo[];
}
