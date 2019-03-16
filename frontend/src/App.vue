<template>
  <div class="d-flex" id="app">
    <LeftSidebar/>
    <!-- <div class="bg-light border-right" id="sidebar-wrapper">
      <div class="sidebar-heading">{{appTitle}}</div>
      <div class="list-group list-group-flush" v-show="isAuthenticated">
        <router-link class="list-group-item list-group-item-action bg-light" to="/dashboard">Πίνακας</router-link>
        <router-link class="list-group-item list-group-item-action bg-light" to="/clients">Πελάτες</router-link>
        <router-link class="list-group-item list-group-item-action bg-light" to="/devices">Βλάβες</router-link>
        <router-link class="list-group-item list-group-item-action bg-light" to="/visits">Επισκέψεις</router-link>
        <router-link class="list-group-item list-group-item-action bg-light" to="/questions">Ερωτήσεις</router-link>
      </div>
    </div> -->
    <div id="page-content-wrapper">
      <Menu :key="$route.fullPath"/>
      <div class="col-md-12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";
import LeftSidebar from './components/Partials/LeftSidebar'
import AuthService from './services/AuthService'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/bootstrap.min.css";
import "v-autocomplete/dist/v-autocomplete.css";

export default {
  name: "app",
  data() {
    return {
        footerText: process.env.VUE_APP_FOOTER_TEXT,
        isAuthenticated: false,
        appTitle: process.env.VUE_APP_TITLE || 'Trouble Ticket'
    }
  },
  components: {
    Menu, LeftSidebar
  },
  watch:{
    $route (to, from){
        if(to !== from) {
          this.isAuthenticated = AuthService.isAuthenticated()
        }
      }
  },
  mounted() {
    this.isAuthenticated = AuthService.isAuthenticated()
  }
};
</script>

<style>
::-webkit-scrollbar {
  display: none;
}
body {
  color: black;
}
body *,
.btn {
  text-transform: none;
}
.cursor-pointer {
  cursor: pointer;
}
.nav-item {
  margin-right: 0;
}
.w-30 {
  width: 30% !important;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #f5f5f5;
}
select.form-control {
  height: 42px;
}
.v-autocomplete-list {
  background: #f7f7f9 !important;
  z-index: 1000000;
}
.v-autocomplete-list > div:hover {
  color: white !important;
  background: #a5a5a5 !important;
}
.v-autocomplete-list > div {
  padding: 10px;
}
.input-group > .input-group-prepend > .input-group-text {
  padding-right: 1.25rem;
}
* {
  border-radius: 0 !important;
}
body {
  overflow-x: hidden;
}
</style>
