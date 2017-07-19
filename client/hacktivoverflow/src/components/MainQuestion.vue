<template>
  <div class="row">
    <div class="col-md-8 col-md-offset-2" style="">
      <question-list></question-list>
    </div>
  </div>
</template>

<script>

import QuestionList from '@/components/QuestionList';

export default {
  name: 'MainQuestion',
  data() {
    return {
    };
  },
  methods: {

  },
  components: {
    QuestionList,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
