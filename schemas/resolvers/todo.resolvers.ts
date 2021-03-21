const Todo = require("../../models").Todo;
const User = require("../../models").User;

module.exports = {
  Query: {
    todos: async () => await getTodos(),
    todo: async () => await Todo.findOne({todo_id: 1, include: [{model: User, as: 'user'}]},)
  },
};

const getTodos = () => {
  const result = Todo.findAll();
  return result;
};

export {};
