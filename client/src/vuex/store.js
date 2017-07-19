import Vue from'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex, axios);

const Store = new Vuex.Store({
    state: {
        user: {
            id: null,
            name: '',
            email: '',
            token: ''
        },
        usersData: [],
        isLogin: false,
        questions: [],
        answers: [],
        oneQuestion: {}
    },
    getters: {
        getUserData (state) {
            return state.user
        },
        getLoginStatus (state) {
            return state.isLogin;
        },
        getAllUserData (state) {
            return state.userData;
        },
        getQuestionsData (state) {
            return state.questions;
        },
        getAnswersData (state) {
            return state.answers;
        },
        getOneQuestionData (state) {
            return state.oneQuestion;
        }
    },
    mutations: {
        setSigninInfo (state) {
            state.user.id = localStorage._id
            state.user.name = localStorage.fullname
            state.user.email = localStorage.email
            state.user.token = localStorage.token

            state.isLogin = true
        },
        clearSigninUserStatus (state) {
            state.user = {
                id: null,
                name: '',
                username: '',
                email: '',
                token: ''
            }

            state.isLogin = false
        },
        setUsersData (state, data) {
            state.usersData.push(data);
        },
        setQuestionsData (state, questions) {
            state.questions = questions;
        },
        setAnswersData (state, answers) {
            state.answers = answers;
        },
        setPushQuestionsData (state, question) {
            state.questions.push(question);
        },
        setOneQuestionData (state, question) {
            state.oneQuestion = question;
        }
    },
    actions: {
        userSignupMethod ({dispatch, commit}, userSignup) {
            axios.post('http://localhost:3000/api/user/signup/', {
                fullname: userSignup.fullname,
                username: userSignup.username,
                password: userSignup.password,
                email: userSignup.email,
                address: userSignup.address
            })
            .then((response)=>{
                alert('Terima kasih, ' + response.data.data.fullname + ', Silahkan Login menggunakan username anda!');
                console.log(response.data);
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        userSigninMethod ({dispatch, commit}, userSignin) {
            axios.post('http://localhost:3000/api/user/signin/', {
                username: userSignin.username,
                password: userSignin.password
            })
            .then((response)=>{
                alert(response.data.message);
                console.log(response.data);

                //set local storage
                if(response.data.message !== 'Username yang anda masukkan belum terdaftar'){
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('_id', response.data.id);
                    localStorage.setItem('fullname', response.data.fullname);
                    localStorage.setItem('email', response.data.email);

                    commit('setSigninInfo')
                }
            })
        },
        userSignoutMethod ({commit}) {
            localStorage.removeItem('token');
            localStorage.removeItem('fullname');
            localStorage.removeItem('_id');
            localStorage.removeItem('email');

            if(!localStorage.token && !localStorage._id) alert('Berhasil Sign Out');

            commit('clearSigninUserStatus');
        },
        //untuk mengecek pertama kali browser buka apakah sudah pernah login?
        checkTokenFromLocalStorageMethod ({ commit }) {
            if(localStorage.token) commit('setSigninInfo');
        },
        showAllUsersMethod ({commit}) {
            axios.get('http://localhost:3000/api/user')
            .then((response)=>{
                console.log('ini data users---', response.data);
                let data = response.data;
                commit('setUsersData', data);
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        //untuk question
        getAllQuestionsMethod ({ commit }) {
            axios.get('http://localhost:3000/api/question/')
            .then((response)=>{
                let questions = response.data;
                commit('setQuestionsData', questions);
            })
            .catch((err)=>{
                console.log(err);
                alert('Kesalahan di server database');
            })
        },
        createNewQuestionsMethod ({commit}, newQuestions) {
            axios.post('http://localhost:3000/api/question/', {
                title: newQuestions.title,
                question: newQuestions.question,
                author: localStorage._id
            }, {
                headers: { token: localStorage.token }
            })
            .then((response)=>{
                alert('Berhasil menambah question baru');
                console.log('ini data question baru--', response.data);
                commit('setPushQuestionsData', response.data);
            })
            .catch((err)=>{
                alert('Tidak dapat melanjutkan Anda harus login terlebih dahulu!');
                console.log(err)
            })
        },
        getOneQuestionWithAnswerMethod ({commit}, id) {
            axios.get('http://localhost:3000/api/question/'+id)
            .then((response)=>{
                commit('setOneQuestionData', response.data)
                commit('setAnswersData', response.data.answers);
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        deleteQuestionMethod ({commit}, id) {
            axios.delete('http://localhost:3000/api/question/'+ id, {
                headers: { token: localStorage.token }
            })
            .then((response)=>{
                console.log('ini response------', response);
                console.log('ini id---------------', id);
                alert('Pertanyaan anda tentang : '+response.data.title+', Berhasil di hapus')
                //get all question
                axios.get('http://localhost:3000/api/question/')
                .then((response)=>{
                    let questions = response.data;
                    commit('setQuestionsData', questions);
                })
                .catch((err)=>{
                    console.log(err);
                    alert('Kesalahan di server database');
                })
            })
            .catch((err)=>{
                alert('question gagal untuk dihapus!')
                console.log(err)
            })
        },
        createNewAnswerMethod ({commit}, newAnswer) {
            var self = this;
            axios.post('http://localhost:3000/api/answer/', {
                content: newAnswer.content,
                author: newAnswer.author
            }, {
                headers: { token: localStorage.token }
            })
            .then((response)=>{
                console.log('ini jawaban baru--', response.data);
                let newAnswerPush = {
                    questionId: newAnswer.questionId,
                    answerId: response.data._id
                }
                console.log('ini isi newAnswerPush------------------', newAnswerPush)
                axios.put('http://localhost:3000/api/question/answer/'+ newAnswerPush.questionId, {
                        answerId: newAnswerPush.answerId
                    }, {
                        headers : { token: localStorage.token }
                    })
                    .then((response)=>{
                        alert('Berhasil memasukkan jawaban baru');
                        console.log('ini question dengan answer baru--', response.data);
                        axios.get('http://localhost:3000/api/question/'+ newAnswerPush.questionId)
                            .then((response)=>{
                                commit('setOneQuestionData', response.data)
                                commit('setAnswersData', response.data.answers);
                            })
                            .catch((err)=>{
                                console.log(err)
                            })
                    })
                    .catch((err)=>{
                        alert('Kesalahan, tidak dapat memasukkan jawaban baru')
                        console.log(err)
                    })
            })
            .catch((err)=>{
                alert('Anda harus login terlebih dahulu untuk answer');
                console.log(err);
            })
        },
        deleteAnswerMethod ({commit}, answer) {
            axios.delete('http://localhost:3000/api/answer/'+ answer.answerId, {
                headers: { token: localStorage.token }
            })
            .then((response)=>{
                alert('Jawaban anda berhasil dihapus')
                //get one question
                axios.get('http://localhost:3000/api/question/'+answer.questionId)
                .then((response)=>{
                    commit('setOneQuestionData', response.data)
                    commit('setAnswersData', response.data.answers);
                })
                .catch((err)=>{
                    console.log(err)
                })
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        addLikeOnQuestionMethod ({commit}, questionId) {
            if(!localStorage.token){
                alert('Anda harus login ini like')
            } else {
                axios.put('http://localhost:3000/api/question/like/'+questionId, {
                    like: localStorage._id
                }, {
                    headers: { token: localStorage.token }
                })
                .then((response)=>{
                    //get all
                    axios.get('http://localhost:3000/api/question/')
                    .then((response)=>{
                        let questions = response.data;
                        commit('setQuestionsData', questions);
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
                    //get one
                    axios.get('http://localhost:3000/api/question/'+questionId)
                    .then((response)=>{
                        commit('setOneQuestionData', response.data)
                        commit('setAnswersData', response.data.answers);
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                })
                .catch(err => {
                    console.log(err);
                })
            }
        },
        removeLikeOnQuestionMethod ({commit}, questionId) {
            if(!localStorage.token){
                alert('Anda harus login untuk unlike!')
            } else {
                axios.put('http://localhost:3000/api/question/unlike/'+questionId, {
                    like: localStorage._id
                }, {
                    headers: { token: localStorage.token }
                })
                .then((response)=>{
                    //get all
                    axios.get('http://localhost:3000/api/question/')
                    .then((response)=>{
                        let questions = response.data;
                        commit('setQuestionsData', questions);
                    })
                    .catch((err)=>{
                        console.log(err);
                        alert('Kesalahan di server database');
                    })
                    //get one
                    axios.get('http://localhost:3000/api/question/'+questionId)
                    .then((response)=>{
                        commit('setOneQuestionData', response.data)
                        commit('setAnswersData', response.data.answers);
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                })
                .catch(err => {
                    console.log(err);
                })
            }
        },
        addAnswerLikeMethod ({ commit }, ids) {
            axios.put('http://localhost:3000/api/answer/like/'+ids.answerId, {
                like: localStorage._id
            }, {
                headers: { token: localStorage.token }
            })
            .then((response)=>{
                axios.get('http://localhost:3000/api/question/'+ids.questionId)
                .then((response)=>{
                    commit('setOneQuestionData', response.data)
                    commit('setAnswersData', response.data.answers);
                })
                .catch((err)=>{
                    alert('Sesi anda berakhir silahkan sign out dahulu')
                    console.log(err)
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        removeAnswerLikeMethod ({ commit }, ids) {
            axios.put('http://localhost:3000/api/answer/unlike/'+ids.answerId, {
                like: localStorage._id
            }, {
                headers: { token: localStorage.token }
            })
            .then(response => {
               axios.get('http://localhost:3000/api/question/'+ids.questionId)
                .then((response)=>{
                    commit('setOneQuestionData', response.data)
                    commit('setAnswersData', response.data.answers);
                })
                .catch((err)=>{
                    alert('sesi anda habis silahkan sign out dahulu')
                    console.log(err)
                })
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
})

export default Store;

//const router = import('@/components')