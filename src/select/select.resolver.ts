import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SelectService } from './select.service';
import { PredictDto } from './dto/predict.dto';
import { PredictResult } from './entities/predict.entity';

@Resolver(() => PredictResult)
export class SelectResolver {
  constructor(private readonly selectService: SelectService) {}

  @Query(() => PredictResult)
  async findSchools(@Args('findSchools') findSchools: PredictDto) {
    const result = await this.selectService.findSchools(findSchools);
    return result;
  }
}
