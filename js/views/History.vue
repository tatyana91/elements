<template>
  <h1 class="h2">History ({{ total }})</h1>

  <loader :show="showLoader"/>

  <div>
    <table class="table table-hover table-bordered table-sm componentTable">
      <thead>
      <tr>
        <th>ID</th>
        <th>Date</th>
        <th>User</th>
        <th>Entity</th>
        <th>Text</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="log in logsData.data" :key="log.id">
        <td>{{ log.id }}</td>
        <td>{{ log.created_at }}</td>
        <td>{{ log.uid }}</td>
        <td>{{ log.code_title }}</td>
        <td class="text-break">{{ log.text }}</td>
      </tr>
      </tbody>
    </table>
  </div>

  <Pagination :data="logsData" :limit="10" @pagination-change-page="getLogs" />
</template>

<script>

import Loader from '../components/Loader.vue'
import LaravelVuePagination from "laravel-vue-pagination";
import {deleteRequest, postRequest, putRequest, request} from "../plugins/http";

export default {
  components: {
    Loader,
    'Pagination': LaravelVuePagination
  },
  data(){
    return {
      logsData: {},
      total: 0,
      showLoader: false
    }
  },
  methods: {
    async getLogs(page = 1) {
      window.scrollTo(0,0);
      let url = 'logs?page=' + page;
      this.logsData = await request(url);
      this.total = this.logsData.meta.total;
    }
  },
  async mounted() {
    this.showLoader = true;
    await this.getLogs();
    this.showLoader = false;
  }
}
</script>
