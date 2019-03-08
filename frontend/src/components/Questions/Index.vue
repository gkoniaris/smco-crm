<template>
    <div class="row mt-4">
      <div class="col-md-12">
        <h3>Ερωτήσεις</h3>
        <hr>
          <div class="row">
            <div class="col-md-8">
              <router-link to="/questions/create" class="btn btn-primary">Νέα ερώτηση</router-link>
            </div>
          </div>
        </div>
      <div class="col-md-12">
        <Table entity="question" :service="service" :table-fields="tableData.fields" :actions="tableData.actions" sort="askedDate" order="desc"/>
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
