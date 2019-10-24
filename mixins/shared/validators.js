export default {
  methods: {
    validatePhone (phone) {
      if (phone.match(/[a-z]/i)) {
        this.$store.dispatch('notifications/setStatus', { messages: ['Provide valid phone number'], success: false })
      }
    },

    validateEmail (email) {
      let re = /\S+@\S+\.\S+/
      if (!re.test(email)) {
        this.$store.dispatch('notifications/setStatus', { messages: ['Provide valid email'], success: false })
      }
    }
  }
}