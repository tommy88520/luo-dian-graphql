import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, Int } from '@nestjs/graphql';

export type SecondTestMarkDocument = Document & SecondTestMark;

class Mark {
  topMark: number;
  preMark: number;
  avgMark: number;
  suffixMark: number;
  subMark: number;
}
@Schema({ collection: 'secondTestMark' })
@ObjectType()
export class SecondTestMark {
  @Prop()
  @Field()
  math: Mark;

  @Prop()
  @Field()
  chemical: Mark;

  @Prop()
  @Field()
  physics: Mark;

  @Prop()
  @Field()
  biology: Mark;

  @Prop()
  @Field()
  history: Mark;

  @Prop()
  @Field()
  geography: Mark;

  @Prop()
  @Field()
  citizen: Mark;
}
export const secondTestMarkSchema =
  SchemaFactory.createForClass(SecondTestMark);
