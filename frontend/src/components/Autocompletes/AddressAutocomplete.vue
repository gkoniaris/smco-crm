<template>
  <div>
    <span>{{ item.address }} {{ item.region || item.city }} {{item.postalCode ? ', ' + item.postalCode : ''}} {{item.lat ? '' : '(Δεν βρέθηκε)' }}</span>
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