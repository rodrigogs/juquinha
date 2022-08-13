<template lang="pug">
v-form(ref='form' :readonly='readOnly' @submit.prevent="emit('submit')")
  v-container
    v-row
      v-col(
        v-for='(property, index) of propertiesToShow'
        :key='index'
        :cols='fieldCols'
      )
        // TODO Add documentation
        slot(:name='`form.${property.name}`' :property='property' :action='action' :form='form' :errors.sync='errors[property.name]')
          // FXIME v-model='$v.form[property.name].$model'
          v-select(
            v-if='property.enum && property.enum.length'
            v-model='formData[property.name]'
            :disabled='loading'
            :label='property.title'
            :error-messages.sync='errors[property.name]'
            :items='property.enum.map((enumValue) => ({ text: $i18n(`${context.entity}.crud.form.${property.name}.enum.${enumValue}`), value: enumValue }))'
            :hint='property.hint'
            :return-object='false'
            item-text='text'
            item-value='value'
            autocomplete='off'
          )
          // FIXME v-model='$v.form[property.name].$model'
          v-text-field(
            v-else
            v-model='formData[property.name]'
            :disabled='loading'
            :type='resolveType(property)'
            :label='property.title'
            :error-messages.sync='errors[property.name]'
            :hint='property.hint'
          )
    v-row(v-if='!readOnly')
      v-spacer
      // FIXME :disabled='$v.form.$invalid'
      v-btn(
        :loading='loading'
        type='submit'
        small
      ).mr-3.secondary {{ $i18n('save') }}
        v-icon(icon='mdi-floppy')
      v-btn(
        :disabled='loading'
        @click="$emit('cancel')"
        small
      ).error {{ $i18n('cancel') }}
        v-icon(icon='mdi-cancel')
</template>

<script setup>
import { nextTick } from 'vue'
import { get as getProperty, set as setProperty } from 'lodash'

const { $i18n } = useNuxtApp()

const emit = defineEmits()

const props = defineProps({
  value: { type: Object, required: true },
  context: { type: Object, required: true },
  loading: { type: Boolean, default: () => false },
  readOnly: { type: Boolean, default: () => false },
  action: {
    type: String,
    required: true,
    enum: ['create', 'update', 'show'],
  },
})

const form = ref(null)

const formData = computed(() => Object.keys(props.context.properties).reduce((form, property) => {
  setProperty(
    form,
    property,
    getProperty(props.value, property, props.context.properties[property].default)
  )
  return form
}, {}))

const formWidth = ref(null)

const propertySchemas = computed(() => Object.keys(props.context.properties).map((property) => {
  const cfg = props.context.properties[property]
  return {
    ...cfg,
    name: property,
    type: cfg.type || cfg,
    title: $i18n(`${props.context.entity}.${property}`),
    value: getProperty(formData.value, property),
  }
}))

const propertiesToShow = computed(() => propertySchemas.value.filter(shouldShowProperty))

const transientPropertyNames = computed(() =>
  propertySchemas.value
    .filter((prop) => prop.transient)
    .map(({ name }) => name))

const errors = computed(() => propertySchemas.value.reduce((errors, propertySchema) => {
  return {
    ...errors,
    [propertySchema.name]: [],
  }
}, {}))
// FIXME convert to vue 3
//   if (!this.$v.form[propertySchema.name].$dirty) return errors
//   const errorMessages = Object.keys(
//     propertySchema.validators || {}
//   ).reduce((messages, validatorName) => {
//     if (
//       this.$v.form[propertySchema.name][validatorName] === undefined ||
//       this.$v.form[propertySchema.name][validatorName]
//     )
//       return [...messages]
//     return [
//       ...messages,
//       `${this.context.entity}.crud.form.${propertySchema.name}.${validatorName}`,
//     ]
//   }, [])
//   return {
//     ...errors,
//     [propertySchema.name]: errorMessages.map((errorMessage) =>
//       this.$i18n(errorMessage)
//     ),
//   }
// }, {}))

const fieldCols = computed(() => {
  // xs
  if (formWidth.value < 600) return 12
  // sm
  else if (formWidth.value < 960) return 12
  // md
  else if (formWidth.value < 1264) return 6
  // lg
  else if (formWidth.value < 1904) return 4
  // xl
  else if (formWidth.value > 1904) return 2
  else return 12
})

watch(form, () => {
  // FIXME adapt to Vue 3

  // this.$v.$touch()
  // const transients = this.transientPropertyNames.reduce(
  //   (result, transientPropertyName) => {
  //     return { ...result, [transientPropertyName]: undefined }
  //   },
  //   {}
  // )
  // this.$emit('input', { ...this.form, ...transients })
})

onMounted(() => {
  window.addEventListener('resize', () => {
    const el = form.value
    if (el) formWidth.value = el.$el.clientWidth
  })
  nextTick(() => {
    const el = form.value
    if (el) formWidth.value = el.$el.clientWidth
  })
})

// FIXME convert to nuxt 3
// validations() {
//   const resolveValidators = (propValidators) =>
//     Object.keys(propValidators).reduce(
//       (validators, validatorName) => ({
//         ...validators,
//         [validatorName]: propValidators[validatorName],
//       }),
//       {}
//     )
//   const validations = this.propertySchemas.reduce((validations, property) => {
//     if (!property.validators) return { ...validations, [property.name]: {} }
//     return {
//       ...validations,
//       [property.name]: resolveValidators(property.validators),
//     }
//   }, {})
//   return { form: { ...validations } }
// },

function shouldShowProperty(property) {
  if (property.showInForm === false) return false
  if (typeof property.showInForm === 'function')
    return property.showInForm(form.value)
  return true
}

function resolveType(property) {
  if (property.password) return 'password'
  return {
    String: 'text',
    Number: 'number',
  }[property.type]
}
</script>
