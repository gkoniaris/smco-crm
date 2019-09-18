<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a href="#" class="navbar-brand d-lg-none d-block">
      {{appTitle}}
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item d-lg-none d-block">
          <router-link class="nav-link" v-show="isAuthenticated" to="/dashboard">Πίνακας</router-link>
        </li>
        <li class="nav-item d-lg-none d-block">
          <router-link class="nav-link" v-show="isAuthenticated" to="/clients">Πελάτες</router-link>
        </li>
        <li class="nav-item d-lg-none d-block">
          <router-link class="nav-link" v-show="isAuthenticated" to="/devices">Συσκευές</router-link>
        </li>
        <li class="nav-item d-lg-none d-block">
          <router-link class="nav-link" v-show="isAuthenticated" to="/visits">Επισκέψεις</router-link>
        </li>
        <li class="nav-item d-lg-none d-block">
          <router-link class="nav-link" v-show="isAuthenticated" to="/questions">Ερωτήσεις</router-link>
        </li>
        <li class="nav-item d-lg-none d-block">
          <router-link class="nav-link" v-show="isAuthenticated" to="/stats">Στατιστικά</router-link>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item" v-show="!isAuthenticated">
          <router-link class="nav-link" to="/login">Είσοδος</router-link>
        </li>
        <li class="nav-item d-lg-block d-none" v-if="isAuthenticated">
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
      disableSignup: process.env.VUE_APP_DISABLE_SIGNUP === 'true',
      appTitle: process.env.VUE_APP_TITLE || 'Trouble Ticket'
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
