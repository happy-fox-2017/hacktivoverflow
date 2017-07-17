<template lang="html">
    <div class="ui container">
        <h2 class="ui header">
            <i class="comments outline icon"></i>
            All Qusetions
        </h2>
        <div class="ui huge orange animated button" tabindex="0">
            <div class="visible content">Post Question</div>
            <div class="hidden content">
                <i class="write icon"></i>
            </div>
        </div>
        <h4 class="ui horizontal divider header"><i class="tag icon"></i>Display</h4>
        <div class="ui piled segment"> 
            <div class="ui relaxed divided list">
                <div class="item" v-for="question in questions">
                    <i class="big help middle aligned icon"></i>
                    <div class="content">
                        <a class="huge header">{{ question.title }}</a>
                        <br />
                        <div class="description">{{ question.question }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'question',
        methods: {
            ...mapActions([
                'getAllQuestionsMethod'
            ])
        },
        computed: mapGetters({
            questions: 'getQuestionsData'
        }),
        created () {
            this.getAllQuestionsMethod();
        }
    }
</script>

<style scoped>
    .ui.container {
        padding-top: 140px;
    }
    .huge.header {
        font-size: 1.4em;
    }
</style>