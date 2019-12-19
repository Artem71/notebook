<template>
  <div class="row">
    <div class="col-md-6 offset-md-3 mt-5">
      <form @submit.prevent>
        <div class="form-group">
          <datepicker 
            name="create-date" 
            format="DD.MM.YYYY"
            :disabled-date="disabledDate"
            ref="date"
            :value="date"
            :input-attr="{ 'disabled': !update }"
          />
        </div>
        <div class="form-group position-relative">
          <label for="recordText">Введите текст записи</label>
          <textarea 
            @blur="checkLength"
            @input="resetInvalid"
            class="form-control" 
            :class="{'is-invalid': invalid}"
            id="recordText"
            v-model="text"
            :disabled="!update"
          ></textarea>
          <div class="invalid-tooltip">Поле не должно быть пустым.</div>
        </div>
        <div class="mt-5">
          <button 
            v-if="!update" 
            type="button" 
            @click="updateRecord" 
            class="btn btn-warning"
          >
            Обновить запись
          </button>
          <button 
            v-else 
            type="submit" 
            @click="saveChangeRecord"
            class="btn btn-success"
          >
            Сохранить обновление
          </button>
          <router-link 
            tag="button"
            to="/"
            type="button" 
            class="btn btn-primary ml-2"
          >
            На главную
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import datepicker from 'vue-date-picker'

export default {
  data: () => ({
    invalid: false,
    update: false
  }),
  computed: {
    id() {
      return this.$route.params.id
    },
    date: {
      get() {
        return this.$store.getters.records[this.id].date
      },
      set() {
        const record = {
          id: this.id,
          date: this.$refs.date.pickedValue
        }

        console.log(newDate)
        return this.$store.commit('updateDateRecord', record)
      }
    },
    text: {
      get() {
        return this.$store.getters.records[this.id].text
      }, 
      set(newText) {
        const record = {
          id: this.id,
          text: newText
        }

        console.log(newText)
        return this.$store.commit('updateTextRecord', record)
      }
    }
  },
  methods: {
    disabledDate (date) {
      return date.getTime() < Date.now()
    },
    checkLength() {
      this.invalid = !this.text.length ? true : false
    },
    resetInvalid() {
      this.invalid = false
    },
    updateRecord() {
      this.update = true
    },
    saveChangeRecord() {
      this.update = false

      const newData = {
        id: this.$route.params.id,
        date: this.$refs.date.pickedValue,
        text: this.text
      }

      this.$store.commit('updateRecord', newData)
    }
  },
  mounted() {
    this.$refs.date.value = this.date
  },
  components: {datepicker}
}
</script>