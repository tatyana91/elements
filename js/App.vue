<template>
  <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
    <div class="container-fluid">
      <div class="dropdown me-4">
        <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
          Main menu
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
          <li v-for="mainMenuItem in mainMenuItems">
            <a class="dropdown-item" :href="mainMenuItem.href">{{ mainMenuItem.title }}</a>
          </li>
        </ul>
      </div>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
        <program-menu />

        <ul class="navbar-nav ml-auto">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{ userData.user }}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
              <a class="dropdown-item" :href="userData.changePasswordLink">
                Change Password
              </a>
              <a class="dropdown-item" :href="userData.logoutLink">
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <main class="py-4">
    <div class="container-fluid">
      <router-view />
    </div>
  </main>
</template>
<script>
import ProgramMenu from '../js/components/ProgramMenu.vue';
import {request} from "../js/plugins/http.js";
export default {
  components: {
    ProgramMenu
  },
  data(){
    return {
      mainMenuItems: {},
      userData: {}
    }
  },
  methods: {
    async getMenu() {
      this.mainMenuItems = await request('menu');
    },
    async getUserData() {
      this.userData = await request('user');
    }
  },
  async mounted() {
    await this.getMenu();
    await this.getUserData();
  }
}
</script>

<style>
.componentTable {
  background: #fff;
}

.componentTable th {
  white-space: nowrap;
}
.componentTable th.fixed {
  width: 130px !important;
  min-width: 130px !important;
  max-width: 130px !important;
}
.componentTable th.num {
  width: 35px !important;
  min-width: 35px !important;
  max-width: 35px !important;
}
.componentTable th.ref {
  width: 180px !important;
  min-width: 180px !important;
  max-width: 180px !important;
}

.sr-only {
  display: none;
}
</style>