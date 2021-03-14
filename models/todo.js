"use strict";
const { Model, Sequelize } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class Todo extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       this.belongsTo(models.member, {foreignKey: 'member_id'})
//     }
//   }
//   Todo.init(
//     {
//       todo: DataTypes.STRING,
//     },
//     {
//       sequelize,
//       modelName: "Todo",
//       timestamps: false,
//       paranoid: false,
//       tableName: "todo"
//     }
//   );
//   return Todo;
// };

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "todo",
    {
      todo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      todo: Sequelize.STRING,
      member_id: Sequelize.INTEGER
    }, {
      sequelize,
      modelName: "Todo",
      timestamps: false,
      paranoid: false,
      tableName: "todo"
    }
  )

  Todo.associate = function (models) {
    Todo.belongsTo(models.member, {
      foreignKey: "member_id",
      targetKey: "member_id"
    })
  }

  return Todo;
}