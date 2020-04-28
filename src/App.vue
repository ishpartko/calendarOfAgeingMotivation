<template>
    <CalendarOfAgeing/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CalendarOfAgeing from './components/CalendarOfAgeing.vue'

@Component({
  components: {
    CalendarOfAgeing
  }
})
export default class App extends Vue {}
</script>
