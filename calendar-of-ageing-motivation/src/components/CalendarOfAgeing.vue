<template>
  <div class="AgeingProfile">
    <component :is="currentPage"
               :profile="results.profile"
               :currentLifeExpectancy="results.currentLifeExpectancy"
               @showResults="showResults"
               @showProfile="showProfile"/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";


  import AgeingResults from "./AgeingResults.vue";
  import AgeingProfile from "./AgeingProfile.vue";

  @Component({
    components: {
      AgeingResults,
      AgeingProfile
    },
  })
  export default class CalendarOfAgeing extends Vue {

    // public currentPage:string = "AgeingProfile";
    public currentPage:string = "AgeingResults";
    public results:any = {};

    private showResults(results: any):void {
      this.results = results;
      this.currentPage = "AgeingResults";
    }

    private showProfile():void {
      this.currentPage = "AgeingProfile";
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

</style>