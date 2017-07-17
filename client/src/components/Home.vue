<template>
  <div class="hello">
    <div>
      <div class="ui huge top secondary fixed menu" id="top-menu">
        <router-link to="/" class="item" style="padding-left: 80px;">
          <img src="../assets/Hacktiv8.png" alt="">
          &nbsp&nbsp&nbsp&nbsp&nbsp&nbspHacktiv<b>OverFlow</b>
        </router-link>
        <router-link to="/" active-class="active" class="item" exact>
          Home
        </router-link>
        <router-link to="/users" active-class="active" class="item" exact>
          Members
        </router-link>
        <div class="right menu" style="padding-right: 70px;">
          <div class="item">
            <div class="ui action input">
              <input type="text" placeholder="Type here.. " style="width: 280px;">
              <div class="ui button">Search</div>
            </div>
          </div>
          <router-link to="/signin" active-class="active" class="item" exact>
            Login
          </router-link>
          <a class="item" @click="getUserSignout" v-if="isLogin">
            Sign Out
          </a>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      page: 'Home'
    }
  },
  methods: {
    ...mapActions([
      'userSignoutMethod',
      'checkTokenFromLocalStorageMethod'
    ]),
    getUserSignout () {
      this.userSignoutMethod()
    }
  },
  computed: mapGetters({
      isLogin: 'getLoginStatus'
  }),
  created () {
    this.checkTokenFromLocalStorageMethod()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ui.fixed.menu {
    background-color: rgba(255, 255, 255, 0.88);
    border-bottom-width: 0px 0px 10px 0px;
    border-bottom-style: solid;
    border-bottom-color: orange;
  }
</style>
