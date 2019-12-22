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
            rows="10"
          ></textarea>
          <div class="invalid-tooltip">Поле не должно быть пустым.</div>
        </div>
        <div class="mt-5">
          <button 
            v-if="!update" 
            type="button" 
            @click="updateRecord" 
            class="btn btn-warning mb-2"
          >
            Редактировать запись
          </button>
          <button 
            v-else 
            type="submit" 
            @click="saveChangeRecord"
            class="btn btn-success mb-2"
          >
            Сохранить изменения
          </button>
          <button
            type="button" 
            @click="deleteRecord"
            class="btn btn-danger ml-2 mb-2"
          >
            Удалить запись
          </button>
          <router-link 
            tag="button"
            to="/"
            type="button" 
            class="btn btn-primary ml-2 mb-2"
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
    update: false,
    warning: false
  }),
  computed: {
    id() {
      return this.$route.params.id
    },
    date: {
      get() {
        const record = this.$store.getters.records.filter(r => {
          return r.id == this.id
        })
        
        return record[0].date
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
        const record = this.$store.getters.records.filter(r => {
          return r.id == this.id
        })

        return record[0].text
      }, 
      set(newText) {
        const updateRecord = {
          id: this.id,
          date: this.date,
          text: newText
        }

        this.$store.commit('updateRecord', updateRecord)
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
      if (this.text && this.text.length < 1024) {
        this.update = false

        const newData = {
          id: this.id,
          date: this.$refs.date.pickedValue,
          text: this.text
        }

        this.$store.dispatch('updateRecord', newData)
      } else {
        this.invalid = true
      }
      
    },
    deleteRecord() {
      const id = this.id

      this.$store.dispatch('deleteRecord', id)
      this.$router.push('/')
    }
  },
  components: {datepicker}
}
</script>