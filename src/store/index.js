import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    records: [],
    socket: io('http://localhost:3000')
  },
  mutations: {
    setRecords(state, records) {
      state.records = records
    },
    addRecord(state, record) {
      state.records.push(record)
      console.log('add record socket')
    },
    updateRecord(state, record) {
      state.records.forEach(r => {
        if (r.id == record.id) {
          r.date = record.date
          r.text = record.text
        }
      })
    },
    deleteRecord(state, id) {
      state.records.forEach((r, i) => {
        if (r.id == id) {
          state.records.splice(i, 1)
        }
      })
    }
  },
  actions: {
    async addRecord({getters, commit}, record) {
      try {
        const res = await axios.post('http://localhost:3000/api/create', record)
        
        getters.socket.emit('add-record', record)
        getters.socket.on('add-new-record', record => {
          commit('addRecord', record)
        })
      } catch (e) {
        throw e
      }
    },
    async getAllRecords({commit, getters}) {
      try {
        const records = await axios.get('http://localhost:3000/api/records')
        await commit('setRecords', records.data)

        //getters.socket.emit('get-all-records', getters.records)
      } catch (e) {
        throw e
      }
    },
    async updateRecord({getters}, record) {
      try {
        await axios.put('http://localhost:3000/api/update', record)

        getters.socket.emit('update-record', record)
      } catch (e) {
        throw e
      }
    },
    async deleteRecord({commit, getters}, id) {
      try {
        const res = await axios.delete(`http://localhost:3000/api/delete/${id}`)
        commit('deleteRecord', id)

        getters.socket.emit('delete-record', id)
      } catch (e) {
        throw e
      }
    }
  },
  getters: {
    socket: s => s.socket,
    records: s => s.records
  }
})