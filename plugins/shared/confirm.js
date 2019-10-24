
import Vue from 'vue'
import Confirm from '../../components/shared/Confirm'

Vue.component('confirm', Confirm)

Vue.mixin({
  methods: {
    confirmAction() {
      return new Promise(resolve => {
        this.$store.dispatch('confirm/showHideConfirm')
        this.$bus.$on('confirm', e => {
          if (e) {
            resolve(e)
          }
        })
      })
    }
  },

  computed: {
    showConfirm() {
      return this.$store.getters['confirm/showConfirm']
    }
  }
})