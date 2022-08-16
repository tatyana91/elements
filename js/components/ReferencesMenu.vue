<template>
  <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
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
              { route: 'components', title: 'Components' },
              { route: 'groups', title: 'Groups' },
              { route: 'categories', title: 'Categories' },
              { route: 'manufacturers', title: 'Manufacturers' },
              { route: 'temp_ranges', title: 'Temp ranges' },
              { route: 'part_statuses', title: 'Part statuses' },
              { route: 'library_refs', title: 'Library Refs' },
              { route: 'footprints', title: 'Footprints' }
            ]
        }
    }
  }
</script>
