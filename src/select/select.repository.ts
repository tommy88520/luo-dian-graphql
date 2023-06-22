import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  FirstTestMark,
  FirstTestMarkDocument,
} from './entities/firstTestMark.entity';
import {
  SecondTestMark,
  SecondTestMarkDocument,
} from './entities/secondTestMark.entity';

import { Rules111, Rules111Document } from './entities/rules111.entity';
import { Rules112, Rules112Document } from './entities/rules112.entity';
import { ScoreMark, ScoreMarkDocument } from './entities/scoreMark.entity';

@Injectable()
export class SelectRepository {
  constructor(
    @InjectModel(ScoreMark.name)
    private scoreMarkModel: Model<ScoreMarkDocument>,
    @InjectModel(FirstTestMark.name)
    private firstTestMarkModel: Model<FirstTestMarkDocument>,
    @InjectModel(SecondTestMark.name)
    private secondRTestModel: Model<SecondTestMarkDocument>,
    @InjectModel(Rules111.name)
    private rules111Model: Model<Rules111Document>,
    @InjectModel(Rules112.name)
    private rules112Model: Model<Rules112Document>,
  ) {}

  async findLastYearScore() {
    const result = await this.rules111Model.find();
    return result;
  }

  async getNewRules(query) {
    const result = await this.rules112Model.find(query);
    return result;
  }

  async getFirstTestMark() {
    const result = await this.firstTestMarkModel.findOne({}, { _id: false });
    return result;
  }

  async getSecondTestMark() {
    const result = await this.secondRTestModel.findOne({}, { _id: false });
    return result;
  }

  async getScoreMark() {
    const result = await this.scoreMarkModel.findOne();
    return result;
  }
}
