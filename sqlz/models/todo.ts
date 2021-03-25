import {
  Table,
  Column,
  Model,
  PrimaryKey,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "./user";

@Table({
  tableName: "todo",
  timestamps: false,
})
export class Todo extends Model {
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
