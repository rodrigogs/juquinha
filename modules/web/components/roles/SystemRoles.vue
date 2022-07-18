<template lang="pug">
span(class='system-roles')
  .text-caption {{ property.title }}
  v-container.ma-0.pa-0(fluid)
    v-row(justify='space-around' )
      v-switch(
        v-model='selectedRoles.operator'
        append-icon='mdi-pencil'
        label='Operador'
        v-bind='$attrs'
      )
      v-switch(
        v-model='selectedRoles.doctor'
        append-icon='mdi-doctor'
        label='Médico'
        v-bind='$attrs'
      )
</template>

<script>
export default {
  name: 'SystemRoles',
  props: {
    value: {
      // Availability
      type: Object,
      required: true,
    },
    property: {
      type: Object,
      required: true,
    },
  },
  data() {
    const value = this.value || {}
    return {
      selectedRoles: {
        operator: !!value.operator,
        doctor: !!value.doctor,
      },
    }
  },
  watch: {
    selectedRoles: {
      deep: true,
      handler() {
        this.updateModel()
      },
    },
  },
  mounted() {
    this.updateModel()
  },
  methods: {
    updateModel() {
      this.$emit('input', this.selectedRoles)
    },
  },
}
</script>
