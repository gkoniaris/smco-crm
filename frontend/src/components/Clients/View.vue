<template>
    <div class="col-md-12 mt-4">
        <h3>Πληροφορίες πελάτη {{client.firstName}} {{client.lastName}}</h3>
        <hr>
        <ul class="nav nav-pills mt-4">
            <li class="nav-item">
                <router-link :to="{name: 'clientProfile', params: {id: client.id}}" class="nav-link" v-bind:class="{active: $route.name === 'clientProfile'}">Προφίλ</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'clientDevices', params: {id: client.id}}" class="nav-link" v-bind:class="{active: $route.name === 'clientDevices'}">Βλάβες</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'clientQuestions', params: {id: client.id}}" class="nav-link" v-bind:class="{active: $route.name === 'clientQuestions'}">Ερωτήσεις</router-link>
            </li>
        </ul>
        <div class="tab-content py-2">
            <router-view v-if="client.id"></router-view>
        </div>
    </div>
  </template>

<script>
import ClientService from "../../services/ClientService"

export default {
  name: "ClientsView",
  data() {
    return {
      client: {}
    };
  },
  methods: {
    find() {
      ClientService.find(this.$route.params.id)
      .then(client => {
        this.client = client
      })
    }
  },
  mounted() {
    this.find();
  }
};
</script>
