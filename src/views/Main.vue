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
      <div class="col-md-6 offset-md-3">
        <div class="list-group mt-5" v-if="records.length">
          <router-link 
            tag="a"
            v-for="(rec, i) in records"
            :key="i"
            :to="'/update/' + rec.id"
            href="#" 
            class="list-group-item list-group-item-action"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{rec.date}}</h5>
              <small>{{rec.createDate | createTime}}</small>
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
  computed: {
    records() {
      return this.$store.getters.records
    }
  }
}
</script>