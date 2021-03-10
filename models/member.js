"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    get fullName() {
      console.log("get full name: ");
    }
  }
  Member.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Member",
      timestamps: false,
      paranoid: false,
    }
  );
  return Member;
};

// module.exports = (sequelize, DataTypes) => {
//   return sequelize.define(
//     "Member",
//     {
//       firstName: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//       },
//       lastName: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//       },
//     },
//     {
//       timestamp: false,
//     }
//   );
// };
