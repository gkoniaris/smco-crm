<template>
  <div class="row mt-4">
    <div class="col-md-12">
      <h3>Δημιουργία επίσκεψης</h3>
      <hr>
      <form @submit.prevent="create(visitData)" name="createVisitForm" novalidate>
        <div class="alert alert-danger" v-show="error">{{error}}</div>
        <div class="alert alert-success" v-show="message">{{message}}</div>
        <div class="row">
          <div class="col-md col-sm-12 card mt-2 ml-3 mr-3">
            <div class="card-body">
              <div class="card-title">
                <h5>Πληροφορίες επίσκεψης</h5>
              </div>
              <div class="card-text">
                <div class="form-group">
                  <label for="visit">Τύπος συσκευής</label>
                  <input
                    class="form-control"
                    placeholder="Σίδερο"
                    v-model="visitData.type"
                    name="type"
                    v-validate="{ required: true }"
                    :class="{ 'is-invalid': errors.has('type') }"
                  >
                  <small class="invalid-feedback">{{ errors.first('type') }}</small>
                </div>
                <div class="form-group">
                  <label for="visit">Μοντέλο συσκευής</label>
                  <input
                    class="form-control"
                    placeholder="AM9322"
                    v-model="visitData.model"
                    name="model"
                    v-validate="{ required: true }"
                    :class="{ 'is-invalid': errors.has('model') }"
                  >
                  <small class="invalid-feedback">{{ errors.first('model') }}</small>
                </div>
                <div class="form-group">
                  <label for="visit">Serial number συσκευής</label>
                  <input
                    class="form-control"
                    placeholder="228287283792"
                    v-model="visitData.serialNumber"
                  >
                </div>
                <div class="form-group">
                  <label for="visit">Περιγραφή βλάβης από πελάτη</label>
                  <textarea
                    class="form-control"
                    placeholder="Δεν δουλεύει"
                    v-model="visitData.failureDescription"
                    name="failure_description"
                    v-validate="{ required: true }"
                    :class="{ 'is-invalid': errors.has('failure_description') }"
                  />
                  <small class="invalid-feedback">{{ errors.first('failure_description') }}</small>
                </div>
                <div class="form-group">
                  <label for="visit">Διάγνωση βλάβης από μαγαζί</label>
                  <textarea
                    class="form-control"
                    placeholder="Βλάβη σε φλάτζα"
                    v-model="visitData.diagnosisDescription"
                  />
                </div>
                <div class="form-group">
                  <label for="visit">Ραντεβού
                    <div class="btn btn-primary btn-sm ml-2" v-on:click="addNewAppointment">+</div>
                  </label>
                  <div
                    class="border-left rounded pl-2 mb-2 appointment"
                    v-bind:key="appointmentIdx"
                    v-for="(appointment, appointmentIdx) in visitData.appointments"
                  >
                    <label>Ημερομηνία</label>
                    <input type="datetime-local" step="1800" v-model="appointment.date" class="form-control">
                    <label>Διάρκεια (λεπτά)</label>
                    <input type="number" step="30" min="30" v-model="appointment.duration" class="form-control">
                    <label>Ενέργειες</label>
                    <textarea v-model="appointment.actions" 
                      class="form-control"
                      placeholder="Αρχικός έλεγχος"/>
                    <div class="row" v-if="visitData.appointments.length > 1">
                      <div class="col-md-3 mt-2">
                        <div
                          class="btn btn-danger btn-sm"
                          v-on:click="removeAppointment(appointmentIdx)"
                        >Αφαίρεση</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="visit">Σχόλια επικοινωνίας</label>
                  <textarea
                    class="form-control"
                    placeholder="Καλέστε μεταξύ 15:30 και 19:30 λόγω δουλειάς"
                    v-model="visitData.contactComments"
                  />
                </div>
                <div class="form-group">
                  <label for="visit">Γενικά σχόλια</label>
                  <textarea
                    class="form-control"
                    placeholder="Διορθώθηκε το πρόβλημα και η επισκευή δεν καθυστέρησε"
                    v-model="visitData.comments"
                  />
                </div>
              </div>
              <div class="card-title">
                <h5>Πληροφορίες πελάτη</h5>
              </div>
              <div class="card-text">
                <div class="form-group mb-5" v-if="visitData.clientId === null">
                  <label for="fullNameSearch">Αναζήτηση πελάτη</label>
                  <input
                    type="text"
                    v-model="visitData.clientId"
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
                  ></v-autocomplete>
                  <small class="invalid-feedback">{{ errors.first('client') }}</small>
                </div>
                <div class="row" v-if="visitData.clientId">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="firstName">Ονοματεπώνυμο</label>
                      <input
                        type="text"
                        class="form-control"
                        readonly
                        v-bind:value="clientData.firstName + ' ' + clientData.lastName"
                      >
                    </div>
                    <div class="form-group" v-if="clientData.email">
                      <label for="email">Email</label>
                      <input type="text" class="form-control" readonly v-model="clientData.email">
                    </div>
                    <div class="row" v-if="clientData.addresses.length">
                      <div class="col-md-12">
                        <label for="address">Διευθύνσεις</label>
                        <div
                          v-bind:key="address.id"
                          v-for="address in clientData.addresses"
                          class="form-group form-row align-items-center"
                          v-bind:class="{'has-success': visitData.addressId === address.id}"
                        >
                          <input
                            type="text"
                            readonly
                            v-bind:value="address.address + ',' + address.region + ',' + address.postalCode + (visitData.addressId === address.id ? ' (Επιλεγμένη διεύθυνση)': '')"
                            class="form-control form-control-inline"
                          >
                        </div>
                      </div>
                    </div>
                    <div class="row" v-if="clientData.phones.length">
                      <div class="col-md-12">
                        <label for="phone">Τηλέφωνα</label>
                        <div class="form-group form-row align-items-center"
                          v-bind:key="phone.id"
                          v-for="phone in clientData.phones">
                            <input
                              readonly
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
import ClientsAutocomplete from "../Autocompletes/ClientsAutocomplete.vue";
import VisitService from "../../services/VisitService";
import fetch from "../../fetch.js";
import _ from "lodash";
import moment from 'moment'

const emptyVisitData = {
  visit: "",
  contactComments: "",
  clientId: null,
  addressId: null,
  appointments: [
    {
      actions: "",
      duration: 60,
      date: moment().add(4, 'h').minutes(0).toDate().toISOString().slice(0, 16)
    }
  ]
};

export default {
  name: "VisitsCreate",
  data: () => {
    return {
      clientData: {},
      message: null,
      error: null,
      visitData: JSON.parse(JSON.stringify(emptyVisitData)),
      clientAutocompleteItem: null,
      clientAutocompleteItems: [],
      template: ClientsAutocomplete
    };
  },
  methods: {
    addNewAppointment() {
      this.visitData.appointments.push({
        actions: "",
        duration: 60,
        date: new Date().toISOString().slice(0, 16)
      });
    },
    removeAppointment(idx) {
      this.visitData.appointments.splice(idx, 1);
    },
    getLabel(item) {
      if (item) {
        this.clientData = item;
        this.visitData.clientId = item.id;
        this.visitData.addressId = item.addresses[0].id;
        return (
          item.firstName +
          " " +
          item.lastName +
          " " +
          _.get(item, "addresses[0].address", "")
        );
      }
    },
    updateItems(text) {
      return fetch.get("/client?search=" + text).then(response => {
        this.clientAutocompleteItems = response.data.data;
      });
    },
    create(visit) {
      this.$validator
        .validate()
        .then(valid => {
          if (!valid) return;
          return VisitService.create(visit).then(message => {
            this.message = message;
            this.clientAutocompleteItems = [];
            this.clientAutocompleteItem = null;
            this.clientData = {};
            this.visitData = JSON.parse(JSON.stringify(emptyVisitData));
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
.appointment {
  background: #f5f5f5;
  padding: 10px 0;
}
</style>