import { request, postRequest, putRequest, deleteRequest } from "../plugins/http";

export default {
    namespaced: true,
    state: {
        manufacturers: []
    },
    getters: {
        manufacturers: state => state.manufacturers,
        manufacturersCount: state => state.manufacturers.length
    },
    mutations: {
        load(state, items){
            state.manufacturers = items;
        },
        add(state, item){
            state.manufacturers.push(item);
        },
        edit(state, item){
            let index = state.manufacturers.findIndex(i => i.id === item.id);
            state.manufacturers[index] = item;
        },
        hide(state, id){
            state.manufacturers = state.manufacturers.filter(pr => pr.id !== id);
        }
    },
    actions: {
        async load(store){
            let result = await request('manufacturers');
            if (result) {
                store.commit('load', result.data);
            }
        },
        async add(store, data){
            let result = await postRequest('manufacturers', data);
            if (result) {
                store.commit('add', result);
            }
        },
        async edit(store, data){
            let result = await putRequest(`manufacturers/${data.id}`, data);
            if (result) {
                store.commit('edit', result);
            }
        },
        async hide(store, id){
            let result = await deleteRequest(`manufacturers/${id}`);
            if (result) {
                store.commit('hide', id);
            }
        }
    }
}
