import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSelectInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
