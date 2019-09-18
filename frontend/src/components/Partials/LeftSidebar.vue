<template>
    <div class="bg-light border-right" id="sidebar-wrapper">
      <div class="sidebar-heading">{{appTitle}}</div>
      <div class="list-group list-group-flush" v-show="isAuthenticated">
        <router-link class="list-group-item list-group-item-action bg-light" to="/dashboard">Πίνακας</router-link>
        <router-link class="list-group-item list-group-item-action bg-light" to="/clients">Πελάτες</router-link>
        <router-link class="list-group-item list-group-item-action bg-light" to="/devices">Συσκευές</router-link>
        <router-link class="list-group-item list-group-item-action bg-light" to="/visits">Επισκέψεις</router-link>
        <router-link class="list-group-item list-group-item-action bg-light" to="/questions">Ερωτήσεις</router-link>
        <router-link class="list-group-item list-group-item-action bg-light" to="/stats">Στατιστικά</router-link>
      </div>
    </div>
</template>

<script>
import AuthService from '../../services/AuthService'

export default {
  name: "LeftSidebar",
  data() {
    return {
        isAuthenticated: false,
        appTitle: process.env.VUE_APP_TITLE || 'Trouble Ticket'
    }
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
#sidebar-wrapper {
  min-height: 100vh;
  margin-left: -15rem;
  -webkit-transition: margin 0.25s ease-out;
  -moz-transition: margin 0.25s ease-out;
  -o-transition: margin 0.25s ease-out;
  transition: margin 0.25s ease-out;
  border:none;
  border-right: 1px solid #252525 !important;
}

#sidebar-wrapper .sidebar-heading {
  padding: 26px 1.25rem;
  font-size: 1.2rem;
  border: 0 !important;
  background: #222222;
  color: white;
  width: 15rem;
}
#sidebar-wrapper .list-group {
  width: 15rem;
}

#sidebar-wrapper .list-group-item {
  padding: 1.75rem 1.25rem;
}

#page-content-wrapper {
  min-width: 100vw;
  margin-bottom: 25px;
}

#app.toggled #sidebar-wrapper {
  margin-left: 0;
}
@media (min-width: 992px) {
  #sidebar-wrapper .sidebar-heading {
    padding: 26px 1.25rem;
  }
  #sidebar-wrapper .list-group-item {
    padding: 1.75rem 1.25rem;
  }
  #sidebar-wrapper {
    margin-left: 0;
  }
  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }
}
@media (min-width: 768px) {
}
</style>
