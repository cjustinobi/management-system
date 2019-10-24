
export const state = () => ({
  confirm: null,
  showHideConfirm: false
})

export const mutations = {
  CONFIRM (state, val) {
    state.confirm = val
  },

  SHOW_HIDE_CONFIRM (state, data) {
    data ? state.showHideConfirm = data : state.showHideConfirm = !state.showHideConfirm
  }
}

export const actions = {
  confirm({ commit }, data) {
    commit('CONFIRM', data)
  },

  showHideConfirm({ commit }, data = null) {
    commit('SHOW_HIDE_CONFIRM', data)
  }
}

export const getters = {
  confirm: state => state.confirm,
  showConfirm: state => state.showHideConfirm,
}