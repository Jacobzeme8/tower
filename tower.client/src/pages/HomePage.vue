<template>
  <div class="container-fluid">
    <div class="row m-3 mt-5 sticky-top">
      <div class="col-12 color-scheme rounded d-flex p-2 ">
        <button @click="filterEvents('')" class="color-scheme-reverse m-auto btn border-warning">all</button>
        <button @click="filterEvents('concert')" class=" color-scheme-reverse m-auto btn border-warning">concert</button>
        <button @click="filterEvents('convention')"
          class="color-scheme-reverse m-auto btn border-warning">convention</button>
        <button @click="filterEvents('sport')" class="color-scheme-reverse m-auto btn border-warning">sports</button>
        <button @click="filterEvents('digital')" class="color-scheme-reverse m-auto btn border-warning">digital</button>
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
import { onMounted, computed, ref } from "vue";
import { AppState } from "../AppState";

export default {
  setup() {

    const editable = ref('')

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
      editable,
      events: computed(() => {
        if (!editable.value) {
          return AppState.events
        }
        else {
          return AppState.events.filter(e => e.type == editable.value)
        }
      }),

      filterEvents(filter) {
        // AppState.events = []
        // NOTE come back to find out how to fix ghost images
        editable.value = filter
      }
    }
  }
}
</script>

<style scoped lang="scss"></style>
