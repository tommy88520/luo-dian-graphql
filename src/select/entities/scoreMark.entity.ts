import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, Int } from '@nestjs/graphql';

export type ScoreMarkDocument = Document & ScoreMark;

class Mark {
  topMark: number;
  preMark: number;
  avgMark: number;
  suffixMark: number;
  subMark: number;
}
@Schema({ collection: 'scoreMark' })
@ObjectType()
export class ScoreMark {
  @Prop()
  @Field()
  chinese: Mark;

  @Prop()
  @Field()
  english: Mark;

  @Prop()
  @Field()
  mathA: Mark;

  @Prop()
  @Field()
  mathB: Mark;

  @Prop()
  @Field()
  society: Mark;

  @Prop()
  @Field()
  science: Mark;

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
  citizen: Mark;

  @Prop()
  year: string;
}
export const scoreMarkSchema = SchemaFactory.createForClass(ScoreMark);
