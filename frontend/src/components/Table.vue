<template>
  <div class="row">
    <div class="col-md-12">
      <div class="row" v-if="allowSearch">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-3 mb-2">
              <input
                type="text"
                class="form-control form-control-inline"
                placeholder="Αναζήτηση"
                v-model="search"
                v-on:input="get"
              >
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="table table-sm table-borderless table-hover mt-4" v-if="entities">
              <thead v-if="!hideTh">
                <tr>
                  <th
                    scope="col"
                    v-bind:class="{'cursor-pointer': tableField.sort}"
                    v-on:click="tableField.sort ? setSort(tableField.sort) : null"
                    v-bind:key="tableField.name"
                    v-for="tableField in tableFields"
                  >
                    <span class="table-item">{{tableField.title}}<i
                      v-if="tableField.sort && sortBy == tableField.sort && orderBy == 'desc'"
                      class="fa fa-sort-up"
                      aria-hidden="true"
                    /><i
                      v-if="tableField.sort && sortBy == tableField.sort && orderBy == 'asc'"
                      class="fa fa-sort-down"
                      aria-hidden="true"
                    /><i
                      v-if="tableField.sort && sortBy != tableField.sort"
                      class="fa fa-sort"
                      aria-hidden="true"
                    /></span>
                  </th>
                  <th scope="col" class="w-30" v-if="actions">Ενέργειες</th>
                </tr>
              </thead>
              <tbody>
                <tr v-bind:class="{'font-weight-bold': item.status === 'open', 'table-active': item.status === 'freezed'} " v-bind:key="item.id" v-for="item in entities">
                  <td
                    scope="row"
                    v-bind:key="tableField.name"
                    v-for="tableField in tableFields"
                  >{{getProperty(item, tableField.property, tableField.replace, tableField.format)}}</td>
                  <td class="w-30" scope="row" v-if="actions">
                    <router-link
                      v-if="actions.view"
                      class="btn btn-primary btn-sm mr-2"
                      :to="{ name: actions.view.to, params: { id: item.id }}"
                    >Προβολή</router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav v-if="pages > 1 && pages !== null">
            <paginate
              :page-count="pages"
              :click-handler="setPage"
              :prev-text="'Προηγ'"
              :next-text="'Επόμ'"
              :containerClass="'pagination'"
              :pageClass="'page-item'"
              :page-link-class="'page-link'"
              :prev-class="'page-item'"
              :next-class="'page-item'"
              :prev-link-class="'page-link'"
              :next-link-class="'page-link'"
            ></paginate>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "Table",
  props: ["entity", "service", "tableFields", "actions", "allowSearch", "hideTh", "filters", "order", "sort"],
  data: () => {
    return {
      sortBy: null,
      orderBy: null,
      page: 1,
      pages: null,
      count: null,
      search: null,
      entities: null
    };
  },
  mounted() {
    this.sortBy = this.sort || 'id'
    this.orderBy = this.order || 'desc'
    this.get();
  },
  methods: {
    getProperty(item, key, replace, format) {
      let value = replace ? replace[_.get(item, key)] : _.get(item, key)
      if (format) {
        value = format(value)
      }
      return value
    },
    setPage(page) {
      this.page = page;
      this.get();
    },
    setSort(field) {
      if (this.sortBy === field) {
        this.orderBy = this.orderBy === "asc" ? "desc" : "asc";
      }
      this.sortBy = field;
      this.get();
    },
    get() {
      this.service
        .get(Object.assign({},
        {
          sort: this.sortBy,
          order: this.orderBy,
          page: this.page,
          search: this.search
        }, this.filters || {}))
        .then(({ entities, count, pages }) => {
          this.entities = entities
          this.count = count
          this.pages = pages
        })
    }
  }
};
</script>

<style>
.table-item > i {
  display: inline;
  padding-left: 10px;
}
.freezed-item {
  background: #b9b9b9;
}
tr.closed-item td {
  position: relative;
}
tr.closed-item td:before {
    content: " ";
    position: absolute;
    top: 44%;
    left: 0;
    border-bottom: 1px solid red;
    width: 100%;
    opacity: 0.2;
}
</style>