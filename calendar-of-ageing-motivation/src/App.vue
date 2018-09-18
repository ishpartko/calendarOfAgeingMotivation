<template>
  <div id="app">
    <CalendarOfAgeing/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CalendarOfAgeing from './components/CalendarOfAgeing.vue';

@Component({
  components: {
    CalendarOfAgeing,
  },
})
export default class App extends Vue {}
</script>

<style>
  @import '~vuetify/dist/vuetify.min.css';
</style>