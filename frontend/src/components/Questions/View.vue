<template>
  <div class="row mt-4">
    <div class="col-md-12">
      <h3>Επεξεργασία ερώτησης ΤΤΕ {{question.id}}</h3>
      <hr>
      <form @submit.prevent="update(question)" name="updateQuestionForm" novalidate>
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
                        :class="{ 'is-invalid': errors.has('question') }"
                      ></textarea>
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
                    <StatusChange :entity="question" :initialStatus="initialQuestionStatus" :freezedDate="freezedDate" :closedDate="closedDate"/>
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
import QuestionService from "../../services/QuestionService"
import ClientProfile from "../Clients/Profile"
import StatusChange from '../Partials/StatusChange'
import _ from "lodash";

export default {
  name: "ClientsView",
  components: { ClientProfile, StatusChange },
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
        this.freezedDate = this.question.freezed_date
          ? this.question.freezed_date.slice(0, 10)
          : null;
        this.closedDate = this.question.closed_date
          ? this.question.closed_date.slice(0, 10)
          : null;
        this.client = question.client;
      });
    },
    setField(field, value) {
      this.question[field] = value;
    },
    update(data) {
      this.$validator.validate().then(valid => {
        if (!valid) return;
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
            this.message = message;
            window.scrollTo(0, 0);
            this.find(id);
          })
          .catch(error => {
            this.error = error.message;
            window.scrollTo(0, 0);
          });
      });
    }
  },
  mounted() {
    this.find(this.$route.params.id);
  }
};
</script>