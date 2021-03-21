"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: 'user_num', targetKey: 'user_num', as: 'user'})
    }
  }
  Todo.init(
    {
      todo_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      todo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Todo",
      timestamps: false,
      paranoid: false,
      tableName: "todo"
    }
  );
  return Todo;
};