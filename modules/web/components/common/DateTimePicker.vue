<template lang="pug">
  v-dialog(
    v-model='dialog'
    max-width='290'
    transition="scale-transition"
  )
    template(v-slot:activator='activatorScope')
      slot(name='activator' v-bind='activatorScope')
        v-text-field(
          ref='textField'
          :value='formattedDate'
          :append-icon="noIcon ? '' : $attrs['append-icon'] || 'mdi-calendar'"
          clearable
          v-mask="'##/##/#### ##:##'"
          @input='resolveDate'
          @click:append='dialog = true'
          @click:clear='clear'
          v-bind='$attrs'
        )
    v-card(flat)
      v-toolbar(flat :class="$attrs.color || 'primary'")
        v-toolbar-title {{ $attrs.label }}
        v-spacer
        v-btn(icon @click="dialog = false")
          v-icon mdi-close

        template(v-slot:extension)
          v-tabs(v-model="step" fixed-tabs dark)
            v-tabs-slider
            v-tab(href="#date")
              v-icon mdi-calendar

            v-tab(href="#time")
              v-icon mdi-clock

      v-tabs-items(v-model="step")
        v-tab-item(value="date")
          v-date-picker.custom-picker(
            v-model='date'
            no-title
            flat
            :color='$attrs.color'
          )
        v-tab-item(value="time")
          v-time-picker.custom-picker(
            v-model='time'
            format='24hr'
            flat
            :color='$attrs.color'
          )
      v-card-actions(:class="$attrs.color || 'primary'")
        span {{ formattedDate }}
        v-spacer
        v-tooltip(bottom)
          template(v-slot:activator='{ on }')
            v-btn.white(
              icon
              v-on='on'
              @click='confirm'
            )
              v-icon(:color="$attrs.color || 'primary'") mdi-check
          span {{ $i18n('confirm') }}
</template>

<script>
import Vue from 'vue'
import formatDate from 'date-fns/format'
import parseDate from 'date-fns/parse'

export default {
  name: 'DateTimePicker',
  props: {
    value: {
      type: [Number, String],
      required: false,
      default: () => null,
    },
    outputFormat: {
      type: String,
      default: () => 'dd/MM/yyyy HH:mm',
    },
    noIcon: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      dialog: false,
      step: 'date',
      date: null,
      time: null,
    }
  },
  computed: {
    computedDate() {
      if (!this.date) return null
      if (!this.time) return parseDate(this.date, 'yyyy-MM-dd', new Date())
      try {
        return parseDate(
          `${this.date} ${this.time}`,
          'yyyy-MM-dd HH:mm',
          new Date()
        )
      } catch (err) {
        return null
      }
    },
    formattedDate() {
      if (!this.computedDate) return null
      return formatDate(this.computedDate, this.outputFormat)
    },
  },
  watch: {
    dialog() {
      Vue.nextTick(() => {
        if (!this.value) {
          this.date = null
          this.time = null
        } else {
          this.date = formatDate(this.computedDate, 'yyyy-MM-dd')
          this.time = formatDate(this.computedDate, 'HH:mm')
        }
        this.step = 'date'
      })
    },
    date() {
      if (!this.date) return
      this.step = 'time'
    },
    value() {
      if (isNaN(this.value)) return
      this.date = formatDate(new Date(this.value), 'yyyy-MM-dd')
      this.time = formatDate(new Date(this.value), 'HH:mm')
    },
  },
  methods: {
    resolveDate(string) {
      function isValidDate(d) {
        return d instanceof Date && !isNaN(d)
      }
      try {
        if (!string || string.length !== 16) return
        const resolvedDate = parseDate(string, 'dd/MM/yyyy HH:mm', new Date())
        if (isValidDate(resolvedDate))
          this.$emit('input', resolvedDate.getTime())
      } catch (err) {
        // ignore
      }
    },
    confirm() {
      if (!this.computedDate) {
        this.$emit('input', null)
      } else {
        this.$emit('input', this.computedDate.getTime())
      }
      this.dialog = false
    },
    clear() {
      this.$emit('input', null)
    },
  },
}
</script>

<style scoped>
.v-card /deep/ .custom-picker {
  border-radius: 0 !important;
}

.v-card /deep/ .custom-picker .v-picker__title {
  padding: 2px;
  background-color: white !important;
  align-self: center !important;
}

.v-card /deep/ .custom-picker .v-time-picker-title__time * {
  height: 36px;
  font-size: 36px;
  color: var(--v-accent-base);
}
</style>
