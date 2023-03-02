<template>
  <div class="card">
    <p>{{ event.name }}</p>
    <p>{{ account.name }}</p>
  </div>
</template>


<script>
export default {

  props: {
    ticket: {
      type: Object,
      required: true
    },
    event: {
      type: Object,
      required: true
    },
    account: {
      type: Object,
      required: true
    }
  },

  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped></style>