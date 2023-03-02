<template>
  <div class="card p-2">
    <div>
      <b class="fs-5">{{ creator.name }}</b>
      <img class="img-fluid rounded-circle profile-picture ms-2" :src="creator.picture" alt="">
    </div>
    <p>{{ comment.body }}</p>
    <div v-if="account.id == creator.id" class="d-flex justify-content-end">
      <!-- TODO make delete button work -->
      <button class="btn btn-danger">Delete Comment</button>
    </div>
  </div>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState";

export default {

  props: {
    comment: {
      type: Object,
      required: true
    },
    creator: {
      type: Object,
      required: true
    }

  },

  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>
.profile-picture {
  height: 45 px;
  width: 45px;
}
</style>