<template>
  <div class="container-fluid">
    <div class="row m-3">
      <div class="col-12 bg-dark rounded d-flex p-2">
        <button class="m-auto btn btn-success">all</button>
        <button class="m-auto btn btn-success">concert</button>
        <button class="m-auto btn btn-success">convention</button>
        <button class="m-auto btn btn-success">sports</button>
        <button class="m-auto btn btn-success">digital</button>
      </div>
    </div>
    <div class="row">
      <div class="col-3" v-for="event in events">
        <EventCard :event="event" />
      </div>
    </div>
  </div>
</template>

<script>
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { eventsService } from "../services/EventsService"
import { onMounted, computed } from "vue";
import { AppState } from "../AppState";

export default {
  setup() {

    async function getAllEvents() {
      try {
        await eventsService.getAllEvents()
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }

    onMounted(() =>
      getAllEvents()
    )

    return {
      events: computed(() => AppState.events)
    }
  }
}
</script>

<style scoped lang="scss"></style>
