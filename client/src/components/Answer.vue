<template lang="html">
    <div style="padding-top: 70px; padding-bottom: 40px;">
        <div class="ui container">
            <div class="ui grid">
                <div class="sixteen wide column">
                    <br /><br /><br />
                    <div class="ui blue card" style="width: 100%">
                        <div class="content">
                            <div class="header">{{ oneQuestion.title }}</div>
                        </div>
                        <div class="content">
                            <div class="description">
                                <span>{{ oneQuestion.question }}</span>
                            </div>
                        </div>
                        <div class="content">
                            <span class="right floated">
                                <i class="heart outline like icon" @click="checkQuestionLikeStatus(oneQuestion)"></i>
                                {{ oneQuestion.like.length }} likes
                            </span>
                            <i class="comment icon"></i>
                            {{ answers.length }} comments
                        </div>
                    </div>                
                </div>
            </div>
        </div>
        <br /><br /><br />
        <div class="ui text container">
            <div class="ui grid">
                <div class="sixteen wide column">
                    <div class="ui orange card" style="width: 100%" v-for="answer in answers">
                        <div class="content">
                            <div class="ui white right floated compact icon button" @click="deleteOwnAnswer(answer)" style="background-color: white;"><i class="trash icon"></i></div>
                            <div class="header"></div>
                        </div>
                        <div class="content">
                            <div class="description">
                                <span>{{ answer.content }}</span>
                            </div>
                        </div>
                        <div class="content">
                            <i class="heart outline like icon" @click="checkAnswerLikeStatus(answer._id, answer.like)"></i>
                            {{ answer.like.length }} likes
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui bottom fixed huge menu" style="height: 70px; background-color: rgba(255, 255, 255, 0.88);">
            <div class="item" style="padding-right: 430px;"></div>
            <div class="item" style="width: 600px;">
                <div class="ui action input">
                    <input type="text" placeholder="Input jawaban baru..." v-model="newAnswer.content" @keyup.13="createNewAnswerMethod(newAnswer)">
                    <div class="ui orange button" @click="createNewAnswerMethod(newAnswer)"><i class="large send icon"></i></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'answer',
    data () {
        return {
            newAnswer: {
                content: '',
                author: localStorage._id,
                questionId: this.$route.params.id
            },
            like: [],
            questionId: this.$route.params.id,
            ids: {
                answerId: '',
                questionId: this.$route.params.id
            }
        }
    },
    methods: {
        ...mapActions([
            'getOneQuestionWithAnswerMethod',
            'addLikeOnQuestionMethod',
            'removeLikeOnQuestionMethod',
            'addAnswerLikeMethod',
            'removeAnswerLikeMethod',
            'createNewAnswerMethod',
            'deleteAnswerMethod'
        ]),
        checkQuestionLikeStatus (question) {
            if(localStorage.token){
                let self = this,
                likes = question.like;
                statusTrue = 0,
                statusFalse = 0;
                for(let i = 0; i < likes.length; i++){
                    if(localStorage._id === likes[i]){
                        statusTrue = 1;
                    } else {
                        statusFalse = 1
                    }
                }
                if(statusTrue === 1){
                    self.removeLikeOnQuestionMethod(question._id);
                } else {
                    self.addLikeOnQuestionMethod(question._id);
                }
            } else {
                alert('Anda harus log in terlebih dahulu!');
            }
        },
        checkAnswerLikeStatus (answerId, likes) {
            if(localStorage.token){
                let self = this,
                statusTrue = 0,
                statusFalse = 0;
                for(let i = 0; i < likes.length; i++){
                    if(localStorage._id === likes[i]){
                        statusTrue = 1;
                    } else {
                        statusFalse = 1
                    }
                }
                self.ids.answerId = answerId
                if(statusTrue === 1){
                    self.removeAnswerLikeMethod(self.ids);
                } else {
                    self.addAnswerLikeMethod(self.ids);
                }
            } else {
                alert('Anda harus log in terlebih dahulu!');
            }
        },
        deleteOwnAnswer (answer) {
            if(answer.author === localStorage._id){
                let answerData = {
                    answerId: answer._id,
                    questionId: this.oneQuestion._id
                }
                this.deleteAnswerMethod(answerData)
            } else {
                alert('Tidak bisa menghapus Jawaban ini, ini punya orang lain!, Hanya bisa menghapus punya anda!')
            }
        } 
    },
    computed: mapGetters({
        oneQuestion: 'getOneQuestionData',
        answers: 'getAnswersData'
    }),
    created () {
        this.getOneQuestionWithAnswerMethod(this.questionId);
    }
}   
</script>

<style scoped>
    
</style>