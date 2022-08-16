import { request, postRequest, putRequest, deleteRequest } from "../plugins/http";

export default {
    namespaced: true,
    state: {
        footprints: []
    },
    getters: {
        footprints: state => state.footprints,
        footprintsCount: state => state.footprints.length
    },
    mutations: {
        load(state, items){
            state.footprints = items;
        },
        add(state, item){
            state.footprints.push(item);
        },
        edit(state, item){
            let index = state.footprints.findIndex(i => i.id === item.id);
            state.footprints[index] = item;
        },
        hide(state, id){
            state.footprints = state.footprints.filter(pr => pr.id !== id);
        }
    },
    actions: {
        async load(store){
            let result = await request('footprints');
            if (result) {
                store.commit('load', result.data);
            }
        },
        async add(store, data){
            let result = await postRequest('footprints', data);
            if (result) {
                store.commit('add', result);
            }
        },
        async edit(store, data){
            let result = await putRequest(`footprints/${data.id}`, data);
            if (result) {
                store.commit('edit', result);
            }
        },
        async hide(store, id){
            let result = await deleteRequest(`footprints/${id}`);
            if (result) {
                store.commit('hide', id);
            }
        }
    }
}
