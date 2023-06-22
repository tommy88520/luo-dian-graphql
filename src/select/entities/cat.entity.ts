import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Cat {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  type?: string;
}
