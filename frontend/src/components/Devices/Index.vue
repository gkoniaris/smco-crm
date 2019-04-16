<template>
    <div class="row mt-4">
      <div class="col-md-12">
          <h3>Συσκευές</h3>
          <hr>
          <div class="row">
            <div class="col-md-8">
              <router-link to="/devices/create" class="btn btn-primary">Νέα συσκευή</router-link>
            </div>
          </div>
        </div>
      <div class="col-md-12">
        <Table entity="device" :service="service" :table-fields="tableData.fields" :actions="tableData.actions" sort="date" order="desc"/>
      </div>
    </div>
</template>

<script>
import Table from "../Table";
import DeviceService from "../../services/DeviceService";
import tableData from '../../static/tableData'

export default {
  name: "DevicesIndex",
  components: { Table: Table },
  data: () => {
    return {
      service: DeviceService,
      tableData: Object.assign({}, tableData.deviceTable)
    }
  }
}
</script>
