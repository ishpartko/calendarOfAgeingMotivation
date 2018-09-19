import Profile from "./Profile";

export default class ToLocal {

  public gender(profile: Profile): string {
    let localGender: string = "";
    switch (profile.country) {
      case "Ukraine":
      case "Russia":
        switch (profile.gender) {
          case "male":
            if(profile.howOld < 15) localGender = "Мальчик";
            else if(profile.howOld < 25) localGender = "Парень";
            else localGender = "Мужчина";
            break;
          case "female":
            if(profile.howOld < 15) localGender = "Девочка";
            else if(profile.howOld < 30) localGender = "Девушка";
            else localGender = "Женщина";
            break;
          case "overall":
            localGender = "Пол не указан";
            break;
        }
        break;
      default:
        return profile.gender[0].toUpperCase() + profile.gender.slice(1);
    }
    return localGender;
  }

  public country(profile: Profile): string {
    switch (profile.country) {
      case "Ukraine":
        return "Украина";
      case "Russia":
        return "Россия";
      case "Belarus":
        return "Белоруссия";
      default:
        return profile.country;
    }
  }
}