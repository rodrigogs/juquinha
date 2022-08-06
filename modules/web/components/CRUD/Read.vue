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
              slot(name='list.summary' :context='context'): span
          v-col(:cols='searchCols')
            v-text-field(
              v-model='search'
              :append-icon="(context.searchType === 'remote' && search && search.length >= 3) ? 'mdi-magnify': undefined"
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
          slot(v-for='header of headers' :name='`list.header.${header.value}`' :header='header')
            th {{ header.text }}
        tbody
          tr(v-for='item of items')
            slot(v-for='header of headers' :name='`list.item.${header.value}`' :item='item' :header='header')
              td
                span(v-if='!context.properties[header.value].enum') {{ item[header.value] }}
                span(v-else) {{ $i18n(`${context.entity}.crud.form.${header.value}.enum.${item[header.value]}`) }}
            // Actions
            slot(name='list.item.actions' :item='item')
              slot(name='list.item.actions.extra' :item='item')
                span
              td
                //- Show(
                //-   v-if='context.hasActionRead'
                //-   :context='context'
                //-   :item='scope.item'
                //-   v-bind='$attrs'
                //- )
                //-   template(v-for='(_, slot) of $slots' v-slot:[slot]='scope')
                //-     slot(:name='slot' v-bind='scope')
              td(v-if='context.hasActionUpdate')
                //- Update(
                //-   :context='context'
                //-   :update-fn='updateFn'
                //-   :item='scope.item'
                //-   v-bind='$attrs'
                //-   @updated='updateItem'
                //- )
                //-   template(v-for='(_, slot) of $slots' v-slot:[slot]='scope')
                //-     slot(:name='slot' v-bind='scope')
              td(v-if='context.hasActionDelete')
                //- Delete(
                //-   :context='context'
                //-   :delete-fn='deleteFn'
                //-   :item='scope.item'
                //-   v-bind='$attrs'
                //-   @deleted='removeItem(scope.item)'
                //- )
                //-   template(v-for='(_, slot) of $slots' v-slot:[slot]='scope')
                //-     slot(:name='slot' v-bind='scope')

  //-       template(v-slot:footer='scope')
  //-         v-divider
  //-         v-container(fluid)
  //-           v-row(no-gutters)
  //-             v-col(cols='10')
  //-               v-pagination(
  //-                 v-if='pagesCount'
  //-                 v-model='currentPage'
  //-                 color='secondary'
  //-                 circle
  //-                 :length='pagesCount'
  //-               )
  //-             v-col(cols='2')
  //-               v-combobox(
  //-                 v-model='limit'
  //-                 :label="$i18n('items.per.page')"
  //-                 :items='[5, 10, 20, 50]'
  //-                 hide-details
  //-               )
</template>

<script>
// import Update from './update'
// import Delete from './delete'
// import Show from './show'

export default {
  name: 'Read',
  // components: { Update, Delete, Show },
  props: {
    readFn: { type: Function, required: true },
    updateFn: { type: Function, required: true },
    deleteFn: { type: Function, required: true },
    context: { type: Object, required: true },
  },
  data() {
    return {
      items: [],
      pagesLastKeys: [],
      search: '',
      limit: 10,
      currentPage: 1,
      pagesCount: 0,
      lastKey: undefined,
      cardWidth: null,
      showSummary: true,
      //   String(
      //     localStorage.getItem(`dismiss-${this.context.entity}-summary`)
      //   ) !== 'true',
      hasActiveSearch: false,
    }
  },
  fetch() {
    // const params = {
    //   filter: this.search,
    //   limit: this.limit,
    //   lastKey: this.pagesLastKeys[this.currentPage],
    // }
    // return this.readFn(params).then((response) => {
    //   this.items = response.data
    //   if (response.lastKey) {
    //     this.pagesLastKeys[this.currentPage + 1] = response.lastKey
    //     this.pagesCount = this.pagesLastKeys.length - 1
    //   }
    // })
  },
  computed: {
      headers() {
        const propertiesToShow = this.context.properties
          ? Object.keys(this.context.properties).filter(
              (key) => this.context.properties[key].showInList
            )
          : undefined
        const itemsHeaders = propertiesToShow
          ? propertiesToShow.map((prop) => ({
              text: this.$i18n(`${this.context.entity}.${prop}`),
              value: prop,
            }))
          : Array.from(
              this.items.reduce(
                (props, item) => new Set([...props, ...Object.keys(item)]),
                new Set()
              )
            ).map((prop) => ({
              text: this.$i18n(`${this.context.entity}.${prop}`),
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
      },
    searchCols() {
      // xs
      if (this.cardWidth < 600) return 12
      // sm
      else if (this.cardWidth < 960) return 12
      // md
      else if (this.cardWidth < 1264) return 6
      // lg
      else if (this.cardWidth < 1904) return 6
      // xl
      else if (this.cardWidth > 1904) return 4
      else return 12
    },
      hasSummarySlot() {
        return true
      //   return !!this.$slots['list.summary']
      },
  },
  // watch: {
  //   limit() {
  //     this.pagesLastKeys = []
  //     this.pagesCount = 0
  //     this.$fetch()
  //   },
  //   currentPage() {
  //     this.$fetch()
  //   },
  // },
  mounted() {
    this.$nextTick(() => {
      const el = this.$refs.card
      if (el) this.cardWidth = el.$el.clientWidth
    })
    window.addEventListener('resize', () => {
      const el = this.$refs.card
      if (el) this.cardWidth = el.$el.clientWidth
    })
  },
  methods: {
    refresh(clearing = false) {
    //   // if (this.context.searchType !== 'remote') return
    //   // if (!clearing && (!this.search || this.search.length < 3)) return
    //   // if (clearing) {
    //   //   this.search = ''
    //   //   if (!this.hasActiveSearch) return
    //   //   this.hasActiveSearch = false
    //   // }
    //   // this.hasActiveSearch = true
    //   // this.$fetch()
    },
    dismissSummary() {
      this.showSummary = false
      // localStorage.setItem(`dismiss-${this.context.entity}-summary`, true)
    },
    // updateItem(updatedItem) {
    //   const keyPropertyName = this.context.keyProperty.name
    //   const itemIndex = this.items.findIndex(
    //     (item) => item[keyPropertyName] === updatedItem[keyPropertyName]
    //   )
    //   this.items.splice(itemIndex, 1, updatedItem)
    // },
    // removeItem(removingItem) {
    //   const keyPropertyName = this.context.keyProperty.name
    //   const itemIndex = this.items.findIndex(
    //     (item) => item[keyPropertyName] === removingItem[keyPropertyName]
    //   )
    //   this.items.splice(itemIndex, 1)
    // },
  },
}
</script>

<style scoped>
.action-column {
  padding: 0;
  margin: 0;
}
</style>
