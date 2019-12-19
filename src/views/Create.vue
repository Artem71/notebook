<template>
  <div class="row">
    <div class="col-md-6 offset-md-3 mt-5">
      <form @submit.prevent="addRecord">
        <div class="form-group">
          <label for="recordDate">Введите дату для записи</label>
          <datepicker 
            id="recordDate"
            name="create-date" 
            format="DD.MM.YYYY"
            :disabled-date="disabledDate"
            ref="date"
            type="date"
            :input-attr="{ 'autocomplete': 'off' }"
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
            rows="5" 
            v-model="text"
          ></textarea>
          <div class="invalid-tooltip">Поле не должно быть пустым.</div>
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
    id: 0,
    text: '',
    invalid: false
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
    checkLength() {
      this.invalid = !this.text.length ? true : false
    },
    resetInvalid() {
      this.invalid = false
    },
    addRecord() {
      if (this.date && this.text) {
        const record = {
          id: this.id,
          date: this.date,
          createDate: Date.now(),
          text: this.text
        }

        this.$store.commit('addRecord', record)

        this.id++
        this.$refs.date.pickedValue = ''
        this.text = ''
        this.$router.push('/')
      } else {
        console.log('invalid')
      }
      
    }
  },
  components: {datepicker}
}
</script>
