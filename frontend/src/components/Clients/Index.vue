<template>
    <div class="row mt-4">
      <div class="col-md-12">
        <h3>Πελάτες</h3>
        <hr>
        <div class="row">
          <div class="col-md-8">
            <router-link to="/clients/create" class="btn btn-primary">Νέος πελάτης</router-link>
          </div>
        </div>
      </div>
      <div class="col-md-12">
          <Table entity="client" :service="service" :table-fields="tableData.fields" :actions="tableData.actions" :allow-search="true"/>
      </div>
    </div>
</template>

<script>
import Table from "../Table";
import ClientService from "../../services/ClientService";
import tableData from '../../static/tableData'

export default {
  name: "ClientsIndex",
  components: { Table: Table },
  data: () => {
    return {
      service: ClientService,
      tableData: Object.assign({}, tableData.userTable)
    }
  }
}
</script>
