<template>
  <div class="row mt-4">
    <div class="col-md-12">
    <h3>Δημιουργία ερώτησης</h3>
    <hr>
    <form
      @submit.prevent="create(questionData)"
      name="createQuestionForm"
      novalidate
    >
      <div class="alert alert-danger" v-show="error">{{error}}</div>
      <div class="alert alert-success" v-show="message">{{message}}</div>
      <div class="row">
        <div class="col-md col-sm-12 card mt-2 ml-3 mr-3">
          <div class="card-body">
            <div class="card-title">Πληροφορίες ερώτησης</div>
            <div class="card-text">
              <div class="form-group">
                <label for="question">Ερώτηση</label>
                <textarea
                  class="form-control"
                  name="question"
                  placeholder="Πόσο κοστίζει η επισκευή του σίδερου μου?"
                  v-model="questionData.question"
                  v-validate="{ required: true }"
                  :class="{ 'is-invalid': errors.has('question') }"
                />
                <small class="invalid-feedback">{{ errors.first('question') }}</small>
              </div>
              <div class="form-group">
                <label for="question">Σχόλια επικοινωνίας</label>
                <textarea
                  class="form-control"
                  placeholder="Καλέστε μεταξύ 15:30 και 19:30 λόγω δουλειάς"
                  v-model="questionData.contactComments"
                />
              </div>
              <div class="form-group">
                <label for="createdDate">Ημερομηνία</label>
                <input type="date" class="form-control" v-model="questionData.askedDate"/>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="card-title">Πληροφορίες πελάτη</div>
            <div class="card-text">
              <div class="form-group mb-5" v-if="questionData.clientId === null">
                <label for="fullNameSearch">Αναζήτηση πελάτη</label>
                <input type="text"
                  v-model="questionData.clientId"
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
              <div class="row" v-if="questionData.clientId">
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
                <button type="submit" class="btn btn-primary">Αποθήκευση ερώτησης</button>
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
import QuestionService from "../../services/QuestionService"
import fetch from "../../fetch.js"
import _ from "lodash"

const emptyQuestionData = {
  question: '',
  contactComments: '',
  clientId: null,
  askedDate: new Date().toISOString().slice(0, 10)
}

export default {
  name: "QuestionsCreate",
  data: () => {
    return {
      clientData: {},
      message: null,
      error: null,
      questionData: Object.assign({}, emptyQuestionData),
      clientAutocompleteItem: null,
      clientAutocompleteItems: [],
      template: ClientsAutocomplete
    };
  },
  methods: {
    getLabel(item) {
      if (item) {
        this.clientData = item
        this.questionData.clientId = item.id
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
    create(question) {
      this.$validator
        .validate()
        .then(valid => {
          if (!valid) return
          return QuestionService.create(question).then(message => {
            this.message = message
            this.clientAutocompleteItems = []
            this.clientAutocompleteItem = null
            this.clientData = {}
            this.questionData = Object.assign({}, emptyQuestionData)
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
