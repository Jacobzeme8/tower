<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5">Create an Event!</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="createEvent()">
          <div class="mb-3">
            <label for="name" class="form-label">name</label>
            <input v-model="editable.name" required type="text" class="form-control" id="name" placeholder="name">
          </div>
          <div class="mb-3">
            <label for="description " class="form-label">description</label>
            <textarea v-model="editable.description" required class="form-control" id="description " rows="3"></textarea>
          </div>
          <div class="mb-3">
            <label for="coverImg " class="form-label">Cover Image</label>
            <input v-model="editable.coverImg" required type="url" class="form-control" id="coverImg "
              placeholder="coverImg ">
          </div>
          <div class="mb-3">
            <label for="location " class="form-label">location</label>
            <input v-model="editable.location" required type="text" class="form-control" id="location "
              placeholder="location ">
          </div>
          <div class="mb-3">
            <label for="startDate" class="form-label">Start Date and Time</label>
            <input :min="newminDate" v-model="editable.startDate" required type="datetime-local" class="form-control"
              id="startDate " placeholder="startDate">
          </div>
          <div class="mb-3">
            <label for="type " class="form-label">type</label>
            <select v-model="editable.type" required class="form-control" id="type " placeholder="type ">
              <option value="concert">concert</option>
              <option value="convention">convention</option>
              <option value="sport">sport</option>
              <option value="digital">digital</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="capacity" class="form-label">capacity</label>
            <input v-model="editable.capacity" required type="number" class="form-control" id="capacity"
              placeholder="capacity">
          </div>
          <button type="submit" data-bs-dismiss="modal" class="btn btn-success mt-3">Create Event!</button>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, onMounted } from "vue";
import { router } from "../router";
import { eventsService } from "../services/EventsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

export default {
  setup() {

    const editable = ref({})
    const date = new Date()
    const firstDate = date.toISOString().split('.')[0]
    const minDate = firstDate.split(':')
    minDate.splice(2, 1)
    const newminDate = minDate.join(':')

    onMounted(() => {
      logger.log(newminDate)
    })


    return {
      editable,
      newminDate,
      date,
      async createEvent() {
        try {
          const eventData = editable.value
          const eventId = await eventsService.createEvent(eventData)
          router.push({ name: 'Event', params: { eventId: eventId } })
        } catch (error) {
          logger.error(error)
          Pop.error(error)
        }
      },

    }
  }
}
</script>


<style lang="scss" scoped></style>