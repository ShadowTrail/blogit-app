import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  blogid: number = 1;

  @Column({ unique: true })
  email: string = '';

  @Column()
  userid: string = '';

  @Column()
  name: string = '';

  @OneToMany(() => Post, (post) => post.userid)
  posts?: Post[];
}
