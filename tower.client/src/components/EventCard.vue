<template>
  <div class="card my-3">
    <img :src="event.coverImg" class="img-fluid cover-img mb-3" alt="">
    <h4>{{ event.name }}</h4>
    <p>Put together by: {{ event.creator.name }}</p>
    <p>Hosted at: {{ event.startDate }}</p>
  </div>
</template>


<script>
import { Event } from "../models/Event";

export default {

  props: {
    event: {
      type: Event,
      required: true
    }
  },

  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.cover-img {
  height: 30vh;
  width: 100%;
  object-fit: cover;
}
</style>