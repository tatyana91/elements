<template>
    <references-menu />

    <h1 class="h2">Groups ({{ groups.length }})</h1>

    <group-form
        :formAction="formAction"
        :currentItem="currentItem"
        :formTitle="formTitle"
        @add="add(currentItem)"
        @edit="edit(currentItem)"/>

    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="common_data" role="tabpanel"
             aria-labelledby="common-data-tab">

            <div class="row">
                <div class="col">
                    <button @click="showAddFrom()" class="btn btn-primary mb-2">Add item</button>
                </div>
            </div>

            <div class="table-responsive">
                <table class="table table-hover table-bordered table-sm componentTable">
                    <thead>
                    <tr>
                        <th class="num">ID</th>
                        <th class="ref">Title</th>
                        <th class="ref">Component</th>
                        <th style="width: 100px !important;">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="group in groups" :key="group.id">
                        <td>{{ group.id }}</td>
                        <td>{{ group.component_title }}</td>
                        <td>{{ group.title }}</td>
                        <td class="text-nowrap">
                            <button class="btn btn-primary m-2" @click="showEditFrom(group)">Edit</button>
                            <button class="btn btn-danger m-2" @click="hide(group.id)">Hide</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from "bootstrap";
import GroupForm from "../components/GroupForm.vue";
import ReferencesMenu from "../components/ReferencesMenu";
import {deleteRequest, postRequest, putRequest, request} from "../plugins/http";

export default {
    components: {
        ReferencesMenu,
        GroupForm
    },
    data: () => ({
        currentItem: {
          id: 0,
          component_ref_id: '',
          title: ''
        },
        form: null,
        formTitle: '',
        formAction: '',
        groups: []
    }),
    methods: {
        showAddFrom(){
            this.formTitle = 'Add item';
            this.formAction = 'add';
            this.currentItem = {
                id: 0,
                component_ref_id: '',
                title: ''
            };
            this.form = new Modal(document.getElementById('groupForm'), {});
            this.form.show();
        },
        showEditFrom(item){
            this.formTitle = `Edit item "${item.title}"`;
            this.formAction = 'edit';
            this.currentItem = {
                id: item.id,
                component_ref_id: item.component_ref_id,
                title: item.title
            };
            this.form = new Modal(document.getElementById('groupForm'), {});
            this.form.show();
        },
        async add(){
            let result = await postRequest('groups', this.currentItem);
            this.groups.push(result);
            this.form.hide();
        },
        async edit(){
            let result = await putRequest(`groups/${this.currentItem.id}`, this.currentItem);
            let index = this.groups.findIndex(i => i.id === this.currentItem.id);
            this.groups[index] = result;
            this.form.hide();
        },
        async hide(id){
            await deleteRequest(`groups/${id}`);
            this.groups = this.groups.filter(pr => pr.id !== id);
        },
        async getGroups(){
            let result = await request('groups');
            this.groups = result.data;
        }
    },
    async mounted() {
      await this.getGroups();
    }
}
</script>
