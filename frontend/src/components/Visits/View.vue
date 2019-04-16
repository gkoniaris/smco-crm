<template>
<div class="row mt-4">
  <div class="col-md-12">
    <h3>Επεξεργασία συσκευής ΤΤΣ {{visit.id}}</h3>
    <hr>
    <form
      @submit.prevent="update(visit)"
      name="updateVisitForm"
      novalidate
    >
      <fieldset v-bind:disabled="initialVisitStatus === 'closed'">
        <div class="alert alert-danger" v-show="error">{{error}}</div>
        <div class="alert alert-success" v-show="message">{{message}}</div>
        <div class="row" v-if="initialVisitStatus">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-6 mt-4">
                <h5 class="mb-4">Πληροφορίες Συσκευής</h5>
                <div class="row">
                <div class="col-md-12">
                  <label class="font-weight-bold">Τύπος συσκευής:</label>
                  <input type="text" 
                  v-model="visit.type" 
                  class="form-control"
                  name="type"
                  v-validate="{ required: true }"
                  :class="{ 'is-invalid': errors.has('type') }"/>
                  <small class="invalid-feedback">{{ errors.first('type') }}</small>
                </div>
                <div class="col-md-12">
                  <label class="font-weight-bold">Μοντέλο συσκευής:</label>
                  <input type="text" 
                  v-model="visit.model" 
                  class="form-control"
                  name="model"
                  v-validate="{ required: true }"
                  :class="{ 'is-invalid': errors.has('model') }"/>
                  <small class="invalid-feedback">{{ errors.first('model') }}</small>
                </div>
                <div class="col-md-12">
                  <label class="font-weight-bold">Serial Number:</label>
                  <input type="text" v-model="visit.serialNumber" class="form-control"/>
                </div>
                <div class="col-md-12">
                  <label class="font-weight-bold">Περιγραφή βλάβης από πελάτη:</label>
                  <input type="text" 
                  v-model="visit.failureDescription" 
                  class="form-control"
                  name="failure_description"
                  v-validate="{ required: true }"
                  :class="{ 'is-invalid': errors.has('failure_description') }"/>
                  <small class="invalid-feedback">{{ errors.first('failure_description') }}</small>
                </div>
                <div class="col-md-12">
                  <label class="font-weight-bold">Διάγνωση βλάβης από μαγαζί:</label>
                  <input type="text" v-model="visit.diagnosisDescription" class="form-control"/>
                </div>
                <div class="col-md-12">
                  <label class="font-weight-bold" for="visit">Ραντεβού
                    <div class="btn btn-primary btn-sm ml-2" v-on:click="addNewAppointment">+</div>
                  </label>
                  <div
                    class="border-left rounded pl-2 mb-2 appointment"
                    v-bind:key="appointmentIdx"
                    v-for="(appointment, appointmentIdx) in visit.appointments"
                  >
                    <label>Ημερομηνία</label>
                    <input type="datetime-local" step="1800" v-model="appointment.date" class="form-control">
                    <label>Διάρκεια (λεπτά)</label>
                    <input type="number" step="30" min="30" v-model="appointment.duration" class="form-control">
                    <label>Ενέργειες</label>
                    <textarea v-model="appointment.actions" 
                      class="form-control"
                      placeholder="Αρχικός έλεγχος"/>
                    <div class="row" v-if="visit.appointments.length > 1">
                      <div class="col-md-3 mt-2">
                        <div
                          class="btn btn-danger btn-sm"
                          v-on:click="removeAppointment(appointmentIdx)"
                        >Αφαίρεση</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 mt-4">
                  <label class="font-weight-bold">Σχόλια επικοινωνίας:</label>
                  <textarea v-model="visit.contactComments" class="form-control"></textarea>
                </div>
                <div class="col-md-12 mt-4">
                  <label class="font-weight-bold">Γενικά σχόλια:</label>
                  <textarea v-model="visit.comments" class="form-control"></textarea>
                </div>                
                <StatusChange :entity="visit" :initialStatus="initialVisitStatus" :freezedDate="freezedDate" :closedDate="closedDate"/>
              </div>
              </div>
              <div class="col-md-6">
                <ClientProfile></ClientProfile>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-if="initialVisitStatus !== 'closed'">
          <div class="col-md-12 mt-4">
            <button type="submit" class="btn btn-primary">Ενημέρωση βλάβης</button>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</div>
</template>


<script>
import VisitService from "../../services/VisitService"
import ClientProfile from "../Clients/Profile"
import StatusChange from '../Partials/StatusChange'
import _ from "lodash";
import moment from 'moment'

export default {
  name: "ClientsView",
  components: { ClientProfile, StatusChange },
  data() {
    return {
      message: null,
      error: null,
      visit: {},
      initialVisitStatus: null,
      freezedDate: null,
      closedDate: null
    };
  },
  methods: {
    find(id) {
      VisitService.find(id).then(visit => {
        this.initialVisitStatus = visit.status;
        this.visit = Object.assign(
          {},
          { profit: null, shopHappy: null, clientHappy: null, completed: null },
          visit
        );
        this.freezedDate = this.visit.freezedDate
          ? this.visit.freezedDate.slice(0, 10)
          : null;
        this.closedDate = this.visit.closedDate
          ? this.visit.closedDate.slice(0, 10)
          : null;
        this.visit.appointments =  this.visit.appointments.map(appointment => {
          appointment.date = appointment.date.slice(0, 16)
          return appointment
        })
        this.client = visit.client;
      });
    },
    setField(field, value) {
      this.visit[field] = value;
    },
    addNewAppointment() {
      this.visit.appointments.push({
        actions: "",
        duration: 60,
        date: moment().add(4, 'h').minutes(0).toDate().toISOString().slice(0, 16)
      });
    },
    removeAppointment(idx) {
      this.visit.appointments.splice(idx, 1);
    },
    update(data) {
      this.$validator.validate().then(valid => {
        if (!valid) return;
        const id = data.id;
        const updateData = _.pick(data, [
          "type",
          "model",
          "serialNumber",
          "failureDescription",
          "diagnosisDescription",
          "appointments",
          "comments",
          "contactComments",
          "status",
          "profit",
          "shopHappy",
          "clientHappy",
          "completed"
        ]);
        VisitService.update(id, updateData)
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

<style>
.appointment {
  background: #f5f5f5;
  padding: 10px 0;
}
</style>