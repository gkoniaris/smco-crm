<template>
  <div class="row mt-4">
    <div class="col-md-12">
      <h3>Επεξεργασία πελάτη</h3>
      <hr>
      <form name="editClientForm" novalidate @submit.prevent="update(clientData)">
        <div class="alert alert-danger" v-show="error">{{error}}</div>
        <div class="alert alert-success" v-show="message">{{message}}</div>
        <div class="row">
          <div class="col-12 col-xl mt-2">
            <div class="card">
              <div class="card-body">
                <div class="card-title">Πληροφορίες πελάτη</div>
                <div class="card-text">
                  <div class="form-group">
                    <label for="firstName">Όνομα</label>
                    <input
                      v-validate="{ required: true }"
                      :class="{ 'is-invalid': errors.has('firstName') }"
                      v-model="clientData.firstName"
                      firstName="firstName"
                      name="firstName"
                      class="form-control"
                      id="firstName"
                      aria-describedby="firstName"
                      placeholder="Εισάγετε όνομα"
                    >
                    <small class="invalid-feedback">{{ errors.first('firstName') }}</small>
                  </div>
                  <div class="form-group">
                    <label for="lastName">Επώνυμο</label>
                    <input
                      v-validate="{ required: true }"
                      :class="{ 'is-invalid': errors.has('lastName') }"
                      v-model="clientData.lastName"
                      type="text"
                      name="lastName"
                      class="form-control"
                      id="lastName"
                      aria-describedby="lastName"
                      placeholder="Εισάγετε επώνυμο"
                    >
                    <small class="invalid-feedback">{{ errors.first('lastName') }}</small>
                  </div>
                  <div class="form-group">
                    <label for="email">Διεύθυνση email</label>
                    <input
                      v-validate="{ email: true }"
                      :class="{ 'is-invalid': errors.has('email') }"
                      v-model="clientData.email"
                      type="email"
                      name="email"
                      class="form-control"
                      id="email"
                      aria-describedby="email"
                      placeholder="Εισάγετε διεύθυνση email"
                    >
                    <small class="invalid-feedback">{{ errors.first('email') }}</small>
                  </div>
                  <div class="form-group">
                    <label for="phone">Σταθερό</label>
                    <input
                      v-model="clientData.phone"
                      type="text"
                      name="phone"
                      class="form-control"
                      id="phone"
                      aria-describedby="phone"
                      placeholder="Εισάγετε σταθερό"
                    >
                    <small class="invalid-feedback">{{ errors.first('phone') }}</small>
                  </div>
                  <div class="form-group">
                    <label for="mobile">Κινητό</label>
                    <input
                      v-model="clientData.mobile"
                      type="text"
                      name="mobile"
                      class="form-control"
                      id="mobile"
                      aria-describedby="mobile"
                      placeholder="Εισάγετε κινητό"
                    >
                    <small class="invalid-feedback">{{ errors.first('mobile') }}</small>
                  </div>
                  <div class="form-group">
                    <label for="workPhone">Δουλειά</label>
                    <input
                      v-model="clientData.work"
                      type="text"
                      name="workPhone"
                      class="form-control"
                      id="workPhone"
                      aria-describedby="workPhone"
                      placeholder="Εισάγετε τηλέφωνο εργασίας"
                    >
                    <small class="invalid-feedback">{{ errors.first('workPhone') }}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 mt-4">
            <button type="submit" class="btn btn-primary">Aνανέωση πελάτη</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ClientService from "../../services/ClientService";
import AddressAutocomplete from "../Autocompletes/AddressAutocomplete.vue";
import fetch from "../../fetch.js";
import _ from 'lodash'
 
export default {
  name: "ClientsEdis",
  data: () => {
    return {
      addressAutocompleteItem: null,
      addressAutocompleteItems: [],
      template: AddressAutocomplete,
      message: "",
      error: "",
      ignoreAddress: false,
      clientData: {}
    };
  },
  mounted() {
    this.find();
  },
  methods: {
    find() {
      ClientService.find(this.$route.params.id).then(client => {
        this.clientData = Object.assign(
          {},
          {
                id: client.id, 
                firstName: client.firstName,
                lastName: client.lastName,
                email: client.email
          }
        );

        this.clientData.phone = _.get(
          client.phones.find(item => item.type === "home"),
          "phone"
        );
        this.clientData.mobile = _.get(
          client.phones.find(item => item.type === "mobile"),
          "phone"
        );
        this.clientData.work = _.get(
          client.phones.find(item => item.type === "work"),
          "phone"
        );

        this.clientData.address = null;
      });
    },
    getLabel(item) {
      if (item) {
        this.clientData.address.postalCode = item.postalCode;
        this.clientData.address.address = item.address;
        this.clientData.address.region = item.region;
        this.clientData.address.city = item.city;
        this.clientData.address.lat = item.lat;
        this.clientData.address.lon = item.lon;
        return item.address;
      }
    },
    updateItems(text) {
      return fetch.get("/geolocate?address=" + text).then(response => {
        this.addressAutocompleteItems = response.data.data;
        this.addressAutocompleteItems.push({ address: text });
      });
    },
    update(client) {
      this.message = null;
      this.error = null;
      
      this.$validator
        .validate()
        .then(valid => {
          if (!valid) return;
          return ClientService.update(client).then(message => {
            this.message = message;
            this.find(client.id);
            this.$validator.reset();
            window.scrollTo(0, 0);
          });
        })
        .catch(error => {
          this.error = error.message;
          window.scrollTo(0, 0);
        });
    }
  }
};
</script>

<style>
</style>