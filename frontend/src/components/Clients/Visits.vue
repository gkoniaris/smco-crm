<template>
  <div class="row">
    <div class="col-md-12">
      <Table entity="visit" :service="service" :table-fields="tableData.fields" :actions="tableData.actions" :filters="{clientId: $parent.client.id}"/>
    </div>
  </div>
</template>

<script>
import Table from "../Table";
import VisitService from "../../services/VisitService";
import tableData from '../../static/tableData'

export default {
  name: "VisitsIndex",
  components: { Table: Table },
  data: () => {
    return {
      service: VisitService,
      tableData: Object.assign({}, tableData.visitTable)
    }
  }
}
</script>
