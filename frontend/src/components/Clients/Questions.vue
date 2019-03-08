<template>
  <div class="row">
    <div class="col-md-12">
      <Table entity="question" :service="service" :table-fields="tableData.fields" :actions="tableData.actions" :filters="{clientId: $parent.client.id}"/>
    </div>
  </div>
</template>

<script>
import Table from "../Table";
import QuestionService from "../../services/QuestionService";
import tableData from '../../static/tableData'

export default {
  name: "QuestionsIndex",
  components: { Table: Table },
  data: () => {
    return {
      service: QuestionService,
      tableData: Object.assign({}, tableData.questionTable)
    }
  }
}
</script>
