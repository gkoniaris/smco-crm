<template>
  <div class="row mt-4">
    <div class="col-md-12">
      <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-xl-6 col-md-6 mb-4">
          <div class="top-card card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <h3
                    class="text-xs font-weight-bold text-primary text-uppercase mb-3"
                  >{{stats.totalOpenCount}} ΑΝΟΙΧΤΑ</h3>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">({{stats.openDevicesCount}} Συσκευές, {{stats.openQuestionsCount}} Ερωτήσεις)</div>
                </div>
                <div class="col-auto">
                  <i class="fa fa-list fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-6 col-md-6 mb-4">
          <div class="top-card card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <h3
                    class="text-xs font-weight-bold text-warning text-uppercase mb-3"
                  >{{stats.totalDelayedCount}} ΚΑΘΥΣΤΕΡΗΣΑΝ</h3>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">({{stats.delayedDevicesCount}} Συσκευές, {{stats.delayedQuestionsCount}} Ερωτήσεις)</div>
                </div>
                <div class="col-auto">
                  <i class="fa fa-clock-o fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Earnings (Monthly) Card Example -->
        <!-- <div class="col-xl-3 col-md-6 mb-4">
          <div class="top-card card border-left-success shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div
                    class="text-xs font-weight-bold text-success text-uppercase mb-1"
                  >Earnings (Annual)</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div> -->

        <!-- Earnings (Monthly) Card Example -->
        <!-- <div class="col-xl-3 col-md-6 mb-4">
          <div class="top-card card border-left-info shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks</div>
                  <div class="row no-gutters align-items-center">
                    <div class="col-auto">
                      <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                    </div>
                    <div class="col">
                      <div class="progress progress-sm mr-2">
                        <div
                          class="progress-bar bg-info"
                          role="progressbar"
                          style="width: 50%"
                          aria-valuenow="50"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="row">
        <div class="col-md-6">
          <h3>Χρήσιμα τηλέφωνα</h3>
          <hr>
          <Table
            entity="usefulPhone"
            :hide-th="usefulPhones.tableData.hideTh"
            :pagination="usefulPhones.tableData.pagination"
            :service="usefulPhones.service"
            :table-fields="usefulPhones.tableData.fields"
            :actions="usefulPhones.tableData.actions"
          />
        </div>
        <div class="col-md-6">
          <Calendar :service="visits.service" view="month" height="600"/>
        </div>
      </div>
    </div>
    <div class="col-md-12 mt-4">
      <h3>Ερωτήσεις</h3>
      <hr>
      <Table
        entity="question"
        :order="questions.order"
        :sort="questions.sort"
        :pagination="questions.tableData.pagination"
        :service="questions.service"
        :table-fields="questions.tableData.fields"
        :actions="questions.tableData.actions"
        :filters="questions.filters"
      />
    </div>
    <div class="col-md-12 mt-4">
      <h3>Συσκευές</h3>
      <hr>
      <Table
        entity="device"
        :order="devices.order"
        :sort="devices.sort"
        :pagination="devices.tableData.pagination"
        :service="devices.service"
        :table-fields="devices.tableData.fields"
        :actions="devices.tableData.actions"
        :filters="devices.filters"
      />
    </div>
    <div class="col-md-12 mt-4">
      <h3>Επισκέψεις</h3>
      <hr>
      <Table
        entity="device"
        :order="visits.order"
        :sort="visits.sort"
        :pagination="visits.tableData.pagination"
        :service="visits.service"
        :table-fields="visits.tableData.fields"
        :actions="visits.tableData.actions"
        :filters="visits.filters"
      />
    </div>
  </div>
</template>

<script>
import Table from "./Table"
import Calendar from './Calendar'
import QuestionService from "../services/QuestionService"
import DeviceService from "../services/DeviceService"
import VisitService from "../services/VisitService"
import UsefulPhonesService from "../services/UsefulPhonesService"
import tableData from "../static/tableData"
import fetch from "../fetch"

export default {
  name: "Dashboard",
  components: { Table: Table, Calendar },
  data: () => {
    return {
      stats: {},
      questions: {
        service: QuestionService,
        tableData: tableData.questionTable,
        filters: { status: ["open", "freezed"] },
        sort: ["status", "date"],
        order: ["asc", "desc"]
      },
      devices: {
        service: DeviceService,
        tableData: tableData.deviceTable,
        filters: { status: ["open", "freezed"] },
        sort: ["status", "date"],
        order: ["asc", "desc"]
      },
      visits: {
        service: VisitService,
        tableData: tableData.visitTable,
        filters: { status: ["open", "freezed"] },
        sort: ["status", "date"],
        order: ["asc", "desc"]
      },
      usefulPhones: {
        service: UsefulPhonesService,
        tableData: tableData.usefulPhoneTable
      }
    };
  },
  mounted() {
    fetch.get("/stats?type=pending").then(results => {
      this.stats = results.data.stats
    })
  }
};
</script>

<style>
  .top-card {
    border-radius: 5px !important;
  }
</style>
