<template>
<div class="row mt-4">
  <div class="col-md-12">
    <h3>Επεξεργασία βλάβης ΤΤΣ {{device.id}}</h3>
    <hr>
    <form
      @submit.prevent="update(device)"
      name="updateDeviceForm"
      novalidate
    >
      <fieldset v-bind:disabled="initialDeviceStatus === 'closed'">
        <div class="alert alert-danger" v-show="error">{{error}}</div>
        <div class="alert alert-success" v-show="message">{{message}}</div>
        <div class="row" v-if="initialDeviceStatus">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-6 mt-4">
                <h5 class="mb-4">Πληροφορίες Βλάβης</h5>
                <div class="row">
                <div class="col-md-12">
                  <label class="font-weight-bold">Τύπος συσκευής:</label>
                  <input type="text" 
                  v-model="device.type" 
                  class="form-control"
                  name="type"
                  v-validate="{ required: true }"
                  :class="{ 'is-invalid': errors.has('type') }"/>
                  <small class="invalid-feedback">{{ errors.first('type') }}</small>
                </div>
                <div class="col-md-12">
                  <label class="font-weight-bold">Μοντέλο συσκευής:</label>
                  <input type="text" 
                  v-model="device.model" 
                  class="form-control"
                  name="model"
                  v-validate="{ required: true }"
                  :class="{ 'is-invalid': errors.has('model') }"/>
                  <small class="invalid-feedback">{{ errors.first('model') }}</small>
                </div>
                <div class="col-md-12">
                  <label class="font-weight-bold">Serial Number:</label>
                  <input type="text" v-model="device.serialNumber" class="form-control"/>
                </div>
                <div class="col-md-12">
                  <label class="font-weight-bold">Περιγραφή βλάβης από πελάτη:</label>
                  <input type="text" 
                  v-model="device.failureDescription" 
                  class="form-control"
                  name="failure_description"
                  v-validate="{ required: true }"
                  :class="{ 'is-invalid': errors.has('failure_description') }"/>
                  <small class="invalid-feedback">{{ errors.first('failure_description') }}</small>
                </div>
                <div class="col-md-12">
                  <label class="font-weight-bold">Διάγνωση βλάβης από μαγαζί:</label>
                  <input type="text" v-model="device.diagnosisDescription" class="form-control"/>
                </div>
                <div class="col-md-12 mt-4">
                  <label class="font-weight-bold">Ενέργειες:</label>
                  <textarea v-model="device.actions" class="form-control"></textarea>
                </div>
                <div class="col-md-12 mt-4">
                  <label class="font-weight-bold">Σχόλια επικοινωνίας:</label>
                  <textarea v-model="device.contactComments" class="form-control"></textarea>
                </div>
                <div class="col-md-12 mt-4">
                  <label class="font-weight-bold">Γενικά σχόλια:</label>
                  <textarea v-model="device.comments" class="form-control"></textarea>
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
                    v-bind:class="{'btn-info': device.status === 'open', 'btn-secondary': device.status !== 'open'}"
                    v-on:click="setField('status', 'open')"
                    v-bind:disabled="initialDeviceStatus === 'freezed' || initialDeviceStatus === 'closed'"
                  >Ανοιχτή</button>
                  <button
                    type="button"
                    class="btn mr-2"
                    v-bind:class="{'btn-info': device.status === 'freezed', 'btn-secondary': device.status !== 'freezed'}"
                    v-on:click="setField('status', 'freezed')"
                    v-bind:disabled="initialDeviceStatus === 'closed'"
                  >Σε αναμονή</button>
                  <button
                    type="button"
                    class="btn mr-2"
                    v-bind:class="{'btn-info': device.status === 'closed', 'btn-secondary': device.status !== 'closed'}"
                    v-on:click="setField('status', 'closed')"
                  >Κλειστή</button>
                </div>
                <div class="col-md-12 mt-4" v-if="device.status === 'closed'">
                  <h5 class="mb-4">After Sales Σχόλια</h5>
                  <div class="row">
                    <div class="col-md-12">
                      <label class="font-weight-bold">Εξυπηρετήθηκε ο πελάτης:</label>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="btn btn-secondary mr-2"
                    v-bind:class="{'btn-info': device.completed === true, 'btn-secondary': device.completed === false}"
                    v-on:click="setField('completed', true)"
                  >Ναι</button>
                  <button
                    type="button"
                    class="btn mr-2 btn-secondary"
                    v-bind:class="{'btn-info': device.completed === false, 'btn-secondary': device.completed === true}"
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
                    v-bind:class="{'btn-info': device.clientHappy === true, 'btn-secondary': device.clientHappy === false}"
                    v-on:click="setField('clientHappy', true)"
                  >Θετική</button>
                  <button
                    type="button"
                    class="btn mr-2 btn-secondary"
                    v-bind:class="{'btn-info': device.clientHappy === false, 'btn-secondary': device.clientHappy === true}"
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
                    v-bind:class="{'btn-info': device.shopHappy === true, 'btn-secondary': device.shopHappy === false}"
                    v-on:click="setField('shopHappy', true)"
                  >Θετική</button>
                  <button
                    type="button"
                    class="btn mr-2 btn-secondary"
                    v-bind:class="{'btn-info': device.shopHappy === false, 'btn-secondary': device.shopHappy === true}"
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
                    v-bind:class="{'btn-info': device.profit === true, 'btn-secondary': device.profit === false}"
                    v-on:click="setField('profit', true)"
                  >Ναι</button>
                  <button
                    type="button"
                    class="btn mr-2 btn-secondary"
                    v-bind:class="{'btn-info': device.profit === false, 'btn-secondary': device.profit === true}"
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
        <div class="row" v-if="initialDeviceStatus !== 'closed'">
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
import DeviceService from "../../services/DeviceService";
import ClientProfile from "../Clients/Profile";
import _ from "lodash";

export default {
  name: "ClientsView",
  components: { ClientProfile },
  data() {
    return {
      message: null,
      error: null,
      device: {},
      initialDeviceStatus: null,
      freezedDate: null,
      closedDate: null
    };
  },
  methods: {
    find(id) {
      DeviceService.find(id).then(device => {
        this.initialDeviceStatus = device.status;
        this.device = Object.assign(
          {},
          { profit: null, shopHappy: null, clientHappy: null, completed: null },
          device
        );
        this.freezedDate = this.device.freezedDate ? this.device.freezedDate.slice(0, 10) : null
        this.closedDate = this.device.closedDate ? this.device.closedDate.slice(0, 10) : null
        this.client = device.client;
      });
    },
    setField(field, value) {
      this.device[field] = value;
    },
    update(data) {
      this.$validator
        .validate()
        .then(valid => {
          if (!valid) return
          const id = data.id;
          const updateData = _.pick(data, [
            "type",
            "model",
            "serialNumber",
            "failureDescription",
            "diagnosisDescription",
            "actions",
            "comments",
            "contactComments",
            "status",
            "profit",
            "shopHappy",
            "clientHappy",
            "completed"
          ]);
          DeviceService.update(id, updateData)
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