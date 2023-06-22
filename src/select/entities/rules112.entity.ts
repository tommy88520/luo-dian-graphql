import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, Int } from '@nestjs/graphql';

class BasicRules {
  chinese: string;
  english: string;
  mathA: string;
  mathB: string;
  society: string;
}

class AdvanceRule {
  math: string;
  physics: string;
  chemical: string;
  biology: string;
  history: string;
  geography: string;
  citizen: string;
  chinese: string;
  english: string;
  mathA: string;
  mathB: string;
  society: string;
  science: string;
  auditionType: string;
  audition: string;
}
export type Rules112Document = Document & Rules112;
@Schema({ collection: 'rules112' })
@ObjectType()
export class Rules112 {
  @Prop()
  @Field()
  school: string;

  @Prop()
  @Field()
  department: string;

  @Prop()
  @Field()
  basicRule: BasicRules;

  @Prop()
  @Field()
  advancedRule: AdvanceRule;

  @Prop()
  @Field()
  auditionType: string;

  @Prop()
  @Field()
  audition: string;

  @Prop()
  @Field()
  schoolCode: string;

  @Prop()
  @Field()
  national: string;

  @Prop()
  @Field()
  region: string;

  @Prop()
  @Field()
  admissions: string;
}
export const rules112Schema = SchemaFactory.createForClass(Rules112);
