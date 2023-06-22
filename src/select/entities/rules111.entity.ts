import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, Int } from '@nestjs/graphql';

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
export type Rules111Document = Document & Rules111;
@Schema({ collection: 'rules111' })
@ObjectType()
export class Rules111 {
  @Prop()
  @Field()
  schoolName: string;

  @Prop()
  @Field()
  departmentName: string;

  @Prop()
  @Field()
  advancedRule: AdvanceRule;

  @Prop()
  @Field()
  admissions: string;

  @Prop()
  @Field()
  ordinaryStudentsAdmissionScore: string;
}
export const rules111Schema = SchemaFactory.createForClass(Rules111);
