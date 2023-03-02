<template>
  <div class="card">
    <div class="row">
      <div class="col-4">
        <img class=" coverImg img-fluid" :src="event.coverImg" alt="">
      </div>
      <div class="col-8">
        <h2>{{ event.name }}</h2>
        <h4>{{ account.name }}</h4>
        <p>Hosted at: {{ event.location }} on {{ new Date(event.startDate).toLocaleString() }}</p>
        <button @click="deleteTicket(ticket.id)" class="btn btn-danger">Delete Ticket</button>
      </div>
    </div>
  </div>
</template>


<script>
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { ticketsService } from "../services/TicketsService";

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
    return {

      async deleteTicket(ticketId) {
        try {
          if (await Pop.confirm('delete ticket?')) {
            await ticketsService.deleteTicket(ticketId)
          }
        } catch (error) {
          logger.error(error)
          Pop.error(error)
        }
      }

    }
  }
}
</script>


<style lang="scss" scoped>
.coverImg {
  height: 20vh;
  width: 100%;
}
</style>