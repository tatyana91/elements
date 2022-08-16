import { request, postRequest, putRequest, deleteRequest } from "../plugins/http";

export default {
    namespaced: true,
    state: {
        partStatuses: []
    },
    getters: {
        partStatuses: state => state.partStatuses,
        partStatusesCount: state => state.partStatuses.length
    },
    mutations: {
        load(state, items){
            state.partStatuses = items;
        },
        add(state, item){
            state.partStatuses.push(item);
        },
        edit(state, item){
            let index = state.partStatuses.findIndex(i => i.id === item.id);
            state.partStatuses[index] = item;
        },
        hide(state, id){
            state.partStatuses = state.partStatuses.filter(pr => pr.id !== id);
        }
    },
    actions: {
        async load(store){
            let result = await request('part_statuses');
            if (result) {
                store.commit('load', result.data);
            }
        },
        async add(store, data){
            let result = await postRequest('part_statuses', data);
            if (result) {
                store.commit('add', result);
            }
        },
        async edit(store, data){
            let result = await putRequest(`part_statuses/${data.id}`, data);
            if (result) {
                store.commit('edit', result);
            }
        },
        async hide(store, id){
            let result = await deleteRequest(`part_statuses/${id}`);
            if (result) {
                store.commit('hide', id);
            }
        }
    }
}
