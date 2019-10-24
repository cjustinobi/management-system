<template>
  <div>
    <div :class="{ backdrop : showConfirm }">
      <div :class="[{'show-form': showConfirm, 'hide-form': !showConfirm}]">
        <confirm/>
      </div>
    </div>
    <notification/>
    <DashboardSidebar/>
    <div class="dashboard-container">
      <DashboardHeader/>
      <nuxt />
    </div>
  </div>
</template>

<script>
  import DashboardHeader from '../components/dashboard/Header'
  import DashboardSidebar from '../components/dashboard/Sidebar'
  export default {
    components: { DashboardSidebar, DashboardHeader }
  }
</script>

<style>
  @import '../assets/scss/dashboard.scss';
</style>
