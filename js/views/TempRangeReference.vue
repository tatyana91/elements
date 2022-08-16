<template>
    <references-menu />

    <h1 class="h2">Temp ranges ({{ tempRangesCount }})</h1>

    <temp-range-form
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
                        <th class="ref">Description</th>
                        <th class="ref">Min</th>
                        <th class="ref">Max</th>
                        <th style="width: 100px !important;">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="tempRange in tempRanges" :key="tempRange.id">
                        <td>{{ tempRange.id }}</td>
                        <td>{{ tempRange.title }}</td>
                        <td>{{ tempRange.description }}</td>
                        <td>{{ tempRange.min }}</td>
                        <td>{{ tempRange.max }}</td>
                        <td class="text-nowrap">
                            <button class="btn btn-primary m-2" @click="showEditFrom(tempRange)">Edit</button>
                            <button class="btn btn-danger m-2" @click="hide(tempRange.id)">Hide</button>
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
import TempRangeForm from "../components/TempRangeForm";

export default {
    components: {
        TempRangeForm,
        ReferencesMenu
    },
    data: () => ({
        currentItem: {
          id: 0,
          title: '',
          description: '',
          min: '',
          max: ''
        },
        form: null,
        formTitle: '',
        formAction: ''
    }),
    computed: {
        ...mapGetters('tempRanges', ['tempRanges', 'tempRangesCount'])
    },
    methods: {
        ...mapActions('tempRanges', {
            addTempRange: 'add',
            editTempRange: 'edit',
            hideTempRange: 'hide' }),
        showAddFrom(){
            this.formTitle = 'Add item';
            this.formAction = 'add';
            this.currentItem = {
                id: 0,
                title: '',
                description: '',
                min: '',
                max: ''
            };
            this.form = new Modal(document.getElementById('tempRangeForm'), {});
            this.form.show();
        },
        showEditFrom(item){
            this.formTitle = `Edit item "${item.title}"`;
            this.formAction = 'edit';
            this.currentItem = {
                id: item.id,
                title: item.title,
                description: item.description,
                min: item.min,
                max: item.max
            };
            this.form = new Modal(document.getElementById('tempRangeForm'), {});
            this.form.show();
        },
        async add(){
            await this.addTempRange(this.currentItem);
            this.form.hide();
        },
        async edit(){
            await this.editTempRange(this.currentItem);
            this.form.hide();
        },
        async hide(id){
            await this.hideTempRange(id);
        }
    }
}
</script>
