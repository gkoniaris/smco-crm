<template>
<div class="row mt-4">
  <div class="col-md-12">
    <h3>Δημιουργία βλάβης</h3>
    <hr>
    <form
      @submit.prevent="create(deviceData)"
      name="createDeviceForm"
      novalidate
    >
      <div class="alert alert-danger" v-show="error">{{error}}</div>
      <div class="alert alert-success" v-show="message">{{message}}</div>
      <div class="row">
        <div class="col-md col-sm-12 card mt-2 ml-3 mr-3">
          <div class="card-body">
            <div class="card-title">Πληροφορίες βλάβης</div>
            <div class="card-text">
              <div class="form-group">
                <label for="device">Τύπος συσκευής</label>
                <input
                  class="form-control"
                  placeholder="Σίδερο"
                  v-model="deviceData.type"
                  name="type"
                  v-validate="{ required: true }"
                  :class="{ 'is-invalid': errors.has('type') }"
                />
                <small class="invalid-feedback">{{ errors.first('type') }}</small>
              </div>
              <div class="form-group">
                <label for="device">Μοντέλο συσκευής</label>
                <input
                  class="form-control"
                  placeholder="AM9322"
                  v-model="deviceData.model"
                  name="model"
                  v-validate="{ required: true }"
                  :class="{ 'is-invalid': errors.has('model') }"
                />
                <small class="invalid-feedback">{{ errors.first('model') }}</small>
              </div>
              <div class="form-group">
                <label for="device">Serial number συσκευής</label>
                <input
                  class="form-control"
                  placeholder="228287283792"
                  v-model="deviceData.serialNumber"
                />
              </div>
              <div class="form-group">
                <label for="device">Περιγραφή βλάβης από πελάτη</label>
                <textarea
                  class="form-control"
                  placeholder="Δεν δουλεύει"
                  v-model="deviceData.failureDescription"
                  name="failure_description"
                  v-validate="{ required: true }"
                  :class="{ 'is-invalid': errors.has('failure_description') }"
                />
                <small class="invalid-feedback">{{ errors.first('failure_description') }}</small>
              </div>
              <div class="form-group">
                <label for="device">Διάγνωση βλάβης από μαγαζί</label>
                <textarea
                  class="form-control"
                  placeholder="Βλάβη σε φλάτζα"
                  v-model="deviceData.diagnosisDescription"
                />
              </div>
              <div class="form-group">
                <label for="device">Ενέργειες</label>
                <textarea
                  class="form-control"
                  placeholder="Αρχικός Έλεγχος"
                  v-model="deviceData.actions"
                />
              </div>
              <div class="form-group">
                <label for="device">Σχόλια επικοινωνίας</label>
                <textarea
                  class="form-control"
                  placeholder="Καλέστε μεταξύ 15:30 και 19:30 λόγω δουλειάς"
                  v-model="deviceData.contactComments"
                />
                <div class="row">
                  <div class="col-md-12">
                    <div class="btn btn-sm btn-primary mt-2" v-on:click="append('contactComments', 'Θα ήθελα να επικοινωνήσετε μαζί μου μεταξύ των ωρών .... και ....')">Θα ήθελα να επικοινωνήσετε μαζί μου μεταξύ των ωρών .... και ....</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="btn btn-sm btn-primary mt-2" v-on:click="append('contactComments', 'Θα ήθελα να επικοινωνήσετε μαζί μου μόνο τις συγκεκριμένες ημέρες ....')">Θα ήθελα να επικοινωνήσετε μαζί μου μόνο τις συγκεκριμένες ημέρες ....</div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="device">Γενικά σχόλια</label>
                <textarea
                  class="form-control"
                  placeholder="Διορθώθηκε το πρόβλημα και η επισκευή δεν καθυστέρησε"
                  v-model="deviceData.comments"
                />
              </div>
              <div class="form-group">
                <label for="createdDate">Ημερομηνία παραλαβής</label>
                <input type="date" class="form-control" v-model="deviceData.date"/>
              </div>
            </div>
            <div class="card-title">Πληροφορίες πελάτη</div>
            <div class="card-text">
              <div class="form-group mb-5" v-if="deviceData.clientId === null">
                <label for="fullNameSearch">Αναζήτηση πελάτη</label>
                <input type="text"
                  v-model="deviceData.clientId"
                  name="client"
                  class="form-control d-none"
                  v-validate="{ required: true }"
                  :class="{ 'is-invalid': errors.has('client') }"
                >
                <v-autocomplete
                  name="client"
                  placeholder="Αναζήτηση πελάτη"
                  :auto-select-one-item="false"
                  input-class="form-control"
                  :items="clientAutocompleteItems"
                  v-model="clientAutocompleteItem"
                  :get-label="getLabel"
                  :component-item="template"
                  @update-items="updateItems"
                >
                </v-autocomplete>
                <small class="invalid-feedback">{{ errors.first('client') }}</small>
              </div>
              <div class="row" v-if="deviceData.clientId">
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="firstName">Ονοματεπώνυμο</label>
                    <input type="text" class="form-control" disabled v-bind:value="clientData.firstName + ' ' + clientData.lastName">
                  </div>
                  <div class="form-group" v-if="clientData.email">
                    <label for="email">Email</label>
                    <input type="text" class="form-control" disabled v-model="clientData.email">
                  </div>
                  <div class="row" v-if="clientData.addresses.length">
                    <div class="col-md-12">
                      <label for="address">Διευθύνσεις</label>
                      <div class="form-group form-row align-items-center">
                        <div class="col-auto" v-bind:key="address.id" v-for="address in clientData.addresses">
                          <input
                            type="text"
                            disabled                         
                            v-bind:value="address.address + ',' + address.region + ',' + address.postalCode"
                            class="form-control form-control-inline"
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row" v-if="clientData.phones.length">
                    <div class="col-md-12">
                      <label for="phone">Τηλέφωνα</label>
                      <div class="form-group form-row align-items-center">
                        <div class="col-auto" v-bind:key="phone.id" v-for="phone in clientData.phones">
                            <input
                              disabled
                              type="text"
                              class="form-control mt-1"
                              v-bind:value="phone.phone + ' (' + phone.type + ')'"
                            >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
            <div class="col-md-12">
              <button type="submit" class="btn btn-primary">Αποθήκευση βλάβης</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import ClientsAutocomplete from "../Autocompletes/ClientsAutocomplete.vue"
import DeviceService from "../../services/DeviceService"
import fetch from "../../fetch.js"
import _ from "lodash"

const emptyDeviceData = {
  device: '',
  contactComments: '',
  clientId: null,
  date: new Date().toISOString().slice(0, 10)
}

export default {
  name: "DevicesCreate",
  data: () => {
    return {
      clientData: {},
      message: null,
      error: null,
      deviceData: Object.assign({}, emptyDeviceData),
      clientAutocompleteItem: null,
      clientAutocompleteItems: [],
      template: ClientsAutocomplete
    };
  },
  methods: {
    append(field, text) {
      this.deviceData[field] !== '' ? this.deviceData[field] += '\n' : null
      this.deviceData[field] += text
    },
    getLabel(item) {
      if (item) {
        this.clientData = item
        this.deviceData.clientId = item.id
        return (
          item.firstName +
          " " +
          item.lastName +
          " " +
          _.get(item, "addresses[0].address", '')
        )
      }
    },
    updateItems(text) {
      return fetch.get("/client?search=" + text).then(response => {
        this.clientAutocompleteItems = response.data.data
      })
    },
    create(device) {
      this.$validator
        .validate()
        .then(valid => {
          if (!valid) return
          return DeviceService.create(device).then(message => {
            this.message = message
            this.clientAutocompleteItems = []
            this.clientAutocompleteItem = null
            this.clientData = {}
            this.deviceData = Object.assign({}, emptyDeviceData)
            this.$validator.reset()
            window.scrollTo(0, 0)
          })
        })
        .catch(error => {
          this.error = error.message
          window.scrollTo(0, 0)
        })
    }
  }
};
</script>