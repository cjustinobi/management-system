<template>
  <header>
    <button @click.prevent="showSidebar">toggle</button>
  </header>
</template>

<script>
  export default {
    methods: {
      showSidebar() {
        document.querySelector('.sidebar').style.width = '220px'
        document.querySelector('.dashboard-container').style.marginLeft = '220px'
      }
    }
  }
</script>