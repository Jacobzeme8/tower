<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-10 m-auto">
        <img class="img-fluid cover-img mt-4 rounded-top" :src="event.coverImg" alt="">
      </div>
      <div class="col-10 m-auto">
        <div class="card d-flex rounded-0 rounded-bottom p-2">
          <span class="d-flex justify-content-between">
            <h1>{{ event.name }}</h1>
            <h1>Tickets Left: <span :class="`${event.capacity == 0 ? 'red-text' : ''} `">{{ event.capacity }}</span></h1>
          </span>
          <h4>Date: {{ event.startDate }} {{ event.location }}</h4>
          <h5 v-if="creator">Put together by: {{ creator.name }}</h5>
          <p>{{ event.description }}</p>
          <div class="d-flex justify-content-end">
            <button @click="purchaseTicketForEvent()" class="btn btn-success">Purchase Ticket</button>
          </div>
        </div>
      </div>
      <div class="col-10 m-auto py-3">
        <div class="card p-3">
          <form @submit.prevent="postComment()">
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Post a Comment</label>
              <textarea v-model="editable.body" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              <button class="btn btn-success mt-2">Post</button>
            </div>
          </form>
        </div>
      </div>
      <div class="col-9">
        <div class="card">
          <span v-for="ticket in tickets">
            <img class="img-fluid rounded-circle profile-picture ms-2" src="" alt="">
          </span>
        </div>
      </div>
      <div v-for="comment in comments" class="col-8 m-auto p-2 mb-2">
        <CommentCard :comment="comment" :creator="comment.creator" />
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
import { ticketsService } from "../services/TicketsService"
export default {
  setup() {

    const editable = ref({})

    const route = useRoute()
    async function getEventById() {
      try {
        const eventId = route.params.eventId
        logger.log('getting event by id')
        await eventsService.getEventById(eventId)
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }

    async function getEventComments() {
      logger.log('getting commennts for event')
      try {
        const eventId = route.params.eventId
        await commentsService.getEventComments(eventId)
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }

    async function getTicketsForEvent() {
      try {
        const eventId = route.params.eventId
        await ticketsService.getTicketsForEvent(eventId)
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

    onMounted(() => {
      getEventComments()
      getTicketsForEvent()
    }
    )

    return {
      event: computed(() => AppState.activeEvent),
      creator: computed(() => AppState.activeProfile),
      comments: computed(() => AppState.comments),
      tickets: computed(() => AppState.tickets),
      editable,


      async postComment() {
        try {
          const eventId = route.params.eventId
          const commentData = editable.value
          await commentsService.postComment(commentData, eventId)
        } catch (error) {
          logger.error(error)
          Pop.error(error)
        }
      },

      async purchaseTicketForEvent() {
        try {
          const eventId = route.params.eventId
          await ticketsService.purchaseTicketForEvent(eventId)
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
.cover-img {
  width: 100%;
  object-fit: cover;
  height: 40vh;
}

.red-text {
  color: red;
}

.profile-picture {
  height: 45 px;
  width: 45px;
}
</style>