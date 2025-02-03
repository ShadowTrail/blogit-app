// src/entities/Post.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Category } from "./Category";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ length: 255 })
  public title!: string;

  @Column("text")
  public content!: string;

  @ManyToOne(() => User, (user) => user.posts, {
    eager: true,
    onDelete: "CASCADE",
  })
  public author!: User;

  @ManyToOne(() => Category, (category) => category.posts, {
    nullable: true,
    onDelete: "SET NULL",
    eager: true,
  })
  public category!: Category | null;

  @Column({ nullable: true })
  imageUrl!: string;

  @Column({ default: 0 })
  public viewCount!: number;

  @CreateDateColumn({ type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt!: Date;
}
