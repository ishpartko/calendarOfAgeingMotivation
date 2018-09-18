<template>
  <div class="calendarOfAgeing">

    <label for="name">
      <input type="text" id="name" v-model="profile.name" placeholder="Как вас зовут?">
    </label>
    <label for="dateOfBirthday">
      Ваша дата рождения <input id="dateOfBirthday" type="date" v-model="profile.birthDate">
    </label>
    {{profile.birthDate}}
    <div class="gender">
      <label for="gender1"><input id="gender1" type="radio" value="overall" v-model="profile.gender">Общая продолжительность</label>
      <label for="gender2"><input id="gender2" type="radio" value="male" v-model="profile.gender">Для мужчины</label>
      <label for="gender3"><input id="gender3" type="radio" value="female" v-model="profile.gender">Для женщины</label>
    </div>

    <a href="https://en.wikipedia.org/wiki/List_of_countries_by_life_expectancy#List_by_the_CIA_(2016)">Средняя
      продолжительность жизни по ссылке</a>
    {{getUserCountry}}
    <div class="liveLine">
      <div class="liveLine__gotLived" :style="[{width: gotLived+'%'}]"></div> {{gotLived+'%'}}
    </div>


    <AgeingTable/>
  </div>
</template>

<script lang="ts">
  import {Component, Watch, Vue} from "vue-property-decorator";
  import AgeingTable from "./AgeingTable.vue";
  import Axios from "axios";

  import Profile from "../assets/classes/Profile";
  import LifeExpectancy from "../assets/classes/LifeExpectancy";

  @Component({
    components: {
      AgeingTable,
    },
  })
  export default class CalendarOfAgeing extends Vue {
    currentLifeExpectancy: LifeExpectancy = new LifeExpectancy();

    profile: Profile = new Profile("overall", "", "1998-01-09");

    async mounted() {
      this.profile.country = await this.getUserCountry();
      this.currentLifeExpectancy = await this.getLifeExpectancyData(this.profile.country);
    }

    // @Watch('profile.birthDate')
    // onProfileBirthDateChanged() {
    //    this.getUserCountry().then(response => {
    //      this.profile.country = response;
    //      // this.currentLifeExpectancy = this.getLifeExpectancyData(response);
    //    });
    // }

    get gotLived(): number | null { // Вернет проценты - сколько прожито
      if(this.profile.gender && this.profile.howOld) {
        const userGender:string = this.profile.gender.toString();
        // return this.profile.howOld / this.currentLifeExpectancy.getGender(userGender) * 100;
        return 1;
      } else {
        return null;
      }
    }

    async getUserCountry(): Promise<string | null> {
      const tmpData: any = await Axios.get("http://ip-api.com/json");
        if (tmpData.data.status === "fail") {
          console.error("fail to get data from http://ip-api.com/");
          return null;
        } else {
          try {
            return tmpData.data.country;
          } catch (e) {
            console.error("tmpData.data.country isn't available! :(");
            return null;
          }
        }
    }

    getLifeExpectancyData(userCountry: string): LifeExpectancy {
        switch (userCountry) {
          case "Ukraine":
            return new LifeExpectancy(71.8, 67.1, 76.9);
          case "Russia":
            return new LifeExpectancy(70.3, 64.3, 76.4);
          case "Belarus":
            return new LifeExpectancy(72.7, 67.2, 78.6);
          case "United States":
            return new LifeExpectancy(79.8, 77.5, 82.1);
          case "Germany":
            return new LifeExpectancy(80.7, 78.4, 83.1);
          case "United Kingdom":
            return new LifeExpectancy(80.7, 78.5, 83);
          default:
            return new LifeExpectancy(70.3, 64.3, 76.4);
        }
    }
  }
</script>

<style scoped>

  * {
    margin: 0;
    padding: 0;
  }

  .calendarOfAgeing {
    height: 80px;
  }

  .liveLine {
    height: 20px;
    background: green;
    width: 100%;
  }

  .liveLine__gotLived {
    height: 20px;
    background: red;
  }
</style>