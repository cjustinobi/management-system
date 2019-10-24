<template>
  <form>
    <FormGenerator :schema="schema" v-model="formData"/>
    <button @click.prevent="createUser">Register</button>
  </form>
</template>

<script>
  import FormGenerator from '~/components/shared/formGenerator/Form'
  import CreateUser from '~/apollo/mutations/createUser.gql'

  export default {
    components: { FormGenerator },
    data() {
      return {
        formData: {},
        schema: [
          { fieldType: "TextInput", placeholder: "First Name", label: "First Name", name: "firstName" },
          { fieldType: "TextInput", placeholder: "Last Name", label: "Last Name", name: "lastName" },
          { fieldType: "TextInput", placeholder: "Username", label: "Username", name: "username" },
          { fieldType: "TextInput", placeholder: "Phone", label: "Phone", name: "phone" },
          { fieldType: "TextInput", placeholder: "Email", label: "Email", name: "email", type: "email"},
          { fieldType: "TextInput", placeholder: "Password", label: "Password", name: "password", type: "password" },
        ]
      }
    },

    methods: {

      createUser() {
        this.$apollo.mutate({
          mutation: CreateUser,
          variables: {
            firstName: this.formData.firstName,
            lastName: this.formData.lastName,
            username: this.formData.username,
            phone: this.formData.phone,
            email: this.formData.email,
            password: this.formData.password,
          }
        }).then((data) => {
          // Result
          console.log(data)
        }).catch((error) => {
          // Error
          console.error(error)
        })
      }
    }
  }
</script>

<style scoped>

</style>
