<template>
  <div class="row">
    <div class="col-md-6 offset-md-3 mt-5">
      <form @submit.prevent="addRecord">
        <div class="form-group position-relative">
          <label class="d-block" for="recordDate">Введите дату для записи</label>
          <datepicker 
            @input="resetInvalidDate"
            id="recordDate"
            name="create-date" 
            format="DD.MM.YYYY"
            :disabled-date="disabledDate"
            ref="date"
            type="date"
            :input-attr="{ 'autocomplete': 'off' }"
            :input-class="{'is-invalid form-control border-danger': invalidDate}"
          />
          <div class="invalid-tooltip">Поле обязательное для заполнения.</div>
        </div>
          
        <div class="form-group position-relative">
          <label for="recordText">Введите текст записи</label>
          <textarea 
            @input="resetInvalidText"
            class="form-control" 
            :class="{'is-invalid': invalidText}"
            id="recordText" 
            rows="10" 
            v-model="text"
          ></textarea>
          <div class="invalid-tooltip">Поле обязательное для заполнения.</div>
        </div>
        <div class="mt-5">
          <button type="submit" class="btn btn-success">Добавить запись</button>
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
    text: '',
    invalidDate: false,
    invalidText: false
  }),
  computed: {
    date() {
      return this.$refs.date.pickedValue
    }
  },
  methods: {
    disabledDate (date) {
      return date.getTime() < (Date.now() - (86400 * 1000))
    },
    checkValidDate() {
      if (!this.date) this.invalidDate = true
    },
    checkValidText() {
      if (!this.text.length || this.text.length > 1024) this.invalidText = true
    },
    resetInvalidDate() {
      if (this.$date) this.invalidDate = false
    },
    resetInvalidText() {
      this.invalidText = false
    },
    async addRecord() {
      try {
        if (this.date && this.text) {
          const record = {
            date: this.date,
            text: this.text
          }

          await this.$store.dispatch('addRecord', record)
          this.$router.push('/')
        } else {
          this.checkValidDate()
          this.checkValidText()
        }
      } catch (e) {
        throw e
      }
    }
  },
  components: {datepicker}
}
</script>
