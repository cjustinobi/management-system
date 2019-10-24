<template>
  <div class="confirm">
    <div class="btns">
      <h4>Are you sure?</h4>
      <button @click.prevent="confirmAcn(true)" class="btn yes">Yes</button>
      <button @click.prevent="confirmAcn(false)" class="btn no">No</button>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      confirmAcn(val) {
        this.$store.dispatch('confirm/showHideConfirm')
        this.$bus.$emit('confirm', val)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .confirm{
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 20px;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
  .btns{
    display: grid;
    grid-gap: 12px;
    grid-template-columns: 100px 100px;
    background: #fefefe;
    padding: 44px 30px;
    border-radius: 5px;
    h4{
      grid-column: 1 / -1;
      color: #333;
    }
  }
  .yes{
    background: #f0f0f0;
    color: #777;
  }
  .no{
    background: #2e6cb5;
  }
</style>