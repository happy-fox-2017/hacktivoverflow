<template>
  <div class="row">
    <div class="col-md-9" style="padding-left: 50px;">
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
