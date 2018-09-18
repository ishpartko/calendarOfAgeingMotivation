export default class Profile {
  birthDate: string | null;
  public gender: string | null;
  public country: string | null;
  public name: string | null;

  constructor(gender: string, country: string, birthDate: string, name?: string) {
    this.gender = gender;
    this.country = country;
    this.birthDate = birthDate;
    this.name = name || null;
  }

  get howOld(): number {
    if (this.birthDate) {
      const now: any = new Date();
      const tmpBirthDate: any = new Date(Date.parse(this.birthDate));
      const milliseconds: number = now - tmpBirthDate;
      return milliseconds / 3.168808781402895 * Math.pow(10, -10);
    } else {
      return -1;
    }
  }

}