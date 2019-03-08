<template>
  <div>
    <span>{{ item.firstName }} {{ item.lastName }} {{item.addresses && item.addresses[0] ? ', ' + item.addresses[0].address : ''}} {{item.id ? '' : ' (new)'}}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true },
    searchText: { required: true }
  }
}
</script>