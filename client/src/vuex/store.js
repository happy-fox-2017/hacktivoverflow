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
        qusetions: [],
        answers: []
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
        }
    },
    mutations: {
        setSigninInfo (state) {
            state.user.id = localStorage._id
            state.user.name = localStorage.fullname
            state.user.email = localStorage.email
            state.user.token = localStorage.token

            state.isLogin = true

            console.log('status user saat ini---', state.user);
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
            console.log('user sudah di hapus', state.user);
        },
        setUsersData (state, data) {
            state.usersData.push(data);
            console.log('ini data usersData', state.userData);
        },
        setQuestionsData (state, questions) {
            state.questions.push(questions);
            console.log('ini data questions yang masuk', state.questions);
        },
        setAnswersData (state, answers) {
            state.answers.push(answers);
            console.log('ini data answers yang masuk', state.answers);
        }
    },
    actions: {
        userSignupMethod ({dispatch, commit}, userSignup) {
            axios.post('http://localhost:3000/api/user/signup/', {
                fullname: userSignup.name,
                username: userSignup.username,
                password: userSignup.password,
                email: userSignup.email,
                address: userSignup.address
            })
            .then((response)=>{
                alert(response.data.message + 'Silahkan Login menggunakan username anda!');
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
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('_id', response.data.id);
                localStorage.setItem('fullname', response.data.fullname);
                localStorage.setItem('email', response.data.email);

                commit('setSigninInfo')
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
                console.log('ini adalah data question----', response.data);
                let questions = response.data.data;
                let answers = response.data.data.answers;
                commit('setQuestionsData', questions);
                commit('setAnswersData', answers);
            })
            .catch((err)=>{
                console.log(err);
                alert('Kesalahan di server database');
            })
        }
    }
})

export default Store;