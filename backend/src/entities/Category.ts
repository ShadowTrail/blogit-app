// src/entities/Category.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./Post";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ unique: true, length: 100 })
  public name!: string;

  @OneToMany(() => Post, (post) => post.category, { cascade: true })
  public posts!: Post[];

  @CreateDateColumn({ type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt!: Date;
}
