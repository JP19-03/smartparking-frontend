<script>
import ParkingCard from "./parking-card.component.vue";

export default {
  name: "parking-list",
  components: {
    ParkingCard,
  },
  props: {
    parkings: {
      type: Array,
      required: true,
    },
  },
  methods: {
    goToRegistration() {
      this.$router.push({ name: "parking-registration" });
    }
  }
}
</script>

<template>
  <div class="p-5">
    <div class="flex justify-content-between align-items-center mb-4" id="header">
      <h1 class="text-4xl font-bold m-0 text-center">{{ $t('parkingList.title') }}</h1>
      <pv-button :label="$t('parkingList.addParking')" icon="pi pi-plus" @click="goToRegistration()"/>
    </div>
    <div class="grid">
      <div class="col-12 md:col-6 lg:col-3" v-for="(parking, index) in parkings" :key="index">
        <parking-card :parking="parking"/>
      </div>
      <p v-if="parkings.length === 0" class="text-center col-12">
        {{ $t("parkingList.noParking") }}
      </p>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  #header {
    flex-direction: column;
    gap: 10px;
  }
}
</style>