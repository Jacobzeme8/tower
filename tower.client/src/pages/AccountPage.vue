<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 d-flex flex-column m-auto pt-3">
        <h2>My Events</h2>
        <div class="row">
          <div v-for="event in events" class="col-3">
            <EventCardAboutPage :event="event" />
          </div>
        </div>
      </div>
      <div class="col-8 justify-content-center d-flex m-auto pt-3">
        <h2>My Tickets</h2>
      </div>
      <div v-for="ticket in tickets" class="col-8 m-auto p-2">
        <TicketCard :ticket="ticket" :event="ticket.event" :account="ticket.profile" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { ticketsService } from "../services/TicketsService"
import { eventsService } from "../services/EventsService"
export default {
  setup() {

    async function getTicketsForAccount() {
      try {
        await ticketsService.getTicketsForAccount()
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }

    async function getMyEvents() {
      try {
        await eventsService.getMyEvents()
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      getTicketsForAccount()
      getMyEvents()
    })


    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),
      events: computed(() => AppState.events)
    }
  }
}
</script>

<style scoped></style>
