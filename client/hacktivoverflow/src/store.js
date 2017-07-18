import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    questions: [],
  },
  mutations: {
    loadQuestions(state, payload) {
      state.questions = payload;
    },
  },
  actions: {
    getQuestions({ commit }) {
      axios.get(`${window.serverUrl}/api/questions`)
      .then((response) => {
        commit('loadQuestions', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },
  },
});
