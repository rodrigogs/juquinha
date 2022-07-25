<template lang="pug">
v-dialog.crud-dialog-z-index(
  v-model='dialog'
  transition='dialog-bottom-transition'
  v-bind='$attrs'
)
  template(v-slot:activator='scope')
    slot(
      name='list.items.actions.show.activator'
      :context='context'
      :item='item'
      v-bind='scope'
    )
      v-tooltip(bottom)
        template(v-slot:activator="tooltipScope")
          v-btn(
            icon
            v-on="tooltipScope.on"
            v-bind="tooltipScope.attrs"
            @click.prevent="scope.on.click"
          )
            v-icon(color="info") mdi-eye
        span {{ $i18n('show') }}
  v-card
    v-card-title.primary
      v-row(no-gutters)
        slot(name='show.title' :context='context')
          v-col.flex-grow-1
            slot(name='title' :context='context')
              span {{ $i18n('show') }} {{ context.entityName.toLowerCase() }}
          v-col.flex-grow-0.text-no-wrap
            slot(name='show.actions.extra' :context='context'): span
            v-tooltip(bottom)
              template(v-slot:activator='{ on: closeOn, attrs: closeAttrs }')
                v-btn(icon @click='dialog = false' v-bind='closeAttrs' v-on='closeOn')
                  v-icon mdi-close
              span {{ $i18n('close') }}
    v-card-text
      Form(
        :value="item"
        :context="context"
        read-only action="show"
      )
        template(v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope")
          slot(:name="slot" v-bind="scope")
</template>

<script>
import Form from './_form'

export default {
  name: 'Show',
  components: {
    Form,
  },
  props: {
    item: { type: Object, required: true },
    context: { type: Object, required: true },
  },
  data: () => ({
    dialog: null,
  }),
  methods: {
    open() {
      this.dialog = true
    },
  },
}
</script>
