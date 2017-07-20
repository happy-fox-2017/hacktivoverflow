<template>
  <div class="columns" style="margin: auto; max-width: 1060px;">
    <side-bar style="height: inherit"></side-bar>
    <questions-list></questions-list>
  </div>
</template>

<script>
import sideBar from './sideBar'
import questionsList from './questionsList'

export default {
  name: 'Homenya',
  components: {
    sideBar,
    questionsList
  },
  props: [],
  data () {
    return {
      apalah:"yaitu"
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>

  a {
    color: grey;
  }

  nav {
    max-width: 1060px;
    background: #d10808;
    margin: 0 auto;
  }

  .button {
    color: #7c7c7c;
  }

  .button.is-warning {
    background-color: #7c7c7c;
    color: white;
  }
</style>
