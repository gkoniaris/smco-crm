<template>
    <div class="row mt-4">
      <div class="col-md-12">
        <h3>Επισκέψεις</h3>
        <div class="row">
          <div class="col-md-12">
            <Calendar :service="service"/>
          </div>
        </div>
        <hr>
          <div class="row">
            <div class="col-md-8">
              <router-link to="/visits/create" class="btn btn-primary">Νέα επίσκεψη</router-link>
            </div>
          </div>
        </div>
      <div class="col-md-12">
        <Table entity="visit" :service="service" :table-fields="tableData.fields" :actions="tableData.actions" sort="date" order="desc"/>
      </div>
    </div>
</template>

<script>
import moment from 'moment'
import Table from "../Table"
import Calendar from '../Calendar'
import VisitService from "../../services/VisitService"
import tableData from '../../static/tableData'

export default {
  name: "VisitsIndex",
  components: { Table: Table, Calendar },
  data: () => {
    return {
      service: VisitService,
      tableData: Object.assign({}, tableData.visitTable),
    }
  }
}
</script>
<style>

</style>