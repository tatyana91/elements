<template>
  <div id="groupForm" class="modal fade" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">{{ formTitle }}</h3>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div v-if="formAction === 'add' || !currentItem.component_ref_id" class="mb-3">
            <label for="title" class="form-label">Component</label>
            <select name="component_ref_id" class="form-select" id="component_ref_id" v-model="currentItem.component_ref_id">
              <option value="">not selected</option>
              <option v-for="component in components" :value="component.id">{{ component.title }}</option>
            </select>
          </div>
            <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input name="title" class="form-control" id="title" v-model="currentItem.title">
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
import {mapGetters} from "vuex";

export default {
    props: {
        formTitle: { type: String, required: true },
        currentItem: { type: Object, required: true },
        formAction: { type: String, required: true }
    },
    computed: {
        ...mapGetters('components', ['components']),
        formReady(){
            return this.currentItem.component_ref_id && this.currentItem.title.length > 3;
        }
    },
    emits: [ 'add', 'edit' ],
}
</script>
