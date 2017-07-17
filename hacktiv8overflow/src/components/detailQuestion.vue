<template>
  <div class="columns" style="margin: auto; max-width: 1060px;">
    <side-bar style="height: inherit"></side-bar>
    <comp-detail-quest :quest-id="questId"></comp-detail-quest>
  </div>
</template>

<script>
import sideBar from './sideBar'
import compDetailQuest from './compDetailQuest'

export default {
  name: 'detail-question',
  components: {
    sideBar,
    compDetailQuest
  },
  props: ["questId"],
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
