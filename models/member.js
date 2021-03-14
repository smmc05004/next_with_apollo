"use strict";
const { Model, Sequelize } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class Member extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       this.hasMany(models.post);
//     }
//   }
//   Member.init(
//     {
//       firstName: DataTypes.STRING,
//       lastName: DataTypes.STRING,
//     },
//     {
//       sequelize,
//       modelName: "Member",
//       timestamps: false,
//       paranoid: false,
//       tableName: "member"
//     }
//   );
//   return Member;
// };

module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define(
    "member",
    {
      member_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
    },
    {
      sequelize,
      modelName: "Member",
      timestamps: false,
      tableName: "member"
    }
  )

  Member.associate = function (models) {
    Member.hasMany(models.todo, {
      foreignKey: "member_id",
      sourceKey: "member_id"
    })
  }
  
  return Member;
};
