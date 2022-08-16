<template>
    <references-menu />

    <h1 class="h2">Categories ({{ categories.length }})</h1>

    <category-form
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
                        <th class="ref">Component</th>
                        <th class="ref">Group</th>
                        <th class="ref">Title</th>
                        <th style="width: 100px !important;">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="category in categories" :key="category.id">
                        <td>{{ category.id }}</td>
                        <td>{{ category.component_title ? category.component_title : '-' }}</td>
                        <td>{{ category.group_title ? category.group_title : '-' }}</td>
                        <td>{{ category.title }}</td>
                        <td class="text-nowrap">
                            <button class="btn btn-primary m-2" @click="showEditFrom(category)">Edit</button>
                            <button class="btn btn-danger m-2" @click="hide(category.id)">Hide</button>
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
import CategoryForm from "../components/CategoryForm.vue";
import ReferencesMenu from "../components/ReferencesMenu";
import {deleteRequest, postRequest, putRequest, request} from "../plugins/http";

export default {
    components: {
        ReferencesMenu,
        CategoryForm
    },
    data: () => ({
        currentItem: {
          id: 0,
          group_ref_id: '',
          title: ''
        },
        form: null,
        formTitle: '',
        formAction: '',
        categories: []
    }),
    methods: {
        showAddFrom(){
            this.formTitle = 'Add item';
            this.formAction = 'add';
            this.currentItem = {
                id: 0,
                component_ref_id: '',
                group_ref_id: '',
                title: ''
            };
            this.form = new Modal(document.getElementById('categoryForm'), {});
            this.form.show();
        },
        showEditFrom(item){
            this.formTitle = `Edit item "${item.title}"`;
            this.formAction = 'edit';
            this.currentItem = {
                id: item.id,
                title: item.title,
                component_ref_id: item.component_ref_id,
                group_ref_id: item.group_ref_id
            };
            this.form = new Modal(document.getElementById('categoryForm'), {});
            this.form.show();
        },
        async getCategories(){
            let result = await request('categories');
            this.categories = result.data;
        },
        async add(){
            let result = await postRequest('categories', this.currentItem);
            this.categories.push(result);
            this.form.hide();
        },
        async edit(){
            let result = await putRequest(`categories/${this.currentItem.id}`, this.currentItem);
            let index = this.categories.findIndex(i => i.id === this.currentItem.id);
            this.categories[index] = result;
            this.form.hide();
        },
        async hide(id){
            let result = await deleteRequest(`categories/${id}`);
            this.categories = this.categories.filter(pr => pr.id !== id);
        }
    },
    async mounted() {
      await this.getCategories();
    }
}
</script>
