import { request, postRequest, putRequest, deleteRequest } from "../plugins/http";

export default {
    namespaced: true,
    state: {
        components: []
    },
    getters: {
        components: state => state.components
    },
    mutations: {
        load(state, items){
            state.components = items;
        },
        add(state, item){
            state.components.push(item);
        },
        edit(state, item){
            let index = state.components.findIndex(i => i.id === item.id);
            state.components[index] = item;
        },
        hide(state, id){
            state.components = state.components.filter(pr => pr.id !== id);
        },
        unset(state){
            state.components = [];
        }
    },
    actions: {
        async load(store, params = {}){
            let result = await request('components');
            if (result) {
                store.commit('load', result.data);
            }
        },
        unset(store){
            store.commit('unset');
        },
        async add(store, data){
            let result = await postRequest('components', data);
            if (result) {
                store.commit('add', result);
            }
        },
        async edit(store, data){
            let result = await putRequest(`components/${data.id}`, data);
            if (result) {
                store.commit('edit', result);
            }
        },
        async hide(store, id){
            let result = await deleteRequest(`components/${id}`);
            if (result) {
                store.commit('hide', id);
            }
        }
    }
}
