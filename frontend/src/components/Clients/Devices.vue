<template>
    <div class="row">
      <div class="col-md-12">
        <Table entity="device" :service="service" :table-fields="tableData.fields" :actions="tableData.actions" :filters="{clientId: $parent.client.id}"/>
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
