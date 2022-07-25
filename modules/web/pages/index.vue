<template lang="pug">
main-card(title='Hello world!')
  v-container
    h1.mb-8 I'm a very bad frontend designer
    p As my focus was always the backend, I can say that my CSS skills were owned through the pure instinct of survival.
    p Although I cannot write decent CSS, I can totally use design system frameworks like <a href='https://next.vuetifyjs.com/'>Vuetify</a> to create very usable UIs.
    p Hope I don't harm your psyche with any aesthetic uglyness.
    br
    p Most of this project was created before Copilot existed,&nbsp;
      | but recently <a href='https://github.com/features/copilot'>Copilot</a> was added to my list of favorite tools
      | and a big chunk of the recent code was created using it.
</template>

<script setup>
import mainCard from '@/components/main-card.vue'
</script>
