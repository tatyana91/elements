import { request, postRequest, putRequest, deleteRequest } from "../plugins/http";

export default {
    namespaced: true,
    state: {
        tempRanges: []
    },
    getters: {
        tempRanges: state => state.tempRanges,
        tempRangesCount: state => state.tempRanges.length
    },
    mutations: {
        load(state, items){
            state.tempRanges = items;
        },
        add(state, item){
            state.tempRanges.push(item);
        },
        edit(state, item){
            let index = state.tempRanges.findIndex(i => i.id === item.id);
            state.tempRanges[index] = item;
        },
        hide(state, id){
            state.tempRanges = state.tempRanges.filter(pr => pr.id !== id);
        }
    },
    actions: {
        async load(store){
            let result = await request('temp_ranges');
            if (result) {
                store.commit('load', result.data);
            }
        },
        async add(store, data){
            let result = await postRequest('temp_ranges', data);
            if (result) {
                store.commit('add', result);
            }
        },
        async edit(store, data){
            let result = await putRequest(`temp_ranges/${data.id}`, data);
            if (result) {
                store.commit('edit', result);
            }
        },
        async hide(store, id){
            let result = await deleteRequest(`temp_ranges/${id}`);
            if (result) {
                store.commit('hide', id);
            }
        }
    }
}
