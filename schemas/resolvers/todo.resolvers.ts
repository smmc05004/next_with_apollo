const Todo = require("../../models").todo;

module.exports = {
  Query: {
    todos: async () => await getTodos(),
  },
};

const getTodos = () => {
  const result = Todo.findAll();
  return result;
};

export {};
