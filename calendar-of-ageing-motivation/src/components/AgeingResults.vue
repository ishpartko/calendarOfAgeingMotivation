<template>
  <div class="ageingResults">
    <div class="liveLine">
      <div class="liveLine__inner">
        <div class="liveLine__gotLived" :style="[{width: gotLived+'%'}]"></div>
      </div>
    </div>

    <div class="infoBox__wrapper">
      <div class="infoBox">
        <div class="infoBox__line">{{profile.name}}, {{profile.howOld}}, {{toLocal.gender(profile)}}</div>
        <div class="infoBox__line">{{toLocal.country(profile)}}</div>
        <div class="infoBox__line">Прожито {{gotLived+'%'}} жизни</div>
      </div>
    </div>

    <div class="source">
      <div class="source__inner">
        Основано на
        <a href="https://en.wikipedia.org/wiki/List_of_countries_by_life_expectancy#List_by_the_CIA_(2016)">средней
          продолжительности жизни [wiki]</a>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";

  import Profile from "../assets/classes/Profile";
  import LifeExpectancy from "../assets/classes/LifeExpectancy";
  import ToLocal from "../assets/classes/ToLocal";

  @Component
  export default class AgeingResults extends Vue {
    @Prop(Object) private profile!: Profile;
    @Prop(Object) private currentLifeExpectancy!: LifeExpectancy;
    // public currentLifeExpectancy: LifeExpectancy = new LifeExpectancy(70.3, 64.3, 76.4);
    // public profile: Profile = new Profile("female", "Ukraine", "2001-08-09", "Ivan");
    public toLocal: ToLocal = new ToLocal;

    public get gotLived(): number | null { // Вернет проценты - сколько прожито
      if (this.profile.gender && this.profile.howOld) {
        const userGender: string = this.profile.gender.toString();
        return  Math.round(this.profile.howOld / this.currentLifeExpectancy.getGender(userGender) * 100);
      } else {
        return null;
      }
    }
  }
</script>

<style scoped>

  .liveLine {
    display: flex;
    align-items: center;
    min-width: 320px;
    margin-top: 10px;
  }

  .liveLine__inner {
    height: 20px;
    background: green;
    width: 100%;
  }

  .liveLine:before {
    background: url("../assets/img/002-pediatry.svg") no-repeat center;
    transform: translateX(3px);
    background-size: 80%;
  }

  .liveLine:after {
    background: url("../assets/img/001-death.svg") no-repeat center;
    transform: translateX(-3px);
    background-size: 60%;
  }

  .liveLine__gotLived:after {
    content: '';

    height: 40px;
    width: 40px;
    min-width: 46px;
    min-height: 46px;

    z-index: 11;
    border-radius: 50%;
    border: 3px solid black;

    position: absolute;
    right: -30px;
    top: -100%;
    background:  #ffffff url("../assets/img/003-exit.svg") no-repeat center;
    background-size: 80%;
  }

  .liveLine:before, .liveLine:after {
    content: '';
    background-color: #ffffff;

    height: 60px;
    width: 60px;
    min-width: 66px;
    min-height: 66px;
    padding: 2px;
    position: relative;
    z-index: 10;
    border-radius: 50%;
    border: 3px solid black;
  }

  .liveLine__gotLived {
    height: 20px;
    background: red;
    position: relative;
  }

  .infoBox {
    border: 3px solid black;
    border-radius: 50px;
    background-color: #ffffff;
    width: 50vw;

    min-width: 320px;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .infoBox__wrapper {
    margin-top: 10px;
    min-width: 320px;
    position: relative;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
  }

  .source {
    width: 100%;
    display: inline-flex;
    justify-content: center;
  }

  .source__inner *, .source__inner{
    color: #6f6f6f;
    font-size: 12pt;
  }
</style>