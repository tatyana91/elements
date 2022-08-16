<template>
    <references-menu />

    <h1 class="h2">Part statuses ({{ partStatusesCount }})</h1>

    <part-status-form
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
                        <th style="width: 100px !important;">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="partStatus in partStatuses" :key="partStatus.id">
                        <td>{{ partStatus.id }}</td>
                        <td>{{ partStatus.title }}</td>
                        <td class="text-nowrap">
                            <button class="btn btn-primary m-2" @click="showEditFrom(partStatus)">Edit</button>
                            <button class="btn btn-danger m-2" @click="hide(partStatus.id)">Hide</button>
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
import { mapGetters, mapActions } from "vuex";
import ReferencesMenu from "../components/ReferencesMenu";
import PartStatusForm from "../components/PartStatusForm";

export default {
    components: {
        ReferencesMenu,
        PartStatusForm
    },
    data: () => ({
        currentItem: {
          id: 0,
          title: ''
        },
        form: null,
        formTitle: '',
        formAction: ''
    }),
    computed: {
        ...mapGetters('partStatuses', ['partStatuses', 'partStatusesCount'])
    },
    methods: {
        ...mapActions('partStatuses', {
            addPartStatus: 'add',
            editPartStatus: 'edit',
            hidePartStatus: 'hide' }),
        showAddFrom(){
            this.formTitle = 'Add item';
            this.formAction = 'add';
            this.currentItem = {
                id: 0,
                title: ''
            };
            this.form = new Modal(document.getElementById('partStatusForm'), {});
            this.form.show();
        },
        showEditFrom(item){
            this.formTitle = `Edit item "${item.title}"`;
            this.formAction = 'edit';
            this.currentItem = {
                id: item.id,
                title: item.title
            };
            this.form = new Modal(document.getElementById('partStatusForm'), {});
            this.form.show();
        },
        async add(){
            await this.addPartStatus(this.currentItem);
            this.form.hide();
        },
        async edit(){
            await this.editPartStatus(this.currentItem);
            this.form.hide();
        },
        async hide(id){
            await this.hidePartStatus(id);
        }
    },
}
</script>
