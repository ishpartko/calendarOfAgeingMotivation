<template>
  <table class="AgeingTable">
    <tr v-for=""></tr>
  </table>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component
  export default class AgeingTable extends Vue {
    @Prop(Number) private propA!: number;


  }
</script>

<style scoped>

</style>