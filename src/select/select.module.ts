import { Module } from '@nestjs/common';
import { SelectService } from './select.service';
import { SelectResolver } from './select.resolver';
import { SelectRepository } from './select.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FirstTestMark,
  firstTestMarkSchema,
} from './entities/firstTestMark.entity';
import {
  SecondTestMark,
  secondTestMarkSchema,
} from './entities/secondTestMark.entity';
import { ScoreMark, scoreMarkSchema } from './entities/scoreMark.entity';
import { Rules111, rules111Schema } from './entities/rules111.entity';
import { Rules112, rules112Schema } from './entities/rules112.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ScoreMark.name, schema: scoreMarkSchema },
    ]),
    MongooseModule.forFeature([
      { name: FirstTestMark.name, schema: firstTestMarkSchema },
    ]),
    MongooseModule.forFeature([
      { name: SecondTestMark.name, schema: secondTestMarkSchema },
    ]),
    MongooseModule.forFeature([
      { name: Rules111.name, schema: rules111Schema },
    ]),
    MongooseModule.forFeature([
      { name: Rules112.name, schema: rules112Schema },
    ]),
  ],
  providers: [SelectResolver, SelectService, SelectRepository],
})
export class SelectModule {}
