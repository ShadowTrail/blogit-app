import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  blogid: number = 1;

  @Column()
  title: string = "";

  @Column("text")
  content: string = "";

  @ManyToOne(() => User, (userid) => userid.posts)
  userid?: User;

  @Column()
  category: string = "";

  @Column()
  tags: string = "";

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}
