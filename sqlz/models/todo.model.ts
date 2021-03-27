import {
  Table,
  Column,
  Model,
  PrimaryKey,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import User from "./user.model";

@Table({
  tableName: "todo",
  timestamps: false,
})
export default class Todo extends Model {
  @PrimaryKey
  @Column
  todo_id!: number;

  @Column
  todo!: string;

  @ForeignKey(() => User)
  @Column
  user_num!: number;

  @BelongsTo(() => User, "user_num")
  user?: User;
}
