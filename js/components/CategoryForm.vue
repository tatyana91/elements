<template>
    <div id="categoryForm" class="modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">{{ formTitle }}</h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div v-if="formAction === 'add'" class="mb-3">
                        <label for="title" class="form-label">Component</label>
                        <select name="component_ref_id" class="form-select" id="component_ref_id"
                                @change="changeComponents"
                                v-model="currentItem.component_ref_id">
                            <option value="">not selected</option>
                            <option v-for="component in components" :value="component.id">{{ component.title }}</option>
                        </select>
                    </div>
                    <div v-if="formAction === 'add'" class="mb-3">
                        <label for="title" class="form-label">Group</label>
                        <select name="group_ref_id" class="form-select" id="group_ref_id"
                                v-model="currentItem.group_ref_id">
                            <option value="">not selected</option>
                            <option v-for="group in groups" :value="group.id">{{ group.title }}</option>
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
import {request} from "../plugins/http";

export default {
    props: {
        formTitle: { type: String, required: true },
        currentItem: { type: Object, required: true },
        formAction: { type: String, required: true }
    },
    data(){
        return {
            components: [],
            groups: [],
            firstStart: true
        }
    },
    computed: {
        componentRefId() { return this.currentItem.component_ref_id; },
        formReady(){
            if (this.formAction === 'add') {
              return this.currentItem.component_ref_id
                  && this.currentItem.group_ref_id
                  && this.currentItem.title.length > 3;
            }
            return this.currentItem.title.length > 3;
        }
    },
    methods: {
        async loadComponents(){
            let result = await request('components');
            this.components = result.data;
        },
        async loadGroups(){
            let result = await request(`groups?component=${this.currentItem.component_ref_id}`);
            this.groups = result.data;
        },
        async changeComponents(){
          await this.loadGroups();
          this.currentItem.group_ref_id = "";
        }
    },
    watch: {
        componentRefId(){
            if (this.firstStart) {
              this.loadGroups();
              this.firstStart = false;
            }
        }
    },
    created(){
        this.loadComponents();
    },
    emits: [ 'add', 'edit' ],
}
</script>
