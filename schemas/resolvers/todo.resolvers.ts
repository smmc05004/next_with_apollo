const models = require("../../sqlz/models");
const { Todo, User } = models.default.models;
// import Todo from "../../sqlz/models/todo.model";
// import User from "../../sqlz/models/user.model";

interface Props {
  todo_id: number;
}

module.exports = {
  Query: {
    todos: async () => await getTodos(),
    // 쿼리가 받는 파라미터 순서
    // obj => undefined, { todo_id } => 쿼리에서 전달받은 파라미터 ,{ db } => undefined, info => 정보들 (but, 유용x)
    todoById: async (obj: undefined, { todo_id }: Props) => {
      console.log("obj: ", obj);
      return await Todo.findOne({
        where: { todo_id: todo_id },
        include: [User],
      });
    },
  },
};

const getTodos = () => {
  const result = Todo.findAll();
  return result;
};
export {};
