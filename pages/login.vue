<template>
  <form>
    <FormGenerator :schema="schema" v-model="formData"/>
    <button v-if="!loading" @click.prevent="login">Login</button>
    <Loading v-else/> <!-- Customize color with rippleStyle.border option -->
  </form>
</template>

<script>
  import Loading from '~/components/shared/Loading'
  import validators from '~/mixins/shared/validators'
  import LoginUser from '~/apollo/mutations/login.gql'
  import FormGenerator from '~/components/shared/formGenerator/Form'

  export default {
    components: { Loading, FormGenerator },
    mixins: [validators],
    data() {
      return {
        formData: {},
        schema: [
          { fieldType: "TextInput", placeholder: "Email", label: "Email", name: "email" },
          { fieldType: "TextInput", placeholder: "Password", label: "Password", name: "password", type: "password" },
        ],
        loading: false
      }
    },
    methods: {
      login() {
        if (this.formData.email === '' && this.formData.password === '') {
            return this.$store.dispatch('notifications/setStatus', { messages: ['All fields are required'], success: false })
        }

        let re = /\S+@\S+\.\S+/
        if (!re.test(this.formData.email)) {
          return this.$store.dispatch('notifications/setStatus', { messages: ['Provide valid email'], success: false })
        }

        this.loading = true
        this.$apollo.mutate({
          mutation: LoginUser,
          variables: {
            email: this.formData.email,
            password: this.formData.password,
          }
        }).then(({data}) => {
          // Result
          this.loading = false
          if (data.loginUser.user === null) {
            return this.$store.dispatch('notifications/setStatus', { messages: ['No user found with those details'], success: false })
          }
          console.log(data)
        }).catch((error) => {
          // Error
          this.loading = false
          this.$store.dispatch('notifications/setStatus', { messages: ['User not registered'], success: false})
          console.error(error)
        })
      }
    }
  }

</script>

<style scoped>

</style>