<template lang="pug">
v-row(no-gutters).fill-height
  v-col(cols='12')
    v-card(ref='card' flat)
      v-card-text(:key='searchCols').pt-2.pb-2.pl-0.pr-0.mt-0
        v-row(dense no-gutters)
          v-col.pb-2.pr-lg-2(:cols='searchCols')
            v-alert(
              v-if='hasSummarySlot && showSummary'
              type='info'
              closable
              :close-label='$i18n("dismissSummary")'
            ).mb-0.text-caption
              template(v-slot:close)
                v-tooltip(bottom)
                  template(v-slot:activator='{ props: tooltipProps }')
                    v-icon(v-bind='tooltipProps' @click='showSummary = false') mdi-close
                  span {{ $i18n('show') }}
              // TODO Add documentation
              slot(name='list.summary' :context='context')
                span
          v-col(:cols='searchCols')
            v-text-field(
              v-model='search'
              :append-icon="(context.searchType === 'remote' && search && search.length >= 3) ? 'mdi-magnify' : undefined"
              :label="`${$i18n('search')} ${context.pluralizedEntityName.toLowerCase()}`"
              hide-details
              outlined
              dense
              clearable
              @click:append='refresh()'
              @click:clear='refresh(true)'
              @keydown.enter='search ? refresh() : refresh(true)'
            )
      v-table.elevation-1(
        :headers='headers'
        :items='items'
        :loading='true'
        :search="context.searchType === 'local' ? search : undefined"
        :items-per-page='limit'
        disable-pagination
        hide-default-footer
      )
        thead: tr
          // Cols
          // TODO Add documentation
          slot(v-for='header of headers' :name='`list.header.${header.value}`' :header='header')
            th {{ header.text }}
        tbody
          tr(v-for='item of items')
            td(v-for='header of headers.filter((header) => context.properties[header.value])')
              // TODO Add documentation
              slot(:name='`list.item.${header.value}`' :item='item' :header='header')
                span(v-if='!context.properties[header.value].enum') {{ item[header.value] }}
                span(v-else) {{ $i18n(`${context.entity}.crud.form.${header.value}.enum.${item[header.value]}`) }}
            // Actions
            td
              // TODO Add documentation
              slot(name='list.item.actions.show' :item='item')
                Show(
                  v-if='context.hasActionRead'
                  :context='context'
                  :item='item'
                  v-bind='attrs'
                )
                  template(v-for='(_, slot) of slots' v-slot:[slot]='scope')
                    slot(:name='slot' v-bind='scope')
              // TODO Add documentation
              slot(name='list.item.actions.update' :item='item')
                Update(
                  v-if='context.hasActionUpdate'
                  :context='context'
                  :update-fn='updateFn'
                  :item='item'
                  v-bind='attrs'
                  @updated='updateItem'
                )
                  template(v-for='(_, slot) of slots' v-slot:[slot]='scope')
                    slot(:name='slot' v-bind='scope')
              // TODO Add documentation
              slot(name='list.item.actions.delete' :item='item')
                Delete(
                  :context='context'
                  :delete-fn='deleteFn'
                  :item='item'
                  v-bind='attrs'
                  @deleted='removeItem(item)'
                )
                  template(v-for='(_, slot) of slots' v-slot:[slot]='scope')
                    slot(:name='slot' v-bind='scope')
              // TODO Add documentation
              slot(name='list.item.actions.extra' :item='item')
                span
        tfoot
          // TODO Add documentation
          slot(name='list.footer' :context='context')
            tr
              td(colspan='100%')
                v-container(fluid)
                  v-row(no-gutters)
                    v-col(cols='10')
                      v-pagination(
                        v-if='pagesCount'
                        v-model='currentPage'
                        color='secondary'
                        circle
                        :length='pagesCount'
                      )
                    v-col(cols='2')
                      v-combobox(
                        v-model='limit'
                        :label="$i18n('items.per.page')"
                        :items='[5, 10, 20, 50]'
                        hide-details
                      )
</template>

<script setup>
import { nextTick } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import Update from './update'
import Delete from './delete'
import Show from './show'

const { $i18n } = useNuxtApp()
const attrs = useAttrs()
const slots = useSlots()

const props = defineProps({
  readFn: { type: Function, required: true },
  updateFn: { type: Function, required: true },
  deleteFn: { type: Function, required: true },
  context: { type: Object, required: true },
})

// Refs
const card = ref(null)

// Data
const items = ref([])
const pagesLastKeys = ref([])
const search = ref('')
const limit = ref(10)
const currentPage = ref(1)
const pagesCount = ref(0)
const lastKey = ref(undefined)
const cardWidth = ref(null)
const showSummary = useLocalStorage(`dismiss-${props.context.entity}-summary`, true)
const hasActiveSearch = ref(false)
const loading = ref(false)

const headers = computed(() => {
  const propertiesToShow = props.context.properties
    ? Object.keys(props.context.properties).filter(
      (key) => props.context.properties[key].showInList
    )
    : undefined
  const itemsHeaders = propertiesToShow
    ? propertiesToShow.map((prop) => ({
      text: $i18n(`${props.context.entity}.${prop}`),
      value: prop,
    }))
    : Array.from(
      items.value.reduce(
        (props, item) => new Set([...props, ...Object.keys(item)]),
        new Set()
      )
    ).map((prop) => ({
      text: $i18n(`${props.context.entity}.${prop}`),
      value: prop,
    }))
  return [
    ...itemsHeaders,
    {
      title: '',
      value: 'actions',
      sortable: false,
      width: 150,
    },
  ]
})

const searchCols = computed(() => {
  // xs
  if (cardWidth < 600) return 12
  // sm
  else if (cardWidth < 960) return 12
  // md
  else if (cardWidth < 1264) return 6
  // lg
  else if (cardWidth < 1904) return 6
  // xl
  else if (cardWidth > 1904) return 4
  else return 12
})

const hasSummarySlot = computed(() => {
  return !!slots['list.summary']
})

watch([pagesLastKeys, pagesCount, currentPage], () => {
  fetch()
})

onMounted(() => {
  nextTick(() => {
    fetch()
    const el = card.value
    if (el) cardWidth.value = el.$el.clientWidth
  })
  window.addEventListener('resize', () => {
    const el = card.value
    if (el) cardWidth.value = el.$el.clientWidth
  })
})

async function fetch() {
  const params = {
    filter: search.value,
    limit: limit.value,
    lastKey: pagesLastKeys.value[currentPage.value],
  }

  try {
    loading.value = true
    const response = (await props.readFn(params)).data.value
    items.value = response.data

    if (response.lastKey) {
      pagesLastKeys.value[currentPage.value + 1] = response.lastKey
      pagesCount.value = pagesLastKeys.value.length - 1
    }
  } finally {
    loading.value = false
  }
}

function refresh(clearing = false) {
  // if (this.context.searchType !== 'remote') return
  // if (!clearing && (!this.search || this.search.length < 3)) return
  // if (clearing) {
  //   this.search = ''
  //   if (!this.hasActiveSearch) return
  //   this.hasActiveSearch = false
  // }
  // this.hasActiveSearch = true
  // this.$fetch()
}

function dismissSummary() {
  showSummary.value = false
}

function updateItem(updatedItem) {
  const keyPropertyName = props.context.keyProperty.name
  const itemIndex = items.value.findIndex(
    (item) => item[keyPropertyName] === updatedItem[keyPropertyName]
  )
  items.value.splice(itemIndex, 1, updatedItem)
}

function removeItem(removingItem) {
  const keyPropertyName = props.context.keyProperty.name
  const itemIndex = items.value.findIndex(
    (item) => item[keyPropertyName] === removingItem[keyPropertyName]
  )
  items.value.splice(itemIndex, 1)
}
</script>

<style scoped>
.action-column {
  padding: 0;
  margin: 0;
}
</style>
