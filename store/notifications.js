export const state = () =>({
  success: null,
  messages: ''
})

export const mutations = {
  SET_STATUS (state, payload) {
    if (payload.success === true) {
      state.success = payload.success
      state.messages = payload.messages
    }
    if (payload.success === false) {
      state.success = payload.success
      state.messages = payload.messages
    }
    if (payload.success === null) {
      state.success = payload.success
      state.messages = ''
    }
  }
}

export const actions = {
  setStatus({ commit}, payload) {
    commit ('SET_STATUS', payload)
  }
}

export const getters = {
  success: state => state.success,
  messages: state => state.messages
}