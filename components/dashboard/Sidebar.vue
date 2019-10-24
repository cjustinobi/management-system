<template>
  <div class="sidebar" ref="sidebar">
    <button class="hide-sidebar" @click.prevent="hideSidebar">hide</button>
    <span class="dropdown" @click.stop="toggleDropDownLink">Products</span>
    <div class="panel">
      <span>Lines</span>
      <span>Stocks</span>
      <span>Categories</span>
    </div>
    <span class="dropdown" @click.stop="toggleDropDownLink">Testing</span>
    <div class="panel">
      <span>Testing</span>
      <span>Testing</span>
      <span>Testing</span>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      hideSidebar() {
        document.querySelector('.sidebar').style.width = '0'
        document.querySelector('.dashboard-container').style.marginLeft = '0'
      },
      toggleDropDownLink(element) {
        element.target.classList.toggle("active")
        if (element.target.nextElementSibling.style.display === 'block') {
          element.target.nextElementSibling.style.display = 'none'
          element.target.nextElementSibling.style.transition = '3s ease-in-out'
        } else {
          element.target.nextElementSibling.style.display = 'block'
          element.target.nextElementSibling.style.transition = '3s ease-in-out'
        }

      }
    },
    mounted() {
      // this.toggleDropDownLink()
    }
  }
</script>

<style scoped lang="scss">
  .dropdown {
    display: block;
    background-color: #eee;
    color: #444;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    transition: 1s;
    &:after{
      content: '\02795'; /* Unicode character for "plus" sign (+) */
      font-size: 13px;
      color: #777;
      float: right;
      margin-left: 5px;
    }
  }
  .active, .dropdown:hover {
    background-color: #ccc;
  }
  .active:after {
    content: "\2796"; /* Unicode character for "minus" sign (-) */
  }
  .panel {
    display: none;
    background-color: white;
    overflow: hidden;
    transition: 2s ease-out;
    span{
      display: block;
      padding: 12px 32px;
      cursor: pointer;
      &:hover{
        background: #7f828b;
      }
    }
  }
  .hide-sidebar{
    position: absolute;
    top: 10px;
    right: 10px;
  }
</style>