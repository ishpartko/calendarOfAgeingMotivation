export enum Gender {
  overall = 'overall',
  male = 'male',
  female = 'female',
}

export default class LifeExpectancy {
  public readonly overall: number;
  public readonly male: number;
  public readonly female: number;

  constructor (overall?: number, male?: number, female?: number) {
    this.overall = overall || 0
    this.male = male || 0
    this.female = female || 0
  }

  public getByGender (gender: Gender): number {
    switch (gender) {
      case Gender.male:
        return this.male
      case Gender.female:
        return this.female
      case Gender.overall:
        return this.overall
    }
  }
}
