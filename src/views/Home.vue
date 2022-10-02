<template>
  <div class="home">
    <eventCalendar />
  </div>
</template>

<script>
import eventCalendar from '@/components/eventCalendar'

export default {
  name: 'Home',
  components: {
    eventCalendar
  }
}
</script>

<style>
.theme--light.v-calendar-weekly .v-calendar-weekly__day {
  border-right: #ee2c82 3px solid;
  border-bottom: #ee2c82 3px solid;
  color: #000000;
}

.theme--light.v-calendar-weekly .v-calendar-weekly__head-weekday {
  border-right: #ee2c82 3px solid;
  color: #000000;
}


</style>
