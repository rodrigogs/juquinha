<template lang="pug">
v-form(ref='form' :readonly='readOnly' @submit.prevent="$emit('submit')")
  v-container
    v-row
      v-col(
        v-for='(property, index) of propertySchemas'
        v-if='shouldShowProperty(property)'
        :key='index'
        :cols='fieldCols'
      )
        slot(:name='`form.${property.name}`' :property='property' :action='action' :form='form' :errors.sync='errors[property.name]')
          v-select(
            v-if='property.enum && property.enum.length'
            v-model='$v.form[property.name].$model'
            :disabled='loading'
            :label='property.title'
            :error-messages.sync='errors[property.name]'
            :items='property.enum.map((enumValue) => ({ text: $i18n(`${context.entity}.crud.form.${property.name}.enum.${enumValue}`), value: enumValue }))'
            :hint="property.hint"
            :return-object="false"
            item-text='text'
            item-value='value'
            autocomplete='off'
          )
          v-text-field(
            v-else
            v-model='$v.form[property.name].$model'
            :disabled='loading'
            :type='resolveType(property)'
            :label='property.title'
            :error-messages.sync='errors[property.name]'
            :hint="property.hint"
          )
    v-row(v-if='!readOnly')
      v-spacer
      v-btn(
        :disabled='$v.form.$invalid'
        :loading='loading'
        type='submit'
        small
      ).mr-3.secondary {{ $i18n('save') }}
        v-icon mdi-floppy
      v-btn(
        :disabled='loading'
        @click="$emit('cancel')"
        small
      ).error {{ $i18n('cancel') }}
        v-icon mdi-cancel
</template>

<script>
import * as _ from 'lodash'
import { validationMixin } from 'vuelidate'

export default {
  name: 'Form',
  components: { validationMixin },
  props: {
    value: { type: Object, required: true },
    context: { type: Object, required: true },
    loading: { type: Boolean, default: () => false },
    readOnly: { type: Boolean, default: () => false },
    action: {
      type: String,
      required: true,
      enum: ['create', 'update', 'show'],
    },
  },
  data() {
    return {
      form: Object.keys(this.context.properties).reduce((form, property) => {
        _.set(
          form,
          property,
          _.get(this.value, property, this.context.properties[property].default)
        )
        return form
      }, {}),
      formWidth: null,
    }
  },
  computed: {
    propertySchemas() {
      return Object.keys(this.context.properties).map((property) => {
        const cfg = this.context.properties[property]
        return {
          ...cfg,
          name: property,
          type: cfg.type || cfg,
          title: this.$i18n(`${this.context.entity}.${property}`),
          value: _.get(this.form, property),
        }
      })
    },
    transientPropertyNames() {
      return this.propertySchemas
        .filter((prop) => prop.transient)
        .map(({ name }) => name)
    },
    errors() {
      return this.propertySchemas.reduce((errors, propertySchema) => {
        if (!this.$v.form[propertySchema.name].$dirty) return errors
        const errorMessages = Object.keys(
          propertySchema.validators || {}
        ).reduce((messages, validatorName) => {
          if (
            this.$v.form[propertySchema.name][validatorName] === undefined ||
            this.$v.form[propertySchema.name][validatorName]
          )
            return [...messages]
          return [
            ...messages,
            `${this.context.entity}.crud.form.${propertySchema.name}.${validatorName}`,
          ]
        }, [])
        return {
          ...errors,
          [propertySchema.name]: errorMessages.map((errorMessage) =>
            this.$i18n(errorMessage)
          ),
        }
      }, {})
    },
    fieldCols() {
      // xs
      if (this.formWidth < 600) return 12
      // sm
      else if (this.formWidth < 960) return 12
      // md
      else if (this.formWidth < 1264) return 6
      // lg
      else if (this.formWidth < 1904) return 4
      // xl
      else if (this.formWidth > 1904) return 2
      else return 12
    },
  },
  watch: {
    form: {
      deep: true,
      handler() {
        this.$v.$touch()
        const transients = this.transientPropertyNames.reduce(
          (result, transientPropertyName) => {
            return { ...result, [transientPropertyName]: undefined }
          },
          {}
        )
        this.$emit('input', { ...this.form, ...transients })
      },
    },
  },
  mounted() {
    window.addEventListener('resize', () => {
      const el = this.$refs.form
      if (el) this.formWidth = el.$el.clientWidth
    })
    this.$nextTick(() => {
      const el = this.$refs.form
      if (el) this.formWidth = el.$el.clientWidth
    })
  },
  validations() {
    const resolveValidators = (propValidators) =>
      Object.keys(propValidators).reduce(
        (validators, validatorName) => ({
          ...validators,
          [validatorName]: propValidators[validatorName],
        }),
        {}
      )
    const validations = this.propertySchemas.reduce((validations, property) => {
      if (!property.validators) return { ...validations, [property.name]: {} }
      return {
        ...validations,
        [property.name]: resolveValidators(property.validators),
      }
    }, {})
    return { form: { ...validations } }
  },
  methods: {
    shouldShowProperty(property) {
      if (property.showInForm === false) return false
      if (typeof property.showInForm === 'function')
        return property.showInForm(this.form)
      return true
    },
    resolveType(property) {
      if (property.password) return 'password'
      return {
        String: 'text',
        Number: 'number',
      }[property.type]
    },
  },
}
</script>
