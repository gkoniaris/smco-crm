<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <!-- <li class="nav-item">
        <router-link class="nav-link" v-show="isAuthenticated" to="/dashboard">Πίνακας</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" v-show="isAuthenticated" to="/clients">Πελάτες</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" v-show="isAuthenticated" to="/devices">Βλάβες</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" v-show="isAuthenticated" to="/questions">Ερωτήσεις</router-link>
      </li> -->
    </ul>
    <ul class="navbar-nav">
      <li class="nav-item" v-show="!isAuthenticated">
        <router-link class="nav-link" to="/login">Είσοδος</router-link>
      </li>
      <li class="nav-item" v-show="!isAuthenticated" v-if="!disableSignup">
        <router-link class="nav-link" to="/signup">Εγγραφή</router-link>
      </li>
      <li class="nav-item" v-if="isAuthenticated">
        <a class="nav-link">Καλως ήρθες {{user.firstName}}</a>
      </li>
      <li class="nav-item" v-show="isAuthenticated">
        <a class="nav-link" v-on:click="logout()">Έξοδος</a>
      </li>
    </ul>
  </div>
  </div>
</nav>
</template>

<script>
import AuthService from '../services/AuthService.js'
import router from '../router.js'

export default {
  name: 'Menu',
  props: {
  },
  data: () => {
    return {
      disableSignup: process.env.VUE_APP_DISABLE_SIGNUP === 'true'
    }
  },
  methods: {
    logout: () => {
      AuthService.logout()
      router.push('/')
    }
  },
  computed: {
    user: () => {
      return AuthService.getUser()
    },
    isAuthenticated: () => {
      return AuthService.isAuthenticated()
    }
  }
}
</script>

<style scoped>
  .nav-link {
    cursor: pointer;
  }
</style>
