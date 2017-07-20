<template lang="html">
    <div class="ui container">
        <h2 class="ui header">
            <i class="comments outline icon"></i>
            All Qusetions
        </h2>
        <div class="ui large orange animated button" tabindex="0" @click="showModalQuestion">
            <div class="visible content">Post Question</div>
            <div class="hidden content">
                <i class="write icon"></i>
            </div>
        </div>
        <br /><br /><br />
        <div class="ui link cards" v-if="questions.length>0">
            <div class="card" style="width: 100%" v-for="question in questions">
                <div class="content">
                    <div class="ui right floated compact icon button" style="background-color: white;" @click="deleteOwnQuestion(question)"><i class="trash icon"></i></div>
                    <div class="header" @click="goToAnswerComponent(question._id)">{{ question.title }}</div>
                </div>
                <div class="content">
                    <div class="description">
                        <span>{{ question.question }}</span>
                    </div>
                </div>
                <div class="content">
                    <span class="right floated" @click="checkLikeStatus(question)">
                        <i class="heart outline like icon"></i>
                        {{ question.like.length }} likes
                    </span>
                    <span @click="goToAnswerComponent(question._id)"><i class="comment icon"></i>
                    {{ question.answers.length }} comments</span>
                </div>
            </div>
        </div>
        <div class="ui error message" v-if="questions.length == 0">
            <div class="header">Cannot get some question</div>
            <p>Tidak dapat menemukan apapun, mungkin akan ada jika anda mulai menulis tentang hal ini</p>
        </div>
        <!-- modal untuk create new question -->
        <div class="ui modal" id="modal-question">
            <i class="close icon"></i>
            <div class="header">
                Create New Question
            </div>
            <div class="description" style="padding-left: 20px; padding-right: 20px; padding-top: 25px; padding-bottom: 30px;">
                <form class="ui form">
                    <div class="field">
                        <label>Title</label>
                        <input type="text" placeholder="Tulis Judulnya..." v-model="newQuestions.title">
                    </div>
                    <div class="field">
                        <label>Question</label>
                        <textarea rows="4" placeholder="Tulis pertanyaan..." v-model="newQuestions.question"></textarea>
                    </div>
                </form>
            </div>
            <div class="actions">
                <div class="ui black deny button">
                    Nope
                </div>
                <div class="ui positive right labeled icon button" @click="createNewQuestion">
                    Create Question
                    <i class="checkmark icon"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'question',
        data () {
            return {
                newQuestions: {
                    title: '',
                    question: '',
                    token: localStorage.token,
                    author: localStorage._id
                }
            }
        },
        methods: {
            ...mapActions([
                'getAllQuestionsMethod',
                'createNewQuestionsMethod',
                'addLikeOnQuestionMethod',
                'removeLikeOnQuestionMethod',
                'getOneQuestionWithAnswerMethod',
                'deleteQuestionMethod'
            ]),
            showModalQuestion () {
                if(localStorage.token){
                    $('#modal-question')
                    .modal('setting', 'transition', 'fade up')
                    .modal('show');
                } else {
                    alert('Kamu harus login dahulu')
                }
            },
            createNewQuestion () {
                this.createNewQuestionsMethod(this.newQuestions);
            },
            goToAnswerComponent (id) {
                this.getOneQuestionWithAnswerMethod(id);
                this.$router.push(`/answer/${id}`);
            },
            checkLikeStatus (question) {
                let self = this;
                let likes = question.like
                let statusTrue = 0,
                    statusFalse = 0;
                for(let i=0; i<likes.length; i++){
                    if(localStorage._id === likes[i]){
                        statusTrue = 1;
                    } else {
                        statusFalse = 1;
                    }
                }
                if(statusTrue === 1){
                    self.removeLikeOnQuestionMethod(question._id)
                } else {
                    self.addLikeOnQuestionMethod(question._id)
                }
            },
            deleteOwnQuestion (question) {
                if(localStorage._id === question.author){
                    this.deleteQuestionMethod(question._id)
                } else {
                    alert('Anda bukan yang punya pertanyaan ini, ini punya orang lain..')
                }
            }
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
        padding-top: 100px;
    }
    .huge.header {
        font-size: 1.4em;
    }
</style>