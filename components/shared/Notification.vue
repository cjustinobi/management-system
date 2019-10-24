<template>
  <div class="notify shadow">
    <transition name="slide-fade">
      <div v-if="messages && messages.length > 0" :class="[{'error': !success},{success: success}]">
        <span v-for="(message, i) in messages">{{ message }}</span>
      </div>
    </transition>
  </div>
</template>

<script>

  import { mapGetters } from 'vuex'
  export default {

    computed: {
      ...mapGetters({
        success: 'notifications/success',
        messages: 'notifications/messages'
      })
    },
    watch: {
      success(e) {
        if (e === false || e === true) {
          setTimeout(() => {
            this.$store.dispatch('notifications/setStatus', { messages: [], success: null })
          }, 4000)
        }
      }
    }

  }
</script>

<style lang="scss" scoped>
  .notify{
    position: fixed;
    top: 10px;
    right: 10px;
    border-radius: 5px;
    padding: 12px 10px;
    color: #737373;
    transition: 1s ease-in;
    z-index: 90000;

    div{
      padding: 4px 6px;
    }
    span{
      display: block;
    }
  }
  .error{
    border: 2px solid  rgba(249, 143, 107, 0.55);
  }
  .success{
    border: 2px solid rgba(35, 145, 36, 0.85);
  }
  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(30px);
    opacity: 0;
  }
  @media(max-width: 767px) {
    .notify {
      width: 80%;
    }
  }
</style>