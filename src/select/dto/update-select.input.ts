import { CreateSelectInput } from './create-select.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSelectInput extends PartialType(CreateSelectInput) {
  @Field(() => Int)
  id: number;
}
