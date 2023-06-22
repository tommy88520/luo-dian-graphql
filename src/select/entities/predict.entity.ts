import { Field, ObjectType, Int } from '@nestjs/graphql';
import { PredictArray } from './predict.model';
@ObjectType()
export class PredictResult {
  @Field(() => [PredictArray])
  results: PredictArray[];
  @Field({ nullable: true })
  total: number;
}
