<template>
  <div class="container-fluid">
    <div class="row">
      <div v-for="ticket in tickets" class="col-8">
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

    onMounted(() => {
      getTicketsForAccount()
    })


    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets)
    }
  }
}
</script>

<style scoped></style>
