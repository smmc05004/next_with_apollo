"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Todo, {foreignKey: 'user_num', sourceKey:'user_num'});
    }
  }
  User.init(
    {
        user_num: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        user_id: DataTypes.STRING,
        user_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false,
      tableName: "user"
    }
  );
  return User;
};

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
