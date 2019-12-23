<template>
  <div>
    <div class="row">
      <router-link
        tag="button"
        class="btn btn-primary mx-auto mt-5"
        to="/create"
      >
        Добавить новую запись
      </router-link>
    </div>
    <div class="row">
      <div v-if="loading" class="mx-auto mt-5 spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>

      <div v-else class="col-md-6 offset-md-3">
        <div class="list-group mt-5 " v-if="records.length">
          <router-link 
            tag="a"
            v-for="(rec, i) in records"
            :key="i"
            :to="'/update/' + rec.id"
            href="#" 
            class="list-group-item list-group-item-action border border-primary mb-1"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{rec.date}}</h5>
              <small>{{rec.createdAt | toLocaleDateString}}</small>
            </div>
            <p class="mb-1">{{rec.text | stringPreview}}</p>
          </router-link>
        </div>
        <h2 v-else class="mt-5">Записей еще нет</h2>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data: () => ({
    loading: true
  }),
  computed: {
    records() {
      return this.$store.getters.records
    },
    socket() {
      return this.$store.getters.socket
    }
  },
  async created() {
    await this.$store.dispatch('getAllRecords')
    
    this.socket.on('get-records', () => {
      this.$store.dispatch('getAllRecords')
    })

    this.socket.on('add-new-record', record => {
      this.$store.commit('addRecord', record)
    })

    this.socket.on('delete-record', id => {
      this.$store.commit('deleteRecord', id)
    })

    this.socket.on('update-record', record => {
      this.$store.commit('updateRecord', record)
    })

    this.loading = false
  }
}
</script>