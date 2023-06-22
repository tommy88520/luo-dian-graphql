import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { SelectRepository } from './select.repository';
import * as _ from 'lodash';
import { BadRequestError } from '../common/httpError';
import { Cache } from 'cache-manager';

@Injectable()
export class SelectService {
  constructor(
    private readonly selectRepo: SelectRepository, // @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findSchools(query) {
    const { school, studentScore, page, sort, range } = query;
    const {
      studentChinese,
      studentEnglish,
      studentMathA,
      studentMathB,
      studentSociety,
      studentScience,
      studentMath,
      studentChemical,
      studentPhysics,
      studentBiology,
      studentHistory,
      studentGeography,
      studentCitizen,
      studentAudition,
      auditionType,
      listening,
    } = studentScore;
    const queryData = [];
    if (
      range.length > 5 ||
      !range.length ||
      page <= 0 ||
      !this.checkRangeType(range) ||
      !this.checkAuditionType(auditionType)
    ) {
      throw new BadRequestError('參數輸入錯誤');
    }
    if (
      studentAudition < 0 ||
      studentAudition > 100 ||
      typeof studentAudition != 'number' ||
      listening < 0 ||
      listening > 4 ||
      typeof listening != 'number'
    ) {
      throw new BadRequestError('分數輸入錯誤');
    }

    for (const key in studentScore) {
      if (
        key != 'studentAudition' &&
        key != 'listening' &&
        key != 'auditionType'
      ) {
        if (
          studentScore[key] < 0 ||
          studentScore[key] > 60 ||
          typeof studentScore[key] != 'number'
        ) {
          throw new BadRequestError('分數輸入錯誤');
        }
      }

      if (!studentScore[key]) {
        if (key == 'studentChinese') {
          queryData.push({ 'advancedRule.chinese': null });
        } else if (key == 'studentEnglish') {
          queryData.push({ 'advancedRule.english': null });
        } else if (key == 'studentMathA') {
          queryData.push({ 'advancedRule.mathA': null });
        } else if (key == 'studentMathB') {
          queryData.push({ 'advancedRule.mathB': null });
        } else if (key == 'studentMath') {
          queryData.push({ 'advancedRule.math': null });
        } else if (key == 'studentSociety') {
          queryData.push({ 'advancedRule.society': null });
        } else if (key == 'studentScience') {
          queryData.push({ 'advancedRule.science': null });
        } else if (key == 'studentPhysics') {
          queryData.push({ 'advancedRule.physics': null });
        } else if (key == 'studentHistory') {
          queryData.push({ 'advancedRule.history': null });
        } else if (key == 'studentChemical') {
          queryData.push({ 'advancedRule.chemical': null });
        } else if (key == 'studentBiology') {
          queryData.push({ 'advancedRule.biology': null });
        } else if (key == 'studentGeography') {
          queryData.push({ 'advancedRule.geography': null });
        } else if (key == 'studentCitizen') {
          queryData.push({ 'advancedRule.citizen': null });
        } else if (key == 'studentAudition') {
          queryData.push({ 'advancedRule.audition': null });
        }
      }
    }

    const newConverseFiftheen = {
      studentChinese: Math.floor(studentChinese / 4),
      studentEnglish: Math.floor(studentEnglish / 4),
      studentMathA: Math.floor(studentMathA / 4),
      studentMathB: Math.floor(studentMathB / 4),
      studentSociety: Math.floor(studentSociety / 4),
      studentScience: Math.floor(studentScience / 4),
    };
    const studentMark = {
      chinese: 0,
      english: 0,
      mathA: 0,
      mathB: 0,
      society: 0,
      science: 0,
      math: 0,
      chemical: 0,
      physics: 0,
      biology: 0,
      history: 0,
      geography: 0,
      citizen: 0,
    };
    // let firstTestMark;
    // const firstTestMarkCache = await this.cacheManager.get('firstTestMark');
    // if (firstTestMarkCache) {
    //   firstTestMark = firstTestMarkCache;
    // } else {
    const firstTestMark: any = await this.selectRepo.getFirstTestMark();
    // await this.cacheManager.set('firstTestMark', firstTestMark, 60 * 60 * 24);
    // }

    for (const key in firstTestMark) {
      if (key == 'chinese') {
        const result = firstTestMark['chinese'].findIndex(
          (item) => item > newConverseFiftheen.studentChinese,
        );
        if (result == -1) {
          studentMark.chinese = 5;
        } else if (result == 0) {
          studentMark.chinese = result + 1;
        } else {
          studentMark.chinese = result;
        }
      } else if (key == 'english') {
        const result = firstTestMark['english'].findIndex(
          (item) => item > newConverseFiftheen.studentEnglish,
        );
        if (result == -1) {
          studentMark.english = 5;
        } else if (result == 0) {
          studentMark.english = result + 1;
        } else {
          studentMark.english = result;
        }
      } else if (key == 'mathA') {
        const result = firstTestMark['mathA'].findIndex(
          (item) => item > newConverseFiftheen.studentMathA,
        );
        if (result == -1) {
          studentMark.mathA = 5;
        } else if (result == 0) {
          studentMark.mathA = result + 1;
        } else {
          studentMark.mathA = result;
        }
      } else if (key == 'mathB') {
        const result = firstTestMark['mathB'].findIndex(
          (item) => item > newConverseFiftheen.studentMathB,
        );
        if (result == -1) {
          studentMark.mathB = 5;
        } else if (result == 0) {
          studentMark.mathB = result + 1;
        } else {
          studentMark.mathB = result;
        }
      } else if (key == 'society') {
        const result = firstTestMark['society'].findIndex(
          (item) => item > newConverseFiftheen.studentSociety,
        );

        if (result == -1) {
          studentMark.society = 5;
        } else if (result == 0) {
          studentMark.society = result + 1;
        } else {
          studentMark.society = result;
        }
      } else if (key == 'science') {
        const result = firstTestMark['science'].findIndex(
          (item) => item > newConverseFiftheen.studentScience,
        );
        if (result == -1) {
          studentMark.science = 5;
        } else if (result == 0) {
          studentMark.science = result + 1;
        } else {
          studentMark.science = result;
        }
      }
    }

    // let secondTestMark;
    // const secondTestMarkCache = await this.cacheManager.get('secondTestMark');
    // if (secondTestMarkCache) {
    //   secondTestMark = secondTestMarkCache;
    // } else {
    const secondTestMark: any = await this.selectRepo.getSecondTestMark();
    // await this.cacheManager.set(
    //   'secondTestMark',
    //   secondTestMark,
    //   60 * 60 * 24,
    // );
    // }
    for (const secondTestKey in secondTestMark) {
      if (secondTestKey == 'math') {
        const result = secondTestMark['math'].findIndex(
          (item) => item > studentMath,
        );
        if (result == -1) {
          studentMark.math = 5;
        } else if (result == 0) {
          studentMark.math = result + 1;
        } else {
          studentMark.math = result;
        }
      } else if (secondTestKey == 'chemical') {
        const result = secondTestMark['chemical'].findIndex(
          (item) => item > studentChemical,
        );
        if (result == -1) {
          studentMark.chemical = 5;
        } else if (result == 0) {
          studentMark.chemical = result + 1;
        } else {
          studentMark.chemical = result;
        }
      } else if (secondTestKey == 'physics') {
        const result = secondTestMark['physics'].findIndex(
          (item) => item > studentPhysics,
        );
        if (result == -1) {
          studentMark.physics = 5;
        } else if (result == 0) {
          studentMark.physics = result + 1;
        } else {
          studentMark.physics = result;
        }
      } else if (secondTestKey == 'biology') {
        const result = secondTestMark['biology'].findIndex(
          (item) => item > studentBiology,
        );
        if (result == -1) {
          studentMark.biology = 5;
        } else if (result == 0) {
          studentMark.biology = result + 1;
        } else {
          studentMark.biology = result;
        }
      } else if (secondTestKey == 'history') {
        const result = secondTestMark['history'].findIndex(
          (item) => item > studentHistory,
        );

        if (result == -1) {
          studentMark.history = 5;
        } else if (result == 0) {
          studentMark.history = result + 1;
        } else {
          studentMark.history = result;
        }
      } else if (secondTestKey == 'geography') {
        const result = secondTestMark['geography'].findIndex(
          (item) => item > studentGeography,
        );
        if (result == -1) {
          studentMark.geography = 5;
        } else if (result == 0) {
          studentMark.geography = result + 1;
        } else {
          studentMark.geography = result;
        }
      } else if (secondTestKey == 'citizen') {
        const result = secondTestMark['citizen'].findIndex(
          (item) => item > studentCitizen,
        );
        if (result == -1) {
          studentMark.citizen = 5;
        } else if (result == 0) {
          studentMark.citizen = result + 1;
        } else {
          studentMark.citizen = result;
        }
      }
    }
    const markRule = [
      {
        $or: [
          { 'basicRule.chinese': null },
          {
            'basicRule.chinese': {
              $regex: new RegExp(`^[0-${studentMark.chinese}]$`, 'i'),
            },
          },
        ],
      },
      {
        $or: [
          { 'basicRule.english': null },
          {
            'basicRule.english': {
              $regex: new RegExp(`^[0-${studentMark.english}]$`, 'i'),
            },
          },
        ],
      },
      {
        $or: [
          { 'basicRule.mathA': null },
          {
            'basicRule.mathA': {
              $regex: new RegExp(`^[0-${studentMark.mathA}]$`, 'i'),
            },
          },
        ],
      },
      {
        $or: [
          { 'basicRule.mathB': null },
          {
            'basicRule.mathB': {
              $regex: new RegExp(`^[0-${studentMark.mathB}]$`, 'i'),
            },
          },
        ],
      },
      {
        $or: [
          { 'basicRule.society': null },
          {
            'basicRule.society': {
              $regex: new RegExp(`^[0-${studentMark.society}]$`, 'i'),
            },
          },
        ],
      },
      {
        $or: [
          { 'basicRule.science': null },
          {
            'basicRule.science': {
              $regex: new RegExp(`^[0-${studentMark.science}]$`, 'i'),
            },
          },
        ],
      },
    ];
    let listeningScore: any = [
      {
        $or: [{ 'basicRule.listening': null }],
      },
    ];
    if (listening) {
      listeningScore = [
        {
          $or: [
            { 'basicRule.listening': null },
            {
              'basicRule.listening': {
                $regex: new RegExp(`^[0-${listening}]$`, 'i'),
              },
            },
          ],
        },
      ];
    }

    const search = queryData.concat(markRule).concat(listeningScore);
    const regex = /^$|^[\u4e00-\u9fa5]{1,20}$/;

    let regexString = '';

    for (let i = 0; i < school.length; i++) {
      const isMatch = regex.test(school[i]);
      if (!isMatch) throw new BadRequestError('參數輸入錯誤');
      regexString += `${school[i]}|`;
    }
    regexString = regexString.slice(0, -1);
    const SearchRegex = new RegExp(regexString, 'i');
    const auditionOption = studentAudition
      ? {
          $or: [
            { auditionType: null },
            {
              auditionType: auditionType,
            },
          ],
        }
      : { auditionType: null };
    const newSchoolName = {
      $or: [
        { school: { $regex: SearchRegex } },
        { department: { $regex: SearchRegex } },
        { region: { $regex: SearchRegex } },
        { national: { $regex: SearchRegex } },
      ],
    };
    search.push(newSchoolName);
    search.push(auditionOption);
    const selectSchools = await this.selectRepo.getNewRules({
      $and: search,
    });
    // let lastYearScore;
    // const lastYearScoreCache = await this.cacheManager.get('lastYearScore');
    // if (lastYearScoreCache) {
    //   lastYearScore = lastYearScoreCache;
    // } else {
    const lastYearScore: any = await this.selectRepo.findLastYearScore();
    //   await this.cacheManager.set('lastYearScore', lastYearScore, 60 * 60 * 24);
    // }

    const resultSchools = [];
    selectSchools.map((item) => {
      const [filteredData] = _.filter(lastYearScore, {
        schoolName: item.school,
        departmentName: item.department,
      });
      if (filteredData) {
        resultSchools.push({
          schoolCode: item.schoolCode,
          schoolName: item.school,
          departmentName: item.department,
          advancedRule: item.advancedRule,
          lastYearAdmissions: filteredData.admissions,
          thisYearAdmissions: item.admissions,
          national: item.national,
          region: item.region,
          ordinaryStudentsAdmissionScore:
            filteredData.ordinaryStudentsAdmissionScore,
          newAdvancedRule: item.advancedRule,
          basicRule: item.basicRule,
        });
      }
    });
    // let scoreMark;
    // const scoreMarkCache = await this.cacheManager.get('scoreMark');
    // if (scoreMarkCache) {
    //   scoreMark = scoreMarkCache;
    // } else {
    const scoreMark: any = await this.selectRepo.getScoreMark();
    //   await this.cacheManager.set('scoreMark', scoreMark, 60 * 60 * 24);
    // }
    const scoreMarkAverage = {
      chinese: 1.6,
      english: -0.8,
      mathA: 4,
      mathB: -2.4,
      society: -4.8,
      science: -3.2,
      math: -2.6,
      chemical: 0,
      physics: 0,
      biology: 0,
      history: 0,
      geography: 0,
      citizen: 0,
    };

    const predict = [];
    resultSchools.map((item: any) => {
      const compareData = {
        myScore: 0,
        lastYearScoreAdjust: Number(item.ordinaryStudentsAdmissionScore),
        multiple: 0,
      };

      for (const key in item.advancedRule) {
        if (item.advancedRule[key]) {
          if (key == 'chinese') {
            let chineseMark;
            const studentSubjectMark = studentMark.chinese;
            if (studentSubjectMark == 5) {
              chineseMark = scoreMark.chinese.topMark;
            } else if (studentSubjectMark == 4) {
              chineseMark = scoreMark.chinese.preMark;
            } else if (studentSubjectMark == 3) {
              chineseMark = scoreMark.chinese.avgMark;
            } else if (studentSubjectMark == 2) {
              chineseMark = scoreMark.chinese.suffixMark;
            } else if (studentSubjectMark == 1) {
              chineseMark = scoreMark.chinese.subMark;
            }
            const gapScore =
              Number(item.advancedRule[key]) *
              (studentChinese - chineseMark * 2);
            compareData.lastYearScoreAdjust +=
              Number(item.advancedRule[key]) * scoreMarkAverage.chinese;
            compareData.myScore += gapScore;
            compareData.multiple += Number(item.advancedRule[key]);
          } else if (key == 'english') {
            let englishMark;
            const studentSubjectMark = studentMark.english;
            if (studentSubjectMark == 5) {
              englishMark = scoreMark.english.topMark;
            } else if (studentSubjectMark == 4) {
              englishMark = scoreMark.english.preMark;
            } else if (studentSubjectMark == 3) {
              englishMark = scoreMark.english.avgMark;
            } else if (studentSubjectMark == 2) {
              englishMark = scoreMark.english.suffixMark;
            } else if (studentSubjectMark == 1) {
              englishMark = scoreMark.english.subMark;
            }
            const gapScore =
              Number(item.advancedRule[key]) *
              (studentEnglish - englishMark * 2);
            compareData.lastYearScoreAdjust +=
              Number(item.advancedRule[key]) * scoreMarkAverage.english;
            compareData.myScore += gapScore;
            compareData.multiple += Number(item.advancedRule[key]);
          } else if (key == 'mathA') {
            let mathAMark;
            const studentSubjectMark = studentMark.mathA;
            if (studentSubjectMark == 5) {
              mathAMark = scoreMark.mathA.topMark;
            } else if (studentSubjectMark == 4) {
              mathAMark = scoreMark.mathA.preMark;
            } else if (studentSubjectMark == 3) {
              mathAMark = scoreMark.mathA.avgMark;
            } else if (studentSubjectMark == 2) {
              mathAMark = scoreMark.mathA.suffixMark;
            } else if (studentSubjectMark == 1) {
              mathAMark = scoreMark.mathA.subMark;
            }
            const gapScore =
              Number(item.advancedRule[key]) * (studentMathA - mathAMark * 2);
            compareData.lastYearScoreAdjust +=
              Number(item.advancedRule[key]) * scoreMarkAverage.mathA;
            compareData.myScore += gapScore;
            compareData.multiple += Number(item.advancedRule[key]);
          } else if (key == 'mathB') {
            let mathBMark;
            const studentSubjectMark = studentMark.mathB;
            if (studentSubjectMark == 5) {
              mathBMark = scoreMark.mathB.topMark;
            } else if (studentSubjectMark == 4) {
              mathBMark = scoreMark.mathB.preMark;
            } else if (studentSubjectMark == 3) {
              mathBMark = scoreMark.mathB.avgMark;
            } else if (studentSubjectMark == 2) {
              mathBMark = scoreMark.mathB.suffixMark;
            } else if (studentSubjectMark == 1) {
              mathBMark = scoreMark.mathB.subMark;
            }
            const gapScore =
              Number(item.advancedRule[key]) * (studentMathB - mathBMark * 2);
            compareData.lastYearScoreAdjust +=
              Number(item.advancedRule[key]) * scoreMarkAverage.mathB;
            compareData.myScore += gapScore;
            compareData.multiple += Number(item.advancedRule[key]);
          } else if (key == 'society') {
            let societyMark;
            const studentSubjectMark = studentMark.society;
            if (studentSubjectMark == 5) {
              societyMark = scoreMark.society.topMark;
            } else if (studentSubjectMark == 4) {
              societyMark = scoreMark.society.preMark;
            } else if (studentSubjectMark == 3) {
              societyMark = scoreMark.society.avgMark;
            } else if (studentSubjectMark == 2) {
              societyMark = scoreMark.society.suffixMark;
            } else if (studentSubjectMark == 1) {
              societyMark = scoreMark.society.subMark;
            }
            const gapScore =
              Number(item.advancedRule[key]) * (studentMathB + societyMark * 2);
            compareData.lastYearScoreAdjust +=
              Number(item.advancedRule[key]) * scoreMarkAverage.society;
            compareData.myScore += gapScore;
            compareData.multiple += Number(item.advancedRule[key]);
          } else if (key == 'science') {
            let scienceMark;
            const studentSubjectMark = studentMark.science;
            if (studentSubjectMark == 5) {
              scienceMark = scoreMark.science.topMark;
            } else if (studentSubjectMark == 4) {
              scienceMark = scoreMark.science.preMark;
            } else if (studentSubjectMark == 3) {
              scienceMark = scoreMark.science.avgMark;
            } else if (studentSubjectMark == 2) {
              scienceMark = scoreMark.science.suffixMark;
            } else if (studentSubjectMark == 1) {
              scienceMark = scoreMark.science.subMark;
            }
            const gapScore =
              Number(item.advancedRule[key]) *
              (studentScience - scienceMark * 2);
            compareData.lastYearScoreAdjust +=
              Number(item.advancedRule[key]) * scoreMarkAverage.science;
            compareData.myScore += gapScore;
            compareData.multiple += Number(item.advancedRule[key]);
          } else if (key == 'math') {
            let mathMark;
            const studentSubjectMark = studentMark.math;
            if (studentSubjectMark == 5) {
              mathMark = scoreMark.math.topMark;
            } else if (studentSubjectMark == 4) {
              mathMark = scoreMark.math.preMark;
            } else if (studentSubjectMark == 3) {
              mathMark = scoreMark.math.avgMark;
            } else if (studentSubjectMark == 2) {
              mathMark = scoreMark.math.suffixMark;
            } else if (studentSubjectMark == 1) {
              mathMark = scoreMark.math.subMark;
            }
            const gapScore =
              Number(item.advancedRule[key]) * (studentMath + mathMark);
            compareData.lastYearScoreAdjust +=
              Number(item.advancedRule[key]) * scoreMarkAverage.math;
            compareData.myScore += gapScore;
            compareData.multiple += Number(item.advancedRule[key]);
          } else if (key == 'physics') {
            let physicsMark;
            const studentSubjectMark = studentMark.physics;
            if (studentSubjectMark == 5) {
              physicsMark = scoreMark.physics.topMark;
            } else if (studentSubjectMark == 4) {
              physicsMark = scoreMark.physics.preMark;
            } else if (studentSubjectMark == 3) {
              physicsMark = scoreMark.physics.avgMark;
            } else if (studentSubjectMark == 2) {
              physicsMark = scoreMark.physics.suffixMark;
            } else if (studentSubjectMark == 1) {
              physicsMark = scoreMark.physics.subMark;
            }
            const gapScore =
              Number(item.advancedRule[key]) * (studentPhysics - physicsMark);
            compareData.lastYearScoreAdjust +=
              Number(item.advancedRule[key]) * scoreMarkAverage.physics;
            compareData.myScore += gapScore;
            compareData.multiple += Number(item.advancedRule[key]);
          } else if (key == 'history') {
            let historyMark;
            const studentSubjectMark = studentMark.history;
            if (studentSubjectMark == 5) {
              historyMark = scoreMark.history.topMark;
            } else if (studentSubjectMark == 4) {
              historyMark = scoreMark.history.preMark;
            } else if (studentSubjectMark == 3) {
              historyMark = scoreMark.history.avgMark;
            } else if (studentSubjectMark == 2) {
              historyMark = scoreMark.history.suffixMark;
            } else if (studentSubjectMark == 1) {
              historyMark = scoreMark.history.subMark;
            }
            const gapScore =
              Number(item.advancedRule[key]) * (studentHistory - historyMark);
            compareData.lastYearScoreAdjust +=
              Number(item.advancedRule[key]) * scoreMarkAverage.history;
            compareData.myScore += gapScore;
            compareData.multiple += Number(item.advancedRule[key]);
          } else if (key == 'chemical') {
            let chemicalMark;
            const studentSubjectMark = studentMark.chemical;
            if (studentSubjectMark == 5) {
              chemicalMark = scoreMark.chemical.topMark;
            } else if (studentSubjectMark == 4) {
              chemicalMark = scoreMark.chemical.preMark;
            } else if (studentSubjectMark == 3) {
              chemicalMark = scoreMark.chemical.avgMark;
            } else if (studentSubjectMark == 2) {
              chemicalMark = scoreMark.chemical.suffixMark;
            } else if (studentSubjectMark == 1) {
              chemicalMark = scoreMark.chemical.subMark;
            }
            const gapScore =
              Number(item.advancedRule[key]) * (studentChemical - chemicalMark);
            compareData.lastYearScoreAdjust +=
              Number(item.advancedRule[key]) * scoreMarkAverage.chemical;
            compareData.myScore += gapScore;
            compareData.multiple += Number(item.advancedRule[key]);
          } else if (key == 'biology') {
            let biologyMark;
            const studentSubjectMark = studentMark.biology;
            if (studentSubjectMark == 5) {
              biologyMark = scoreMark.biology.topMark;
            } else if (studentSubjectMark == 4) {
              biologyMark = scoreMark.biology.preMark;
            } else if (studentSubjectMark == 3) {
              biologyMark = scoreMark.biology.avgMark;
            } else if (studentSubjectMark == 2) {
              biologyMark = scoreMark.biology.suffixMark;
            } else if (studentSubjectMark == 1) {
              biologyMark = scoreMark.biology.subMark;
            }
            const gapScore =
              Number(item.advancedRule[key]) * (studentBiology - biologyMark);
            compareData.lastYearScoreAdjust +=
              Number(item.advancedRule[key]) * scoreMarkAverage.biology;
            compareData.myScore += gapScore;
            compareData.multiple += Number(item.advancedRule[key]);
          } else if (key == 'geography') {
            let geographyMark;
            const studentSubjectMark = studentMark.geography;
            if (studentSubjectMark == 5) {
              geographyMark = scoreMark.geography.topMark;
            } else if (studentSubjectMark == 4) {
              geographyMark = scoreMark.geography.preMark;
            } else if (studentSubjectMark == 3) {
              geographyMark = scoreMark.geography.avgMark;
            } else if (studentSubjectMark == 2) {
              geographyMark = scoreMark.geography.suffixMark;
            } else if (studentSubjectMark == 1) {
              geographyMark = scoreMark.geography.subMark;
            }
            const gapScore =
              Number(item.advancedRule[key]) *
              (studentGeography - geographyMark);
            compareData.lastYearScoreAdjust +=
              Number(item.advancedRule[key]) * scoreMarkAverage.geography;
            compareData.myScore += gapScore;
            compareData.multiple += Number(item.advancedRule[key]);
          } else if (key == 'citizen') {
            let citizenMark;
            const studentSubjectMark = studentMark.citizen;
            if (studentSubjectMark == 5) {
              citizenMark = scoreMark.citizen.topMark;
            } else if (studentSubjectMark == 4) {
              citizenMark = scoreMark.citizen.preMark;
            } else if (studentSubjectMark == 3) {
              citizenMark = scoreMark.citizen.avgMark;
            } else if (studentSubjectMark == 2) {
              citizenMark = scoreMark.citizen.suffixMark;
            } else if (studentSubjectMark == 1) {
              citizenMark = scoreMark.citizen.subMark;
            }
            const gapScore =
              Number(item.advancedRule[key]) * (studentCitizen - citizenMark);
            compareData.lastYearScoreAdjust +=
              Number(item.advancedRule[key]) * scoreMarkAverage.citizen;
            compareData.myScore += gapScore;
            compareData.multiple += Number(item.advancedRule[key]);
          } else if (key == 'audition') {
            const gapScore = Number(item.advancedRule[key]) * studentAudition;
            compareData.myScore += gapScore;
            compareData.multiple += Number(item.advancedRule[key]);
          }
        }
      }
      // ------------------------------以下為今年預測------------------------------
      const newCompareData = {
        myScore: 0,
        multiple: 0,
        multipleScore: 0,
        averageScore: 0,
      };
      const scoreBase = compareData.lastYearScoreAdjust / compareData.multiple;
      for (const key in item.newAdvancedRule) {
        if (typeof item.newAdvancedRule[key] == 'string') {
          if (key == 'chinese') {
            newCompareData.myScore +=
              studentChinese * Number(item.newAdvancedRule[key]);
            newCompareData.multipleScore +=
              Number(item.newAdvancedRule[key]) * scoreBase;
            newCompareData.multiple += Number(item.newAdvancedRule[key]);
          } else if (key == 'english') {
            newCompareData.myScore +=
              studentEnglish * Number(item.newAdvancedRule[key]);
            newCompareData.multipleScore +=
              Number(item.newAdvancedRule[key]) * scoreBase;
            newCompareData.multiple += Number(item.newAdvancedRule[key]);
          } else if (key == 'mathA') {
            newCompareData.myScore +=
              studentMathA * Number(item.newAdvancedRule[key]);
            newCompareData.multipleScore +=
              Number(item.newAdvancedRule[key]) * scoreBase;
            newCompareData.multiple += Number(item.newAdvancedRule[key]);
          } else if (key == 'mathB') {
            newCompareData.myScore +=
              studentMathB * Number(item.newAdvancedRule[key]);
            newCompareData.multipleScore +=
              Number(item.newAdvancedRule[key]) * scoreBase;
            newCompareData.multiple += Number(item.newAdvancedRule[key]);
          } else if (key == 'society') {
            newCompareData.myScore +=
              studentSociety * Number(item.newAdvancedRule[key]);
            newCompareData.multipleScore +=
              Number(item.newAdvancedRule[key]) * scoreBase;
            newCompareData.multiple += Number(item.newAdvancedRule[key]);
          } else if (key == 'science') {
            newCompareData.myScore +=
              studentScience * Number(item.newAdvancedRule[key]);
            newCompareData.multipleScore +=
              Number(item.newAdvancedRule[key]) * scoreBase;
            newCompareData.multiple += Number(item.newAdvancedRule[key]);
          } else if (key == 'math') {
            newCompareData.myScore +=
              studentMath * Number(item.newAdvancedRule[key]);
            newCompareData.multipleScore +=
              Number(item.newAdvancedRule[key]) * scoreBase;
            newCompareData.multiple += Number(item.newAdvancedRule[key]);
          } else if (key == 'physics') {
            newCompareData.myScore +=
              studentPhysics * Number(item.newAdvancedRule[key]);
            newCompareData.multipleScore +=
              Number(item.newAdvancedRule[key]) * scoreBase;
            newCompareData.multiple += Number(item.newAdvancedRule[key]);
          } else if (key == 'history') {
            newCompareData.myScore +=
              studentHistory * Number(item.newAdvancedRule[key]);
            newCompareData.multipleScore +=
              Number(item.newAdvancedRule[key]) * scoreBase;
            newCompareData.multiple += Number(item.newAdvancedRule[key]);
          } else if (key == 'chemical') {
            newCompareData.myScore +=
              studentChemical * Number(item.newAdvancedRule[key]);
            newCompareData.multipleScore +=
              Number(item.newAdvancedRule[key]) * scoreBase;
            newCompareData.multiple += Number(item.newAdvancedRule[key]);
          } else if (key == 'biology') {
            newCompareData.myScore +=
              studentBiology * Number(item.newAdvancedRule[key]);
            newCompareData.multipleScore +=
              Number(item.newAdvancedRule[key]) * scoreBase;
            newCompareData.multiple += Number(item.newAdvancedRule[key]);
          } else if (key == 'geography') {
            newCompareData.myScore +=
              studentGeography * Number(item.newAdvancedRule[key]);
            newCompareData.multipleScore +=
              Number(item.newAdvancedRule[key]) * scoreBase;
            newCompareData.multiple += Number(item.newAdvancedRule[key]);
          } else if (key == 'citizen') {
            newCompareData.myScore +=
              studentCitizen * Number(item.newAdvancedRule[key]);
            newCompareData.multipleScore +=
              Number(item.newAdvancedRule[key]) * scoreBase;
            newCompareData.multiple += Number(item.newAdvancedRule[key]);
          } else if (key == 'audition') {
            newCompareData.myScore +=
              studentAudition * Number(item.newAdvancedRule[key]);
            newCompareData.multipleScore +=
              Number(item.newAdvancedRule[key]) * scoreBase;
          }
        }
      }

      if (
        (compareData.myScore > item.ordinaryStudentsAdmissionScore &&
          compareData.myScore - item.ordinaryStudentsAdmissionScore < 100) ||
        (compareData.myScore < item.ordinaryStudentsAdmissionScore &&
          compareData.myScore - item.ordinaryStudentsAdmissionScore > -30) ||
        !isNaN(item.ordinaryStudentsAdmissionScore)
      ) {
        //isNaN(str)
        const gap = this.transferAdmissionPercentage(
          compareData.myScore,
          item.ordinaryStudentsAdmissionScore,
        );
        let predictLevel;
        if (gap > 60) {
          predictLevel = '安全穩固';
        } else if (gap > 55) {
          predictLevel = '保守選填';
        } else if (gap >= 50) {
          predictLevel = '最適落點';
        } else if (45 < gap && gap < 50) {
          predictLevel = '嘗試進攻';
        } else {
          predictLevel = '夢幻校系';
        }
        newCompareData.multipleScore = Math.round(newCompareData.multipleScore);
        newCompareData.averageScore = this.averageScore(
          newCompareData.multipleScore,
          newCompareData.multiple,
        );
        predict.push({
          schoolCode: item.schoolCode,
          schoolName: item.schoolName,
          departmentName: item.departmentName,
          advancedRule: item.advancedRule,
          lastYearAdmissions: item.lastYearAdmissions,
          thisYearAdmissions: item.thisYearAdmissions,
          national: item.national,
          region: item.region,
          basicRule: item.basicRule,
          ordinaryStudentsAdmissionScore: {
            lastScore: {
              myScore: compareData.myScore,
              multipleScore: Math.round(
                Number(item.ordinaryStudentsAdmissionScore),
              ),
              averageScore: this.averageScore(
                compareData.myScore,
                compareData.multiple,
              ),
            },
            newScore: newCompareData,
          },
          gap,
          predictLevel,
        });
      }
    });
    const sortResult = this.sortSchool(predict, sort, range);
    const PreResult = this.paginatedResults(sortResult, page);
    const result = {
      results: PreResult,
      total: sortResult.length,
    };

    return result;
  }

  transferAdmissionPercentage(myScore, scoreData) {
    const scoreGap = myScore - scoreData;
    let percentage;
    if (scoreGap >= 0) {
      percentage = 50 + (scoreGap / 1) * 1.21;
    } else {
      percentage = 50 - Math.abs((scoreGap / 1) * 1.21);
    }
    if (percentage > 99) percentage = 99;
    if (percentage <= 1) percentage = 1;
    return percentage;
  }
  paginatedResults(model, pageParams = 1, limitParams = 10) {
    const page = pageParams < 1 ? 1 : pageParams;
    const limit = limitParams > 100 ? 100 : limitParams;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginated = model.slice(startIndex, endIndex);
    return paginated;
  }
  sortSchool(data, sort = 'DESC', range = []) {
    if (!range.length) {
      return data;
    }
    const result = [];
    data.forEach((item) => {
      range.filter((a) => {
        if (a == item.predictLevel) {
          result.push(item);
        }
      });
    });

    let sortResult;
    if (sort == 'DESC') {
      sortResult = result.sort((a, b) => b.gap - a.gap);
    } else {
      sortResult = result.sort((a, b) => a.gap - b.gap);
    }
    return sortResult;
  }

  averageScore(originScore = 0, scale = 0) {
    return Math.round((originScore / scale) * 10) / 10;
  }

  checkAuditionType(query) {
    if (typeof query != 'string') return false;
    const rules = ['音樂', '美術', '體育', ''];
    return rules.some((e) => e == query);
  }

  checkRangeType(query) {
    const rules = ['最適落點', '安全穩固', '保守選填', '嘗試進攻', '夢幻校系'];
    return query.every((e) => {
      if (typeof e != 'string') return false;
      return rules.includes(e);
    });
  }
}
