<template>
<div class="row mt-4">
  <div class="col-md-12">
    <h3>Επεξεργασία ερώτησης ΤΤΕ {{question.id}}</h3>
    <hr>
  <form
    @submit.prevent="update(question)"
    name="updateQuestionForm"
    novalidate
  >
    <fieldset v-bind:disabled="initialQuestionStatus === 'closed'">
      <div class="alert alert-danger" v-show="error">{{error}}</div>
      <div class="alert alert-success" v-show="message">{{message}}</div>
      <div class="row" v-if="initialQuestionStatus">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-6 mt-4">
              <h5 class="mb-4">Πληροφορίες Ερώτησης</h5>
              <div class="row">
              <div class="col-md-12">
                <label class="font-weight-bold">Ερώτηση:</label>
                <textarea 
                  v-model="question.question" 
                  class="form-control"
                  name="question"
                  v-validate="{ required: true }"
                  :class="{ 'is-invalid': errors.has('question') }">
                </textarea>
                <small class="invalid-feedback">{{ errors.first('question') }}</small>
              </div>
              <div class="col-md-12 mt-4">
                <label class="font-weight-bold">Σχόλια επικοινωνίας:</label>
                <textarea v-model="question.contactComments" class="form-control"></textarea>
              </div>
              <div class="col-md-12 mt-4">
                <label class="font-weight-bold">Απάντηση:</label>
                <textarea v-model="question.answer" class="form-control"></textarea>
              </div>
              <div class="col-md-12 mt-4" v-if="freezedDate">
                <label class="font-weight-bold">Μπήκε σε αναμονή στις:</label>
                <input type="date" disabled v-bind:value="freezedDate" class="form-control"/>
              </div>
              <div class="col-md-12 mt-4" v-if="closedDate">
                <label class="font-weight-bold">Έκλεισε στις:</label>
                <input type="date" disabled v-bind:value="closedDate" class="form-control"/>
              </div>
              <div class="col-md-12 mt-4">
                <div class="row">
                  <div class="col-md-12">
                    <label class="font-weight-bold">Κατάσταση ερώτησης:</label>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn mr-2"
                  v-bind:class="{'btn-info': question.status === 'open', 'btn-secondary': question.status !== 'open'}"
                  v-on:click="setField('status', 'open')"
                  v-bind:disabled="initialQuestionStatus === 'freezed' || initialQuestionStatus === 'closed'"
                >Ανοιχτή</button>
                <button
                  type="button"
                  class="btn mr-2"
                  v-bind:class="{'btn-info': question.status === 'freezed', 'btn-secondary': question.status !== 'freezed'}"
                  v-on:click="setField('status', 'freezed')"
                  v-bind:disabled="initialQuestionStatus === 'closed'"
                >Σε αναμονή</button>
                <button
                  type="button"
                  class="btn mr-2"
                  v-bind:class="{'btn-info': question.status === 'closed', 'btn-secondary': question.status !== 'closed'}"
                  v-on:click="setField('status', 'closed')"
                >Κλειστή</button>
              </div>
              <div class="col-md-12 mt-4" v-if="question.status === 'closed'">
                <h5 class="mb-4">After Sales Σχόλια</h5>
                <div class="row">
                  <div class="col-md-12">
                    <label class="font-weight-bold">Εξυπηρετήθηκε ο πελάτης:</label>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn-secondary mr-2"
                  v-bind:class="{'btn-info': question.completed === true, 'btn-secondary': question.completed === false}"
                  v-on:click="setField('completed', true)"
                >Ναι</button>
                <button
                  type="button"
                  class="btn mr-2 btn-secondary"
                  v-bind:class="{'btn-info': question.completed === false, 'btn-secondary': question.completed === true}"
                  v-on:click="setField('completed', false)"
                >Όχι</button>
                <div class="row">
                  <div class="col-md-12">
                    <label class="font-weight-bold">Εμπειρία πελάτη:</label>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn mr-2 btn-secondary"
                  v-bind:class="{'btn-info': question.clientHappy === true, 'btn-secondary': question.clientHappy === false}"
                  v-on:click="setField('clientHappy', true)"
                >Θετική</button>
                <button
                  type="button"
                  class="btn mr-2 btn-secondary"
                  v-bind:class="{'btn-info': question.clientHappy === false, 'btn-secondary': question.clientHappy === true}"
                  v-on:click="setField('clientHappy', false)"
                >Αρνητική</button>
                <div class="row">
                  <div class="col-md-12">
                    <label class="font-weight-bold">Εμπειρία μαγαζιού:</label>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn mr-2 btn-secondary"
                  v-bind:class="{'btn-info': question.shopHappy === true, 'btn-secondary': question.shopHappy === false}"
                  v-on:click="setField('shopHappy', true)"
                >Θετική</button>
                <button
                  type="button"
                  class="btn mr-2 btn-secondary"
                  v-bind:class="{'btn-info': question.shopHappy === false, 'btn-secondary': question.shopHappy === true}"
                  v-on:click="setField('shopHappy', false)"
                >Αρνητική</button>
                <div class="row">
                  <div class="col-md-12">
                    <label class="font-weight-bold">Υπήρξε κέρδος;</label>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn mr-2 btn-secondary"
                  v-bind:class="{'btn-info': question.profit === true, 'btn-secondary': question.profit === false}"
                  v-on:click="setField('profit', true)"
                >Ναι</button>
                <button
                  type="button"
                  class="btn mr-2 btn-secondary"
                  v-bind:class="{'btn-info': question.profit === false, 'btn-secondary': question.profit === true}"
                  v-on:click="setField('profit', false)"
                >Όχι</button>
              </div>
            </div>
            </div>
            <div class="col-md-6">
              <ClientProfile></ClientProfile>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-if="initialQuestionStatus !== 'closed'">
        <div class="col-md-12 mt-4">
          <button type="submit" class="btn btn-primary">Ενημέρωση ερώτησης</button>
        </div>
      </div>
    </fieldset>
  </form>
  </div>
</div>
</template>


<script>
import QuestionService from "../../services/QuestionService";
import ClientProfile from "../Clients/Profile";
import _ from "lodash";

export default {
  name: "ClientsView",
  components: { ClientProfile },
  data() {
    return {
      message: null,
      error: null,
      question: {},
      initialQuestionStatus: null,
      freezedDate: null,
      closedDate: null
    };
  },
  methods: {
    find(id) {
      QuestionService.find(id).then(question => {
        this.initialQuestionStatus = question.status;
        this.question = Object.assign(
          {},
          { profit: null, shopHappy: null, clientHappy: null, completed: null },
          question
        );
        this.freezedDate = this.question.freezedDate ? this.question.freezedDate.slice(0, 10) : null
        this.closedDate = this.question.closedDate ? this.question.closedDate.slice(0, 10) : null
        this.client = question.client;
      });
    },
    setField(field, value) {
      this.question[field] = value;
    },
    update(data) {
      this.$validator
        .validate()
        .then(valid => {
          if (!valid) return
          const id = data.id;
          const updateData = _.pick(data, [
            "question",
            "contactComments",
            "answer",
            "status",
            "profit",
            "shopHappy",
            "clientHappy",
            "completed"
          ]);
          QuestionService.update(id, updateData)
            .then(message => {
              this.message = message
              window.scrollTo(0, 0)
              this.find(id)
            })
            .catch(error => {
              this.error = error.message
              window.scrollTo(0, 0)
            })
        })
    }
  },
  mounted() {
    this.find(this.$route.params.id);
  }
};
</script>