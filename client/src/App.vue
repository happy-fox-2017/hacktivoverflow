<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  methods: {

  }
}
</script>

<style>
#top-menu {
  background-color: rgba(192, 192, 192, 0,5);
}
</style>
