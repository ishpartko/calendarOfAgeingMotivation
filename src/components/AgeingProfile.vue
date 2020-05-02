<template>
  <div class="ageingProfile">
    <form class="ageingProfile__inner" @submit.prevent="emitResults()">
      <input type="text"
             class="nameInput"
             v-model="profile.name"
             placeholder="Как вас зовут?"
             maxlength="20"
             required
             autofocus>
      <label class="dateOfBirthday">
        Ваша дата рождения <input class="dateOfBirthday__input"
                                  min="1900-01-01" max="2018-01-01"
                                  type="date"
                                  v-model="profile.birthDate"
                                  required>
      </label>
      <div class="genderPicker">
        <label class="genderPicker__option">
          Я мужчина<input type="radio" name="gender" value="male" v-model="profile.gender" required>
        </label>
        <label class="genderPicker__option">
          Я женщина <input type="radio" name="gender" value="female" v-model="profile.gender">
        </label>
        <label class="genderPicker__option">
          Не важно <input type="radio" name="gender" value="overall" v-model="profile.gender">
        </label>
      </div>
      <label class="noSelect">
        <input type="checkbox" v-model="memberMe">
        <abbr title="Данные сохраняться только на вашем устройстве"> Запомнить меня</abbr>
      </label>
      <button type="submit">ОК</button>
    </form>
  </div>

</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Axios from 'axios'

import Profile from '@/models/Profile'
import { LifeExpectancy, Gender } from '@/models/LifeExpectancy'

@Component
export default class AgeingProfile extends Vue {
  public currentLifeExpectancy: LifeExpectancy = new LifeExpectancy();
  public profile: Profile = new Profile(Gender.male, '', '');
  public memberMe = false;

  public async mounted () {
    const profile: Profile | null = this.tryGetProfileFromMemory()
    if (profile) {
      this.profile = profile
      this.memberMe = true
    } else {
      const profileTmp: string | null = await this.getUserCountry()
      if (profileTmp !== null) {
        this.profile.country = profileTmp
      }
      if (this.profile.country) {
        this.currentLifeExpectancy = await this.getLifeExpectancyData(this.profile.country)
      }
    }
  }

  public async getUserCountry (): Promise<string> {
    try {
      const tmpData: any = await Axios.get('https://ipapi.co/json/')
      return tmpData.data.country_name
    } catch (e) {
      return 'Russia'
    }
  }

  public getLifeExpectancyData (userCountry: string): LifeExpectancy {
    switch (userCountry) {
      case 'Ukraine':
        return new LifeExpectancy(71.8, 67.1, 76.9)
      case 'Russia':
        return new LifeExpectancy(70.3, 64.3, 76.4)
      case 'Belarus':
        return new LifeExpectancy(72.7, 67.2, 78.6)
      case 'United States':
        return new LifeExpectancy(79.8, 77.5, 82.1)
      case 'Germany':
        return new LifeExpectancy(80.7, 78.4, 83.1)
      case 'United Kingdom':
        return new LifeExpectancy(80.7, 78.5, 83)
      default:
        return new LifeExpectancy(70.3, 64.3, 76.4)
    }
  }

  public emitResults () {
    if (this.memberMe) {
      this.recordProfileInMemory()
    } else {
      this.removeProfileFromMemory()
    }

    this.$emit('showResults', { profile: this.profile, currentLifeExpectancy: this.currentLifeExpectancy })
  }

  private tryGetProfileFromMemory (): Profile | null {
    if (localStorage.getItem('profile') !== null) {
      try {
        const tmpCurrentLifeExpectancy: string | null = localStorage.getItem('currentLifeExpectancy')
        if (tmpCurrentLifeExpectancy) {
          const tmpCurrentLifeExpectancyArray: string[] = tmpCurrentLifeExpectancy.split('-')
          if (tmpCurrentLifeExpectancyArray.every((item) => {
            return item !== null
          })) {
            this.currentLifeExpectancy = new LifeExpectancy(
              parseInt(tmpCurrentLifeExpectancyArray[0]),
              parseInt(tmpCurrentLifeExpectancyArray[1]),
              parseInt(tmpCurrentLifeExpectancyArray[2]))
          }
        }
        const gender = localStorage.getItem('gender')
        const country = localStorage.getItem('country')
        const name = localStorage.getItem('name')
        const birthDate = localStorage.getItem('birthDate')
        const shouldValidate = [gender, country, name, birthDate]
        if (shouldValidate.every((item) => {
          return item !== null
        })) {
          return new Profile(gender as Gender, country as string, birthDate as string, name as string)
        }
      } catch (e) {
        return name
      }
    }
    // Если что-то пошло не по плану все удаляем
    this.removeProfileFromMemory()
    return null
  }

  private recordProfileInMemory (): void {
    localStorage.setItem('gender', this.profile.gender)
    localStorage.setItem('country', this.profile.country)
    localStorage.setItem('birthDate', this.profile.birthDate)
    const tmpCurrentLifeExpectancy =
      this.currentLifeExpectancy.overall + '-' +
      this.currentLifeExpectancy.male + '-' +
      this.currentLifeExpectancy.female
    localStorage.setItem('currentLifeExpectancy', tmpCurrentLifeExpectancy)
    localStorage.setItem('profile', '+')
  }

  private removeProfileFromMemory (): void {
    localStorage.removeItem('gender')
    localStorage.removeItem('country')
    localStorage.removeItem('name')
    localStorage.removeItem('birthDate')
    localStorage.removeItem('currentLifeExpectancy')
    localStorage.removeItem('profile')
  }
}
</script>

<style scoped>
  .ageingProfile {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    min-width: 320px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ageingProfile__inner {
    max-width: 550px;
  }

  .ageingProfile__inner > * {
    padding: 10px 0;
  }

  .ageingProfile__inner, .genderPicker {
    display: flex;
    flex-direction: column;
  }

  .genderPicker__option {
    display: flex;
    justify-content: space-between;
  }

  .nameInput {
    width: 100%;
    border: 0 solid #6f6f6f;
    border-bottom-width: 3px;
  }

  .nameInput:focus {
    border-color: #000;
  }
</style>
