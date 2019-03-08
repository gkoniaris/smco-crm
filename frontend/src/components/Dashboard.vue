<template>
    <div class="row mt-4">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-6">
            <h3>Χρήσιμα τηλέφωνα</h3>
            <hr>
            <Table entity="usefulPhone" :hide-th="usefulPhones.tableData.hideTh" :pagination="usefulPhones.tableData.pagination" :service="usefulPhones.service" :table-fields="usefulPhones.tableData.fields" :actions="usefulPhones.tableData.actions"/>
          </div>
          <div class="col-md-6">
          </div>
        </div>
      </div>
      <div class="col-md-12 mt-4">
        <h3>Ερωτήσεις</h3>
        <hr>
        <Table entity="question" :order="questions.order" :sort="questions.sort" :pagination="questions.tableData.pagination" :service="questions.service" :table-fields="questions.tableData.fields" :actions="questions.tableData.actions" :filters="questions.filters"/>
      </div>
      <div class="col-md-12 mt-4">
        <h3>Βλάβες</h3>
        <hr>
        <Table entity="device" :order="devices.order" :sort="devices.sort" :pagination="devices.tableData.pagination" :service="devices.service" :table-fields="devices.tableData.fields" :actions="devices.tableData.actions" :filters="devices.filters"/>
      </div>
    </div>
</template>

<script>
import Table from "./Table"
import QuestionService from "../services/QuestionService"
import DeviceService from "../services/DeviceService"
import UsefulPhonesService from '../services/UsefulPhonesService'
import tableData from '../static/tableData'

export default {
  name: "Dashboard",
  components: { Table: Table },
  data: () => {
    return {
      questions: {
        service: QuestionService,
        tableData: tableData.questionTable,
        filters: {status: ['open', 'freezed']},
        sort: ['status', 'askedDate'],
        order: ['asc', 'desc']
      },
      devices: {
        service: DeviceService,
        tableData: tableData.deviceTable,
        filters: {status: ['open', 'freezed']},
        sort: ['status', 'date'],
        order: ['asc', 'desc']
      },
      usefulPhones: {
        service: UsefulPhonesService,
        tableData: tableData.usefulPhoneTable
      }
    }
  }
}
</script>