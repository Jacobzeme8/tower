<template>
  <div v-if="event.creator" class="card my-3">
    <router-link :to="{ name: 'Event', params: { eventId: event.id } }">
      <img :src="event.coverImg" class="img-fluid cover-img mb-3" :title="`go to ${event.name}page`" alt="">
    </router-link>
    <h4>{{ event.name }}</h4>

    <p>Put together by: {{ event.creator.name }}</p>
    <p>Hosted at: {{ event.startDate }}</p>
  </div>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState";
import { Event } from "../models/Event";

export default {

  props: {
    event: {
      type: Event,
      required: true
    }
  },

  setup() {
    return {
    }
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