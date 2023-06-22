import { Type } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';
import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
class StudentScore {
  @Field()
  @IsNumber()
  @Type(() => Number)
  studentChinese: number;

  @Field()
  @IsNumber()
  @Type(() => Number)
  studentEnglish: number;

  @Field()
  @IsNumber()
  @Type(() => Number)
  studentMathA: number;

  @Field()
  @IsNumber()
  @Type(() => Number)
  studentMathB: number;

  @Field()
  @IsNumber()
  @Type(() => Number)
  studentSociety: number;

  @Field()
  @IsNumber()
  @Type(() => Number)
  studentScience: number;

  @Field()
  @IsNumber()
  @Type(() => Number)
  studentMath: number;

  @Field()
  @IsNumber()
  @Type(() => Number)
  studentChemical: number;

  @Field()
  @IsNumber()
  @Type(() => Number)
  studentPhysics: number;

  @Field()
  @IsNumber()
  @Type(() => Number)
  studentBiology: number;

  @Field()
  @IsNumber()
  @Type(() => Number)
  studentHistory: number;

  @Field()
  @IsNumber()
  @Type(() => Number)
  studentGeography: number;

  @Field()
  @IsNumber()
  @Type(() => Number)
  studentCitizen: number;

  @Field()
  @IsNumber()
  @Type(() => Number)
  studentAudition: number;

  @Field()
  @IsString()
  auditionType: string;

  @Field()
  @IsNumber()
  @Type(() => Number)
  listening: number;
}
@InputType()
export class PredictDto {
  @Field(() => [String], { description: 'Example field (placeholder)' })
  school: string[];

  @Field(() => StudentScore, { description: 'Example field (placeholder)' })
  @Type(() => StudentScore)
  studentScore: StudentScore;

  @Field(() => Number)
  @IsNumber()
  @Type(() => Number)
  page: number;

  @Field()
  @IsString()
  sort: 'DESC' | 'ASC';

  @Field(() => [String])
  range: string[];
}
