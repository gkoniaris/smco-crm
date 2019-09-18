<template>
<div class="row mt-4">
  <div class="col-md-12">
    <h3>Δημιουργία πελάτη</h3>
    <hr>
    <form
      @submit.prevent="create(clientData)"
      name="createClientForm"
      novalidate
    >
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
        <div class="col-12 col-xl mt-2">
          <div class="card">
          <div class="card-body">
            <div class="card-title">Πληροφορίες διεύθυνσης
              <div class="float-right">
                <input type="checkbox" class="form-check-input" id="ignoreAddress"  v-model="ignoreAddress">
                <label class="form-check-label" for="ignoreAddress">Αγνόησε τη διεύθυνση</label>
              </div>
            </div>
            <fieldset v-bind:disabled="ignoreAddress">
            <div class="card-text">
              <div class="form-group">
                <label for="address">Διεύθυνση</label>
                <v-autocomplete
                  name="address"
                  v-validate="{ required: !ignoreAddress  }"
                  placeholder="Αναζήτηση διεύθυνσης"
                  :auto-select-one-item="false"
                  input-class="form-control"
                  :items="addressAutocompleteItems"
                  v-model="addressAutocompleteItem"
                  :get-label="getLabel"
                  :component-item="template"
                  @update-items="updateItems"
                ></v-autocomplete>
                <small class="invalid-feedback">{{ errors.first('address') }}</small>
              </div>
              <div class="form-group">
                <label for="city">Πόλη</label>
                <input
                  v-validate="{ required: !ignoreAddress  }"
                  :class="{ 'is-invalid': errors.has('city') }"
                  v-model="clientData.address.city"
                  type="text"
                  name="city"
                  class="form-control"
                  id="city"
                  aria-describedby="city"
                  placeholder="Εισάγετε πόλη"
                >
                <small class="invalid-feedback">{{ errors.first('city') }}</small>
              </div>
              <div class="form-group">
                <label for="region">Περιοχή</label>
                <input
                  v-validate="{ required: !ignoreAddress  }"
                  :class="{ 'is-invalid': errors.has('region') }"
                  v-model="clientData.address.region"
                  type="text"
                  name="region"
                  class="form-control"
                  id="region"
                  aria-describedby="region"
                  placeholder="Εισάγετε περιοχή"
                >
                <small class="invalid-feedback">{{ errors.first('region') }}</small>
              </div>
              <div class="form-group">
                <label for="postalCode">Ταχυδρομικός κώδικας</label>
                <input
                  v-validate="{ required: !ignoreAddress  }"
                  :class="{ 'is-invalid': errors.has('postalCode') }"
                  v-model="clientData.address.postalCode"
                  type="text"
                  name="postalCode"
                  class="form-control"
                  id="postalCode"
                  aria-describedby="postalCode"
                  placeholder="Εισάγετε ταχυδρομικό κώδικα"
                >
                <small class="invalid-feedback">{{ errors.first('postalCode') }}</small>
              </div>
            </div>
            <div class="form-group">
              <label for="floor">Όροφος</label>
              <input
                :class="{ 'is-invalid': errors.has('floor') }"
                v-model="clientData.address.floor"
                type="number"
                name="floor"
                class="form-control"
                id="floor"
                aria-describedby="floor"
                placeholder="Εισάγετε όροφο"
              >
              <small class="invalid-feedback">{{ errors.first('floor') }}</small>
            </div>
            <div class="form-group">
              <label for="bell">Κουδούνι</label>
              <input
                :class="{ 'is-invalid': errors.has('bell') }"
                v-model="clientData.address.bell"
                type="text"
                name="bell"
                class="form-control"
                id="bell"
                aria-describedby="bell"
                placeholder="Εισάγετε κουδούνι"
              >
              <small class="invalid-feedback">{{ errors.first('bell') }}</small>
            </div>
            </fieldset>
          </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 mt-4">
          <button type="submit" class="btn btn-primary">Δημιουργία πελάτη</button>
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

export default {
  name: "ClientsCreate",
  data: () => {
    return {
      addressAutocompleteItem: null,
      addressAutocompleteItems: [],
      template: AddressAutocomplete,
      message: "",
      error: "",
      ignoreAddress: false,
      clientData: {
        firstName: "",
        lastName: "",
        email: "",
        address: {
          city: "",
          region: "",
          address: "",
          lat: "",
          lon: "",
          postalCode: "",
          floor: "",
          bell: ""
        },
        phone: "",
        mobile: "",
        work: ""
      }
    };
  },
  methods: {
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
        this.addressAutocompleteItems = response.data.data
        this.addressAutocompleteItems.push({address: text})
      });
    },
    create(client) {
      this.message = null;
      this.error = null;
      this.$validator
        .validate()
        .then(valid => {
          if (!valid) return;
          return ClientService.create(client).then(message => {
            this.message = message
            this.addressAutocompleteItem = null
            this.addressAutocompleteItems = []
            this.clientData = {
              firstName: "",
              lastName: "",
              email: "",
              address: {
                city: "",
                region: "",
                address: "",
                lat: "",
                lon: "",
                postalCode: "",
                floor: "",
                bell: ""
              },
              phone: "",
              mobile: "",
              work: ""
            };
            this.$validator.reset()
            window.scrollTo(0,0)
          });
        })
        .catch(error => {
          this.error = error.message
          window.scrollTo(0, 0)
        });
    }
  }
};
</script>

<style>

</style>