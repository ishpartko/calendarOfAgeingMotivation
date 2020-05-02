<template>
  <div class="AgeingProfile">
    <button class="backToForm"
            title="Заполнить заново"
            v-show="currentPage !== previousPage"
            @click="getBack()"></button>
    <button class="whatIsIt"
            v-if="currentPage !== 'WhatIsIt'"
            @click="currentPage = 'WhatIsIt'">?</button>
            <AgeingProfile @showResults="showResults"></AgeingProfile>
            <AgeingResults
            :profile="results.profile"
            :currentLifeExpectancy="results.currentLifeExpectancy"
            ></AgeingResults>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import AgeingResults from './AgeingResults.vue'
import AgeingProfile from './AgeingProfile.vue'
import WhatIsIt from './WhatIsIt.vue'
import { LifeExpectancy } from '@/models/LifeExpectancy'

enum PageNames {
  AgeingProfile = 'AgeingProfile',
  AgeingResults = 'AgeingResults'
}

type PageName = PageNames.AgeingProfile | PageNames.AgeingResults

interface UserResults {
  currentLifeExpectancy: LifeExpectancy;
  profile: any;
}

@Component({
  components: {
    AgeingResults,
    AgeingProfile,
    WhatIsIt
  }
})
export default class CalendarOfAgeing extends Vue {
  public results: UserResults | null = null;
  private activePageName: PageName = PageNames.AgeingProfile

  get pageNames () {
    return PageNames
  }

  private showResults (results: UserResults): void {
    this.results = results
    this.activePageName = PageNames.AgeingResults
  }
}
</script>

<style>

  @import url('https://fonts.googleapis.com/css?family=Oswald');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 20pt;
    font-family: 'Oswald', sans-serif;
  }

  .noSelect {
    user-select: none;
  }

  .whatIsIt {
    content: '';
    background-color: #ffffff;

    height: 60px;
    width: 60px;
    min-width: 66px;
    min-height: 66px;
    padding: 2px;
    position: fixed;
    right: 0;
    bottom: 0;
    transform: translate(-10px, -10px);
    z-index: 10;
    border-radius: 50%;
    border: 3px solid #00bb00;
    color: #00bb00;
  }

  .backToForm {
    position: static;
    width: 100%;
    opacity: 0.5;
    border: none;
    z-index: 300;
  }

  .backToForm:after {
    content: 'Вернуться';
  }

  .backToForm:hover {
    opacity: 0.7;
  }

  @media (min-width: 990px) and (min-height: 500px) {
    .backToForm {
      position: absolute;
      top: 0;
      left: 0;
      width: 20%;
      max-width: 100px;
      height: 100vh;
      cursor: pointer;
      opacity: 0.3;
    }

    .backToForm:after {
      content: '<';
    }
  }

</style>
