import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export @Entity()
class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  title: string

  @Column()
  author: string

  @Column()
    year: number

  @Column()
    deskripsi: string  

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;
  
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;
}