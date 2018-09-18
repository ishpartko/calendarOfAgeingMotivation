export default class LifeExpectancy {
  public readonly overall: number | null;
  public readonly male: number | null;
  public readonly female: number | null;

  constructor(overall?: number, male?: number, female?: number) {
    this.overall = overall || null;
    this.male = male || null;
    this.female = female || null;
  }

  getGender(option:string) {
    switch (option) {
      case "overall":
        return this.overall;
      case "male":
        return this.male;
      case "female":
        return this.female;
      default:
        console.error("non expected argument in getGender");
    }
  }
}