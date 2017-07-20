<template>
  <div class="columns" style="margin: auto; max-width: 1060px;">
    <side-bar style="height: inherit"></side-bar>
    <comp-new-quest></comp-new-quest>
  </div>
</template>

<script>
import sideBar from './sideBar'
import compNewQuest from './compNewQuest'

export default {
  name: 'new-question',
  components: {
    sideBar,
    compNewQuest
  },
  data () {
    return {
    }
  },
  methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.label {
  text-align: left;
}
</style>
