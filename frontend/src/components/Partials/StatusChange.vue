<template>
  <div class="row">
    <div class="col-md-12">
      <div class="col-md-12 mt-4" v-if="freezedDate">
        <label class="font-weight-bold">Μπήκε σε αναμονή στις:</label>
        <input type="date" disabled v-bind:value="freezedDate" class="form-control">
      </div>
      <div class="col-md-12 mt-4" v-if="closedDate">
        <label class="font-weight-bold">Έκλεισε στις:</label>
        <input type="date" disabled v-bind:value="closedDate" class="form-control">
      </div>
      <div class="col-md-12 mt-4">
        <div class="row">
          <div class="col-md-12">
            <label class="font-weight-bold">Κατάσταση:</label>
          </div>
        </div>
        <button
          type="button"
          class="btn mr-2"
          v-bind:class="{'btn-info': entity.status === 'open', 'btn-secondary': entity.status !== 'open'}"
          v-on:click="setField('status', 'open')"
          v-bind:disabled="initialStatus === 'freezed' || initialStatus === 'closed'"
        >Ανοιχτή</button>
        <button
          type="button"
          class="btn mr-2"
          v-bind:class="{'btn-info': entity.status === 'freezed', 'btn-secondary': entity.status !== 'freezed'}"
          v-on:click="setField('status', 'freezed')"
          v-bind:disabled="initialStatus === 'closed'"
        >Σε αναμονή</button>
        <button
          type="button"
          class="btn mr-2"
          v-bind:class="{'btn-info': entity.status === 'closed', 'btn-secondary': entity.status !== 'closed'}"
          v-on:click="setField('status', 'closed')"
        >Κλειστή</button>
      </div>
      <div class="col-md-12 mt-4" v-if="entity.status === 'closed'">
        <h5 class="mb-4">After Sales Σχόλια</h5>
        <div class="row">
          <div class="col-md-12">
            <label class="font-weight-bold">Εξυπηρετήθηκε ο πελάτης:</label>
          </div>
        </div>
        <button
          type="button"
          class="btn mr-2"
          v-bind:class="{'btn-info': entity.completed === true, 'btn-secondary': entity.completed !== true}"
          v-on:click="setField('completed', true)"
        >Ναι</button>
        <button
          type="button"
          class="btn mr-2"
          v-bind:class="{'btn-info': entity.completed === false, 'btn-secondary': entity.completed !== false}"
          v-on:click="setField('completed', false)"
        >Όχι</button>
        <div class="row">
          <div class="col-md-12">
            <label class="font-weight-bold">Εμπειρία πελάτη:</label>
          </div>
        </div>
        <button
          type="button"
          class="btn mr-2"
          v-bind:class="{'btn-info': entity.clientHappy === true, 'btn-secondary': entity.clientHappy !== true}"
          v-on:click="setField('clientHappy', true)"
        >Θετική</button>
        <button
          type="button"
          class="btn mr-2"
          v-bind:class="{'btn-info': entity.clientHappy === false, 'btn-secondary': entity.clientHappy !== false}"
          v-on:click="setField('clientHappy', false)"
        >Αρνητική</button>
        <div class="row">
          <div class="col-md-12">
            <label class="font-weight-bold">Εμπειρία μαγαζιού:</label>
          </div>
        </div>
        <button
          type="button"
          class="btn mr-2"
          v-bind:class="{'btn-info': entity.shopHappy === true, 'btn-secondary': entity.shopHappy !== true}"
          v-on:click="setField('shopHappy', true)"
        >Θετική</button>
        <button
          type="button"
          class="btn mr-2"
          v-bind:class="{'btn-info': entity.shopHappy === false, 'btn-secondary': entity.shopHappy !== false}"
          v-on:click="setField('shopHappy', false)"
        >Αρνητική</button>
        <div class="row">
          <div class="col-md-12">
            <label class="font-weight-bold">Υπήρξε κέρδος;</label>
          </div>
        </div>
        <button
          type="button"
          class="btn mr-2"
          v-bind:class="{'btn-info': entity.profit === true, 'btn-secondary': entity.profit !== true}"
          v-on:click="setField('profit', true)"
        >Ναι</button>
        <button
          type="button"
          class="btn mr-2"
          v-bind:class="{'btn-info': entity.profit === false, 'btn-secondary': entity.profit !== false}"
          v-on:click="setField('profit', false)"
        >Όχι</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatusChangePartial",
  props: {
    initialStatus: String,
    entity: Object,
    freezedDate: String,
    closedDate: String
  },
  methods: {
    setField(field, value) {
      this.entity[field] = value;
    }
  }
};
</script>