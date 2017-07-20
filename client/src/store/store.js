import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    params: {
      detail: {
        title: 'amd',
        description: 'amd',
        author: {
          username: 'amd'
        },
        answer: []
      }
    }
  }
})
