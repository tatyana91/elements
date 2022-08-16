<template>
    <h1 class="h2">Elements ({{ total }})</h1>

    <loader :show="showLoader"/>

    <element-form
      :formAction="formAction"
      :currentItem="currentItem"
      :formTitle="formTitle"
      @add="add(currentItem)"
      @edit="edit(currentItem)"/>

    <element-show :element="currentItemShow"/>

    <div class="d-flex justify-content-between mb-2">
      <button @click="showAddFrom()" class="btn btn-primary mb-2">Add item</button>
      <button @click="loadStockData()" class="btn btn-dark">Update stock data</button>
    </div>

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
                      <select class="form-select" name="group_ref_id" v-model="params.groupRefId">
                          <option value="">no selected</option>
                          <option v-for="group in groups"
                                :key="group.id"
                                :value="group.id">{{ group.title}}</option>
                      </select>
                  </th>
                  <th>
                      <select class="form-select" name="category_ref_id" v-model="params.categoryRefId">
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
                  <button class="btn btn-secondary m-2" @click="showElement(element)">Show</button>
                  <button class="btn btn-primary m-2" @click="showEditFrom(element)">Edit</button>
                  <button class="btn btn-danger m-2" @click="hide(element.id)">Stop using</button>
              </td>
          </tr>
          </tbody>
        </table>
    </div>

    <Pagination :data="elementsData" :limit="10" @pagination-change-page="getElements" />

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ElementForm from '../components/ElementForm.vue'
import ElementShow from '../components/ElementShow.vue'
import Loader from '../components/Loader.vue'
import { Modal } from "bootstrap";
import LaravelVuePagination from 'laravel-vue-pagination';
import { deleteRequest, postRequest, putRequest, request } from "../plugins/http";

export default {
    components: {
        ElementShow,
        ElementForm,
        Loader,
        'Pagination': LaravelVuePagination
    },
    data(){
        return {
          params: {
            componentRefId: '',
            groupRefId: '',
            categoryRefId: '',
            libraryRefId: '',
            stockTitle: '',
          },
          currentItem: {
            'id': 0,
            'component_ref_id': '',
            'group_ref_id': '',
            'category_ref_id': '',
            'manufacturer_id': '',
            'part_status_id': '',
            'part_number': '',
            'library_ref_id': '',
            'footprint_ref1_id': '',
            'footprint_ref2_id': '',
            'footprint_ref3_id': '',
            'temp_range_id': '',
            'comment': '',
            'description': '',
            'help_url': '',
            'part_count': 1,
            'stock_barcode': '',
          },
          currentItemShow: {},
          form: null,
          formTitle: '',
          formAction: '',
          showLoader: false,
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
        ...mapGetters('libraryRefs', ['libraryRefs']),
        ...mapGetters('footprints', ['footprints']),
        componentRefId() { return this.params.componentRefId; },
        groupRefId() { return this.params.groupRefId; },
        categoryRefId() { return this.params.categoryRefId; },
        libraryRefId() { return this.params.libraryRefId; },
        stockTitle() { return this.params.stockTitle; },
    },
    methods: {
        ...mapActions('tempRanges', { loadTempRanges: 'load'}),
        ...mapActions('manufacturers', { loadManufacturers: 'load'}),
        ...mapActions('partStatuses', { loadPartStatuses: 'load'}),
        ...mapActions('libraryRefs', { loadLibraryRefs: 'load'}),
        ...mapActions('footprints', { loadFootprints: 'load'}),
        showAddFrom(){
            this.formTitle = 'Add item';
            this.formAction = 'add';
            this.currentItem = {
                'id': 0,
                'component_ref_id': '',
                'group_ref_id': '',
                'category_ref_id': '',
                'manufacturer_id': '',
                'part_status_id': '',
                'part_number': '',
                'library_ref_id': '',
                'footprint_ref1_id': '',
                'footprint_ref2_id': '',
                'footprint_ref3_id': '',
                'temp_range_id': '',
                'comment': '',
                'description': '',
                'help_url': '',
                'part_count': 1,
                'stock_barcode': '',
            };
            this.form = new Modal(document.getElementById('elementForm'), {});
            this.form.show();
        },
        showEditFrom(item){
            this.formTitle = `Edit item "${item.stock_title ?? '?'}"`;
            this.formAction = 'edit';
            this.currentItem = {
                'id': item.id,
                'component_ref_id': item.component_ref_id,
                'group_ref_id': item.group_ref_id ?? '',
                'category_ref_id': item.category_ref_id ?? '',
                'manufacturer_id': item.manufacturer_id ?? '',
                'part_status_id': item.part_status_id ?? '',
                'part_number': item.part_number,
                'library_ref_id': item.library_ref_id ?? '',
                'footprint_ref1_id': item.footprint_ref1_id ?? '',
                'footprint_ref2_id': item.footprint_ref2_id ?? '',
                'footprint_ref3_id': item.footprint_ref3_id ?? '',
                'temp_range_id': item.temp_range_id ?? '',
                'comment': item.comment,
                'description': item.description,
                'help_url': item.help_url,
                'part_count': item.part_count,
                'stock_barcode': item.stock_barcode
            };
            this.form = new Modal(document.getElementById('elementForm'), {});
            this.form.show();
        },
        async add(){
          let result = await postRequest('elements', this.currentItem);
          this.elementsData.data.push(result);
          this.form.hide();
        },
        async edit(){
          let result = await putRequest(`elements/${this.currentItem.id}`, this.currentItem)
          let index = this.elementsData.data.findIndex(i => i.id === this.currentItem.id);
          this.elementsData.data[index] = result;
          this.form.hide();
        },
        async hide(id){
          await deleteRequest(`elements/${id}`);
          this.elementsData.data = this.elementsData.data.filter(pr => pr.id !== id);
        },
        async loadStockData(){
            this.showLoader = true;
            let result = await request('update_stock_data');
            await this.getElements();
            let message = (result.error)
                ? result.error
                : `Success!\r\nUpdated: ${result.updated_count}, created: ${result.created_count}`;
            alert(message);
            this.showLoader = false;
        },
        showElement(item){
          this.currentItemShow = item;
          this.form = new Modal(document.getElementById('elementShow'), {});
          this.form.show();
        },
        async getElements(page = 1) {
          window.scrollTo(0,0);
          let url = 'elements?page=' + page;
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
          let result = await request(`categories?component=${this.params.componentRefId}&group=${this.params.groupRefId}`);
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

