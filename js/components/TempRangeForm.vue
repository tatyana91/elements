<template>
    <div id="tempRangeForm" class="modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                  <h3 class="modal-title">{{ formTitle }}</h3>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="title" class="form-label">Title</label>
                        <input name="title" class="form-control" id="title" v-model="currentItem.title">
                    </div>
                    <div class="mb-3">
                        <label for="title" class="form-label">Min</label>
                        <input name="title" class="form-control" id="title"
                               @input="setDescription"
                               v-model="currentItem.min">
                    </div>
                    <div class="mb-3">
                        <label for="title" class="form-label">Max</label>
                        <input name="title" class="form-control" id="title"
                               @input="setDescription"
                               v-model="currentItem.max">
                    </div>
                    <div class="mb-3">
                      <label for="title" class="form-label">Description</label>
                      <input disabled name="title" class="form-control" id="title" v-model="currentItem.description">
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
export default {
  props: {
    formTitle: { type: String, required: true },
    currentItem: { type: Object, required: true },
    formAction: { type: String, required: true }
  },
  computed: {
    formReady(){
      return this.currentItem.min.length > 1 && this.currentItem.max.length > 1;
    }
  },
  methods: {
    setDescription(){
      this.currentItem.description = `от ${this.currentItem.min} до ${this.currentItem.max}`;
    }
  },
  emits: [ 'add', 'edit' ],
}
</script>
