import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    records: []
  },
  mutations: {
    addRecord(state, record) {
      state.records.push(record)
    },
    updateTextRecord(state, record) {
      state.records[record.id].text = record.text
    },
    updateRecord(state, record) {
      state.records[record.id].date = record.date
      state.records[record.id].text = record.text
    }
  },
  getters: {
    records: (s) => s.records
  }
})