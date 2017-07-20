<template lang="html">
  <div class="container outer">
    <div class="row">
      <div class="col-md-3 flex-container">
        <div class="scope">
          <div class="votes">
            <p class="dempet">{{ article.upvotes.length - article.downvotes.length }}</p>
            <p>votes</p>
          </div>
        </div>
        <div class="bungkus">
          <div class="replies">
            <p class="dempet">{{ article.replies.length }}</p>
            <p>replies</p>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <h4 @click="threadDetail"><a href>{{ article.title }}</a></h4>
        <h4><small>created by {{ article.creator }}</small></h4>
      </div>
    </div>
    <div class="row" style="border-bottom: 1px solid #e0e3e5">

    </div>
  </div>
</template>

<script>
export default {
  props: ['article', 'user'],
  methods: {
    threadDetail (event) {
      event.preventDefault()
      this.$router.push({path: 'thread', query: { id: this.article._id }})
    }
  }
}
</script>

<style lang="css" scoped>
.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.vote,
.votes,
.replies {
  height: 38px;
  min-width: 20px;
  padding: 8px 5px;
  text-align: center;
}
.scope {
  margin: 0;
}
.outer {
  padding-top: 20px;
}
.scope {
  margin-bottom: 10px;
  border: 1px solid #e0e3e5;
}
</style>
