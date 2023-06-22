import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, Int } from '@nestjs/graphql';

export type FirstTestMarkDocument = Document & FirstTestMark;

class Mark {
  topMark: number;
  preMark: number;
  avgMark: number;
  suffixMark: number;
  subMark: number;
}

@Schema({ collection: 'firstTestMark' })
@ObjectType()
export class FirstTestMark {
  @Prop()
  @Field()
  chinese: Mark;

  @Field()
  @Prop()
  english: Mark;

  @Field()
  @Prop()
  mathA: Mark;

  @Field()
  @Prop()
  mathB: Mark;

  @Field()
  @Prop()
  society: Mark;

  @Field()
  @Prop()
  science: Mark;

  @Field()
  @Prop()
  year: number;
}
export const firstTestMarkSchema = SchemaFactory.createForClass(FirstTestMark);
