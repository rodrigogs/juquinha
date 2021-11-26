<template lang="pug">
  v-container(fluid fill-height)
    v-row.main-row(
      fill-height
      :align-content="error.fromMiddleware ? 'center' : ''"
    )
      v-col(v-if='!error.fromMiddleware').text-center
        h1 {{ errorMessage }}
        NuxtLink(to='/') Voltar
      v-col(v-else).text-center
        v-alert(type='warning' color='warning darken-3' outlined prominent)
          h3 Seu usuário foi criado mas ainda não tem permissão para acessar o sistema.
          br
          p Entre em contato com um administrador para liberar o acesso.
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: 'Página não encontrada',
      otherError: 'Ocorreu um erro',
      forbidden: 'Acesso restrito',
      unauthorized: 'Não autorizado',
    }
  },
  head() {
    return {
      title: this.errorMessage,
    }
  },
  computed: {
    errorMessage() {
      return this.error.response
        ? {
            401: this.unauthorized,
            403: this.forbidden,
            404: this.pageNotFound,
          }[this.error.response.status] || this.otherError
        : this.error.message
    },
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
