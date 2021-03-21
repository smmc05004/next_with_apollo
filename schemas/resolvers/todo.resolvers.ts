const Todo = require("../../sqlz/models").Todo;
const User = require("../../sqlz/models").User;

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
