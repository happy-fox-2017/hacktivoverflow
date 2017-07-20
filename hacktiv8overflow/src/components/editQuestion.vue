<template>
  <div class="columns" style="margin: auto; max-width: 1060px;">
    <side-bar style="height: inherit"></side-bar>
    <comp-edit-quest :quest-id="questId"></comp-edit-quest>
  </div>
</template>

<script>
import sideBar from './sideBar'
import compEditQuest from './compEditQuest'

export default {
  name: 'edit-question',
  props: ["questId"],
  components: {
    sideBar,
    compEditQuest
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
