<template>
  <div id="elementForm" class="modal fade" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">{{ formTitle }}</h3>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="component_ref_id" class="form-label text-danger">Component *</label>
            <div class="input-group">
              <select name="component_ref_id" class="form-select" id="component_ref_id"
                      @change="changeGroups"
                      v-model="currentItem.component_ref_id">
                <option value="">not selected</option>
                <option v-for="component in components" :value="component.id">{{ component.title }}</option>
              </select>
              <button @click="loadComponents" class="btn btn-secondary" title="Reload components">
                <i class="bi bi-arrow-clockwise"></i>
              </button>
            </div>
          </div>
          <div class="mb-3">
            <label for="group_ref_id" class="form-label">Group</label>
            <select name="group_ref_id" class="form-select" id="group_ref_id"
                    @change="changeCategories"
                    v-model="currentItem.group_ref_id">
              <option value="">not selected</option>
              <option v-for="group in groups" :value="group.id">{{ group.title }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="category_ref_id" class="form-label">Category</label>
            <select name="category_ref_id" class="form-select" id="category_ref_id" v-model="currentItem.category_ref_id">
              <option value="">not selected</option>
              <option v-for="category in categories" :value="category.id">{{ category.title }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="manufacturer_id" class="form-label">Manufacturer</label>
            <div class="input-group">
              <select name="manufacturer_id" class="form-select" id="manufacturer_id" v-model="currentItem.manufacturer_id">
                <option value="">not selected</option>
                <option v-for="manufacturer in manufacturers" :value="manufacturer.id">{{ manufacturer.title }}</option>
              </select>
              <button @click="loadManufacturers" class="btn btn-secondary" title="Reload manufacturers">
                <i class="bi bi-arrow-clockwise"></i>
              </button>
            </div>
          </div>
          <div class="mb-3">
            <label for="part_status_id" class="form-label text-danger">Part status *</label>
            <div class="input-group">
              <select name="part_status_id" class="form-select" id="part_status_id" v-model="currentItem.part_status_id">
                <option value="">not selected</option>
                <option v-for="partStatus in partStatuses" :value="partStatus.id">{{ partStatus.title }}</option>
              </select>
              <button @click="loadPartStatuses" class="btn btn-secondary" title="Reload part statuses">
                <i class="bi bi-arrow-clockwise"></i>
              </button>
            </div>
          </div>
          <div class="mb-3">
            <label for="part_number" class="form-label">Part number</label>
            <input name="part_number" class="form-control" id="part_number" v-model="currentItem.part_number">
          </div>
          <div class="mb-3">
            <label for="library_ref_id" class="form-label text-danger">Library ref *</label>
            <div class="input-group">
              <select name="library_ref_id" class="form-select" id="library_ref_id" v-model="currentItem.library_ref_id">
                <option value="">not selected</option>
                <option v-for="libraryRef in libraryRefs" :value="libraryRef.id">{{ libraryRef.title }}</option>
              </select>
              <button @click="loadLibraryRefs" class="btn btn-secondary" title="Reload library refs">
                <i class="bi bi-arrow-clockwise"></i>
              </button>
            </div>
          </div>
          <div class="mb-3">
            <label for="footprint_ref1_id" class="form-label text-danger">Footprint 1 *</label>
            <div class="input-group">
              <select name="footprint_ref1_id" class="form-select" id="footprint_ref1_id" v-model="currentItem.footprint_ref1_id">
                <option value="">not selected</option>
                <option v-for="footprint in footprints" :value="footprint.id">{{ footprint.title }}</option>
              </select>
              <button @click="loadFootprints" class="btn btn-secondary" title="Reload footprints">
                <i class="bi bi-arrow-clockwise"></i>
              </button>
            </div>
          </div>
          <div class="mb-3">
            <label for="footprint_ref2_id" class="form-label">Footprint 2</label>
            <select name="footprint_ref2_id" class="form-select" id="footprint_ref2_id" v-model="currentItem.footprint_ref2_id">
              <option value="">not selected</option>
              <option v-for="footprint in footprints" :value="footprint.id">{{ footprint.title }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="footprint_ref3_id" class="form-label">Footprint 3</label>
            <select name="footprint_ref3_id" class="form-select" id="footprint_ref3_id" v-model="currentItem.footprint_ref3_id">
              <option value="">not selected</option>
              <option v-for="footprint in footprints" :value="footprint.id">{{ footprint.title }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="temp_range_id" class="form-label">Temp range</label>
            <div class="input-group">
              <select name="temp_range_id" class="form-select" id="temp_range_id" v-model="currentItem.temp_range_id">
                <option value="">not selected</option>
                <option v-for="tempRange in tempRanges" :value="tempRange.id">{{ tempRange.description }}</option>
              </select>
              <button @click="loadTempRanges" class="btn btn-secondary" title="Reload temp ranges">
                <i class="bi bi-arrow-clockwise"></i>
              </button>
            </div>
          </div>
          <div class="mb-3">
            <label for="comment" class="form-label">Comment</label>
            <input name="comment" class="form-control" id="comment" v-model="currentItem.comment">
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <input name="description"  class="form-control" id="description" v-model="currentItem.description">
          </div>
          <div class="mb-3">
            <label for="help_url" class="form-label">Help URL</label>
            <input name="help_url" class="form-control" id="help_url" v-model="currentItem.help_url">
          </div>
          <div class="mb-3">
            <label for="part_count" class="form-label text-danger">Part count *</label>
            <input name="part_count" class="form-control" id="part_count" v-model="currentItem.part_count">
          </div>
          <div class="mb-3">
            <label for="stock_barcode" class="form-label">Stock barcode</label>
            <input name="stock_barcode" class="form-control" id="stock_barcode" v-model="currentItem.stock_barcode">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <div v-show="formReady">
            <button v-if="formAction === 'add'" type="submit" class="btn btn-primary" @click="$emit('add')">Save changes</button>
            <button v-else type="submit" class="btn btn-primary" @click="$emit('edit')">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import {request} from "../plugins/http";

export default {
    props: {
      formTitle: { type: String, required: true },
      currentItem: { type: Object, required: true },
      formAction: { type: String, required: true }
    },
    data(){
      return {
          groups: [],
          categories: [],
          firstStart: true
      }
    },
    computed: {
        ...mapGetters('components', ['components']),
        ...mapGetters('tempRanges', ['tempRanges']),
        ...mapGetters('manufacturers', ['manufacturers']),
        ...mapGetters('partStatuses', ['partStatuses']),
        ...mapGetters('libraryRefs', ['libraryRefs']),
        ...mapGetters('footprints', ['footprints']),
        formReady(){
          return this.currentItem.component_ref_id > 0
                && this.currentItem.part_status_id > 0
                && this.currentItem.library_ref_id > 0
                && this.currentItem.footprint_ref1_id > 0
                && this.currentItem.part_count >= 0
        },
        componentRefId() {
          return this.currentItem.component_ref_id;
        },
        groupRefId() {
          return this.currentItem.group_ref_id;
        },
    },
    methods: {
        ...mapActions('components', {loadComponents: 'load'}),
        ...mapActions('tempRanges', {loadTempRanges: 'load'}),
        ...mapActions('manufacturers', {loadManufacturers: 'load'}),
        ...mapActions('partStatuses', {loadPartStatuses: 'load'}),
        ...mapActions('libraryRefs', {loadLibraryRefs: 'load'}),
        ...mapActions('footprints', {loadFootprints: 'load'}),
        async loadGroups(){
            let result = await request(`groups?component=${this.currentItem.component_ref_id}`);
            this.groups = result.data;
        },
        async loadCategories(){
            let result = await request(`categories?component=${this.currentItem.component_ref_id}&group=${this.currentItem.group_ref_id}`);
            this.categories = result.data;
        },
        async changeGroups(){
          await this.loadGroups();
          this.unsetCategories();
          this.currentItem.group_ref_id = "";
        },
        async changeCategories(){
          await this.loadCategories();
          this.currentItem.category_ref_id = "";
        },
        unsetCategories(){
            this.categories = {};
        }
    },
    emits: [ 'add', 'edit' ],
    watch: {
      componentRefId(){
        if (this.firstStart) {
          this.loadGroups();
          this.loadCategories();
          this.firstStart = false;
        }
      }
    }
}
</script>
