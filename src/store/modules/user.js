export default {
    namespaced: true,
    state: {
        id: 0,
        name: '',
        roleName: ''
    },
    mutations: {
        updateId(state, id) {
            state.id = id
        },
        updateName(state, name) {
            state.name = name
        },
        updateRoleName(state, name) {
            state.roleName = name
        }
    }
}
