<template>
  <div class="eventDetails">
    <EventDetails/>
  </div>
</template>

<script>
// @ is an alias to /src
import EventDetails from '@/components/eventDetails.vue'
export default {
  name: 'eventDetails',
  components: {
    EventDetails
  }
}
</script>
