<script>
export default {
  name: "language-switcher",
  data() {
    return {
      languages: ['en', 'es'],
      language: 'en'
    }
  }
}
</script>

<template>
  <pv-select-button v-model="$i18n.locale" :options="languages" class="language-switcher">
    <template #option="slotProps">
      {{ slotProps.option.toUpperCase() }}
    </template>
  </pv-select-button>
</template>

<style scoped>
.language-switcher {
  margin-left: auto;
  margin-right: 1rem;
}
.p-selectbutton {
  height: 5vh;
  width: 6rem;
}
</style>