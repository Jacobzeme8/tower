<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-10 m-auto">
        <img class="img-fluid cover-img mt-4 rounded-top" :src="event.coverImg" alt="">
      </div>
      <div class="col-10 m-auto">
        <div class="card d-flex rounded-0 rounded-bottom">
          <span class="d-flex justify-content-between">
            <h1>{{ event.name }}</h1>
            <h1>Tickets Left: <span :class="`${event.capacity == 0 ? 'red-text' : ''} `">{{ event.capacity }}</span></h1>
          </span>
          <h4>Date: {{ event.startDate }} {{ event.location }}</h4>
          <h5 v-if="creator">Put together by: {{ creator.name }}</h5>
          <p>{{ event.description }}</p>
        </div>
      </div>
      <div class="col-10 m-auto py-3">
        <div class="card p-3">
          <form>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Email address</label>
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { useRoute } from "vue-router";
import { onMounted, computed, ref, watchEffect } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { eventsService } from "../services/EventsService";
import { AppState } from "../AppState";
import { commentsService } from "../services/CommentsService"
export default {
  setup() {

    const route = useRoute()
    async function getEventById() {
      try {
        const eventId = route.params.eventId
        await eventsService.getEventById(eventId)
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }

    async function getEventComments() {
      try {
        const eventId = route.params.eventId
        await commentsService.getEventComments(eventId)
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }

    watchEffect(() => {
      if (route.params.eventId) {
        getEventById()
      }
    })

    onMounted(() =>
      getEventComments()
    )

    return {
      event: computed(() => AppState.activeEvent),
      creator: computed(() => AppState.activeProfile)
    }
  }
}
</script>


<style lang="scss" scoped>
.cover-img {
  width: 100%;
  object-fit: cover;
  height: 40vh;
}

.red-text {
  color: red;
}
</style>