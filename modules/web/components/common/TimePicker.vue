<template lang="pug">
v-dialog(
  v-model='dialog'
  max-width='290'
  transition="scale-transition"
)
  template(v-slot:activator='activatorScope')
    slot(name='activator' v-bind='activatorScope')
      v-text-field(
        :value='time'
        :append-icon="noIcon ? '' : $attrs['append-icon'] || 'mdi-clock'"
        :readonly="true"
        v-bind='$attrs'
        v-mask="'##:##'"
        @mousedown="dialog = true"
        @click:append="dialog = true"
      )
  v-card(flat)
    v-toolbar(flat :class="$attrs.color || 'primary'")
      v-toolbar-title {{ $attrs.label }}
      v-spacer
      v-btn(icon @click="dialog = false")
        v-icon mdi-close

    v-time-picker.custom-picker(
      v-model='time'
      format='24hr'
      flat
      :color='$attrs.color'
    )
    v-card-actions(:class="$attrs.color || 'primary'")
      span {{ time }}
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
export default {
  name: 'TimePicker',
  props: {
    value: {
      type: String,
      required: false,
      default: () => {
        const now = new Date()
        return `${String(now.getHours()).padStart(2, '0')}:${String(
          now.getMinutes()
        ).padStart(2, '0')}`
      },
    },
    noIcon: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      dialog: false,
      time: this.value,
    }
  },
  methods: {
    confirm() {
      this.$emit('input', this.time)
      this.dialog = false
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
