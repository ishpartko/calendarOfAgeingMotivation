export default class LifeExpectancy {
  public readonly overall: number;
  public readonly male: number;
  public readonly female: number;

  constructor(overall?: number, male?: number, female?: number) {
    this.overall = overall || 0;
    this.male = male || 0;
    this.female = female || 0;
  }

  public getGender(option: string): number {
    switch (option) {
      case "overall":
        return this.overall;
      case "male":
        return this.male;
      case "female":
        return this.female;
    }
    return this.overall;
  }
}