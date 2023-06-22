import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
class BasicRule {
  @Field({ nullable: true })
  chinese: string;
  @Field({ nullable: true })
  english: string;
  @Field({ nullable: true })
  mathA: string;
  @Field({ nullable: true })
  mathB: string;
  @Field({ nullable: true })
  society: string;
  @Field({ nullable: true })
  science: string;
  @Field({ nullable: true })
  listening: string;
}

@ObjectType()
class AdvancedRule {
  @Field({ nullable: true })
  math: string;
  @Field({ nullable: true })
  physics: string;
  @Field({ nullable: true })
  chemical: string;
  @Field({ nullable: true })
  biology: string;
  @Field({ nullable: true })
  history: string;
  @Field({ nullable: true })
  geography: string;
  @Field({ nullable: true })
  citizen: string;
  @Field({ nullable: true })
  chinese: string;
  @Field({ nullable: true })
  english: string;
  @Field({ nullable: true })
  mathA: string;
  @Field({ nullable: true })
  mathB: string;
  @Field({ nullable: true })
  society: string;
  @Field({ nullable: true })
  science: string;
  @Field({ nullable: true })
  auditionType: string;
  @Field({ nullable: true })
  audition: string;
}

@ObjectType()
class LastScore {
  @Field({ nullable: true })
  myScore: number;
  @Field({ nullable: true })
  multipleScore: number;
  @Field({ nullable: true })
  averageScore: number;
}
@ObjectType()
class NewScore {
  @Field({ nullable: true })
  myScore: number;
  @Field({ nullable: true })
  multiple: number;
  @Field({ nullable: true })
  multipleScore: number;
  @Field({ nullable: true })
  averageScore: number;
}

@ObjectType()
class OrdinaryStudentsAdmissionScore {
  @Field({ nullable: true })
  lastScore: LastScore;

  @Field({ nullable: true })
  newScore: NewScore;
}

@ObjectType()
export class PredictArray {
  @Field({ nullable: true })
  schoolCode: string;
  @Field({ nullable: true })
  schoolName: string;
  @Field({ nullable: true })
  departmentName: string;
  @Field({ nullable: true })
  advancedRule: AdvancedRule;
  @Field({ nullable: true })
  lastYearAdmissions: string;
  @Field({ nullable: true })
  thisYearAdmissions: string;
  @Field({ nullable: true })
  national: string;
  @Field({ nullable: true })
  region: string;
  @Field({ nullable: true })
  basicRule: BasicRule;

  @Field({ nullable: true })
  ordinaryStudentsAdmissionScore: OrdinaryStudentsAdmissionScore;

  @Field({ nullable: true })
  gap: number;

  @Field({ nullable: true })
  predictLevel: string;
}
