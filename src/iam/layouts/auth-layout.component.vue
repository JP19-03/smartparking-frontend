<script>
import {useAuthenticationStore} from "../services/authentication.store.js";
import {useRouter} from "vue-router";
import LanguageSwitcher from "../../public/components/language-switcher.component.vue";

export default {
  name: "auth-layout",
  components: {LanguageSwitcher},
  data() {
    return {
      authenticationStore: useAuthenticationStore(),
      router: useRouter(),
      items: [
        {
          label: this.$t('toolbar.profile'),
          icon: 'pi pi-fw pi-user',
          command: () => {
            this.router.push({ name: 'owner-profile', params: { ownerId: this.authenticationStore.currentUserId } });
          }
        },
        {
          label: this.$t('toolbar.signOut'),
          icon: 'pi pi-fw pi-sign-out',
          command: () => {
            this.authenticationStore.signOut(this.router);
          }
        },
      ]
    }
  },
  computed: {
    currentUsername() {
      const username = localStorage.getItem("username");
      if (username && username.length >= 2) {
        return username.slice(0, 2).toUpperCase();
      } else if (username && username.length === 1) {
        return username.toUpperCase();
      } else {
        return "NA";
      }
    }
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    }
  }
}
</script>

<template>
  <div class="card">
    <pv-toolbar class="bg-primary">
      <template #start>
        <router-link :to="{ name: 'parking-directory', params: { ownerId: authenticationStore.currentUserId }}">
          <img src="../../assets/images/smartparking_logo.png" alt="Logo" class="logo"/>
        </router-link>
      </template>
      <template #center>
        <router-link :to="{ name: 'parking-directory', params: { ownerId: authenticationStore.currentUserId }}"
                     class="text-white text-lg font-bold hidden md:block">
          {{ $t('toolbar.parkingDirectory') }}
        </router-link>
      </template>
      <template #end>
        <language-switcher />
        <div class="flex items-center gap-2">
          <pv-button type="button" :label="currentUsername" @click="toggle" aria-haspopup="true"
                     aria-controls="overlay_menu"
                     icon="pi pi-user" class="bg-white text-primary"
          />
          <pv-menu ref="menu" id="overlay_menu" :model="items" :popup="true"/>
        </div>
      </template>
    </pv-toolbar>
  </div>
  <main>
    <slot></slot>
  </main>
  <pv-toast/>
</template>

<style scoped>
.logo {
  height: 60px;
}
.p-button{
  height: 5vh;
}
@media (max-width: 768px) {
  .logo {
    height: 5vh;
  }
}
</style>