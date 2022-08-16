<template>
    <loader :show="showLoader"/>

    <h1 class="h2">Elements ({{ total }})</h1>

    <element-show :element="currentItemShow"/>

    <div class="table-responsive">
        <table class="table table-hover table-bordered table-sm componentTable">
          <thead>
              <tr>
                <th>ID</th>
                <th class="ref">Component</th>
                <th class="ref">Group</th>
                <th class="ref">Category</th>
                <th class="fixed">Stock title</th>
                <th class="fixed">Part number</th>
                <th class="fixed">Comment</th>
                <th class="fixed">Part status</th>
                <th>Part count</th>
                <th>Count</th>
                <th class="fixed">Actions</th>
              </tr>
              <tr>
                  <th></th>
                  <th>
                      <select class="form-select js-component" name="component_ref_id" v-model="params.componentRefId">
                          <option value="">no selected</option>
                          <option v-for="component in components"
                                  :key="component.id"
                                  :value="component.id">{{ component.title}}</option>
                      </select>
                  </th>
                  <th>
                      <select class="form-select js-group" name="group_ref_id" v-model="params.groupRefId">
                          <option value="">no selected</option>
                          <option v-for="group in groups"
                                :key="group.id"
                                :value="group.id">{{ group.title}}</option>
                      </select>
                  </th>
                  <th>
                      <select class="form-select js-category" name="category_ref_id" v-model="params.categoryRefId">
                          <option value="">no selected</option>
                          <option v-for="category in categories"
                                :key="category.id"
                                :value="category.id">{{ category.title}}</option>
                      </select>
                  </th>
                  <th>
                    <input class="form-control" name="stock_title" v-model="params.stockTitle">
                  </th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
          <tr v-for="element in elementsData.data" :key="element.id">
              <td>{{ element.id }}</td>
              <td>{{ element.component_title ? element.component_title : '-' }}</td>
              <td>{{ element.group_title ? element.group_title : '-' }}</td>
              <td>{{ element.category_title ? element.category_title : '-' }}</td>
              <td>
                {{ element.stock_title }}
                <br>
                <a v-show=element.stock_link :href="element.stock_link" target="_blank" title="Open in new tab">{{ element.stock_barcode }}</a></td>
              <td>{{ element.part_number }}</td>
              <td>{{ element.comment }}</td>
              <td>{{ element.part_status ? element.part_status.title : '-' }}</td>
              <td>{{ element.part_count }}</td>
              <td>{{ element.count }}</td>
              <td class="text-nowrap">
                  <button class="btn btn-danger m-2" @click="use(element.id)">Start using</button>
              </td>
          </tr>
          </tbody>
        </table>
    </div>

    <Pagination :data="elementsData" :limit="10" @pagination-change-page="getElements" />
</template>

<script>
import { mapGetters } from 'vuex';
import {Modal} from "bootstrap";
import LaravelVuePagination from 'laravel-vue-pagination';
import { postRequest, request} from "../plugins/http";
import ElementShow from "../components/ElementShow";
import Loader from '../components/Loader.vue'

export default {
    components: {
      ElementShow,
      Loader,
      'Pagination': LaravelVuePagination
    },
    data(){
        return {
          params: {
            componentRefId: '',
            groupRefId: '',
            categoryRefId: '',
            stockTitle: '',
          },
          showLoader: false,
          currentItemShow: {},
          elementsData: {},
          total: 0,
          groups: [],
          categories: []
        }
    },
    computed: {
        ...mapGetters('components', ['components']),
        ...mapGetters('tempRanges', ['tempRanges']),
        ...mapGetters('manufacturers', ['manufacturers']),
        ...mapGetters('partStatuses', ['partStatuses']),
        componentRefId() { return this.params.componentRefId; },
        groupRefId() { return this.params.groupRefId; },
        categoryRefId() { return this.params.categoryRefId; },
        stockTitle() { return this.params.stockTitle; },
    },
    methods: {
        async use(id){
          await postRequest(`archive_elements/restore/${id}`);
          this.elementsData.data = this.elementsData.data.filter(pr => pr.id !== id);
        },
        showElement(item){
          this.currentItemShow = item;
          this.form = new Modal(document.getElementById('elementShow'), {});
          this.form.show();
        },
        async getElements(page = 1) {
          window.scrollTo(0,0);
          let url = 'archive_elements?page=' + page;
          url += (this.params.componentRefId > 0) ? `&component=${this.params.componentRefId}` : '';
          url += (this.params.groupRefId > 0) ? `&group=${this.params.groupRefId}` : '';
          url += (this.params.categoryRefId > 0) ? `&category=${this.params.categoryRefId}` : '';
          url += (this.params.libraryRefId > 0) ? `&library=${this.params.libraryRefId}` : '';
          url += (this.params.stockTitle.length > 0) ? `&stock_title=${this.params.stockTitle}` : '';
          this.elementsData = await request(url);
          this.total = this.elementsData.meta.total;
        },
        async getGroups(){
          let result = await request(`groups?component=${this.params.componentRefId}`);
          this.groups = result.data;
        },
        async getCategories(){
          let result = await request(`categories?group=${this.params.groupRefId}`);
          this.categories = result.data;
        },
        unsetCategories(){
          this.categories = {};
        }
    },
    watch: {
      componentRefId(){
        this.getElements();
        this.params.groupRefId = '';
        this.getGroups();
        this.params.categoryRefId = '';
        this.unsetCategories();
      },
      groupRefId(){
        this.getElements();
        this.params.categoryRefId = '';
        this.getCategories();
      },
      categoryRefId(){
        this.getElements();
      },
      libraryRefId(){
        this.getElements();
      },
      stockTitle(){
        this.getElements();
      }
    },
    async mounted() {
      this.showLoader = true;
      await this.getElements();
      this.showLoader = false;
    }
}
</script>

