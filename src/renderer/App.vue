<template>
  <div id="app">
    {{data}}
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'gas-monitor',
    data () {
      return {
        data: 'hello world'
      }
    }
  }
</script>

<style>
  /* CSS */
</style>
