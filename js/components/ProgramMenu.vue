<template>
  <ul class="navbar-nav mr-auto">
      <li class="nav-item" role="presentation" v-for="menuItem in menu">
        <router-link :to="{ name: menuItem.route }" class="nav-link">{{ menuItem.title }}</router-link>
      </li>
  </ul>
</template>
<script>
  export default {
    data(){
        return {
            menu: [
              { route: 'home', title: 'Elements' },
              { route: 'archive_elements', title: 'Hidden elements' },
              { route: 'components', title: 'References' },
              { route: 'history', title: 'History' }
            ]
        }
    }
  }
</script>
