import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    excel: {
      headers: [],
      body: []
    },
    excelChanged1: {
      headers: [],
      body: []
    },
    excelChanged2: {
      headers: [],
      body: []
    }
  },
  mutations: {
    SET_EXCEL: (state, payload) => {
      state.excel = payload
    },
    SET_EXCEL_CHANGED_1: (state, payload) => {
      state.excelChanged1 = payload
    },
    SET_EXCEL_CHANGED_2: (state, payload) => {
      state.excelChanged2 = payload
    },
  },
  actions: {
    SET_EXCEL_ACTION({ commit }, payload) {

      commit('SET_EXCEL', payload);

    },
    SET_EXCEL_CHANGED_1_ACTION({ commit }, payload) {

      commit('SET_EXCEL_CHANGED_1', payload);

    },
    SET_EXCEL_CHANGED_2_ACTION({ commit }, payload) {

      commit('SET_EXCEL_CHANGED_2', payload);

    },
  },
  getters: {
    excelChanged1: state => {
      return state.excelChanged1
    },
    excelChanged2: state => {
      return state.excelChanged2
    },
    excel: state => {
      return state.excel
    }
  },
  modules: {
  }
})
