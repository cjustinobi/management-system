<template>
  <div class="ripple"><div></div><div></div></div>
</template>

<script>
  export default {
    props: ['rippleStyle'],
    mounted() {
      // Adds custom ripple color.
      let parentEl = document.querySelector('.ripple')
      this.rippleStyle ? parentEl.childNodes
          .forEach(el => this.rippleStyle.border ? el.style.border = this.rippleStyle.border : '') : ''
    }
  }
</script>

<style scoped>
  .ripple {
    display: inline-block;
    position: relative;
    width: 34px;
    height: 34px;
  }
  .ripple div {
    position: absolute;
    border: 4px solid #e16c30;
    opacity: 1;
    border-radius: 50%;
    animation: ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes ripple {
    0% {
      top: 22px;
      left: 22px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: -1px;
      left: -1px;
      width: 46px;
      height: 46px;
      opacity: 0;
    }
  }
</style>