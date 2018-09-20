<template>
  <div class="WhatIsIt">
    <h1>- Зачем?</h1>
    <p>- Я не покажу вам дату смерти, я только помогу осознать что жизнь конечна.</p>
    <h1>- Что мне делать после?</h1>
    <p>- Постарайся сделать выводы для себя.</p>
    <h1>- Для кого это?</h1>
    <p>- Не знаю, а зачем ты тут?</p>
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from "vue-property-decorator";

  @Component
  export default class WhatIsIt extends Vue {

  }
</script>

<style scoped>
  .WhatIsIt {
    min-width: 320px;
  }
</style>