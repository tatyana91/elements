import { request, postRequest, putRequest, deleteRequest } from "../plugins/http";

export default {
    namespaced: true,
    state: {
        libraryRefs: []
    },
    getters: {
        libraryRefs: state => state.libraryRefs,
        libraryRefsCount: state => state.libraryRefs.length
    },
    mutations: {
        load(state, items){
            state.libraryRefs = items;
        },
        add(state, item){
            state.libraryRefs.push(item);
        },
        edit(state, item){
            let index = state.libraryRefs.findIndex(i => i.id === item.id);
            state.libraryRefs[index] = item;
        },
        hide(state, id){
            state.libraryRefs = state.libraryRefs.filter(pr => pr.id !== id);
        }
    },
    actions: {
        async load(store){
            let result = await request('library_refs');
            if (result) {
                store.commit('load', result.data);
            }
        },
        async add(store, data){
            let result = await postRequest('library_refs', data);
            if (result) {
                store.commit('add', result);
            }
        },
        async edit(store, data){
            let result = await putRequest(`library_refs/${data.id}`, data);
            if (result) {
                store.commit('edit', result);
            }
        },
        async hide(store, id){
            let result = await deleteRequest(`library_refs/${id}`);
            if (result) {
                store.commit('hide', id);
            }
        }
    }
}
