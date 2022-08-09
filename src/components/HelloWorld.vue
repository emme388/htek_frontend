<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <v-sheet height="400">
          <v-calendar
            ref="calendar"
            :now="today"
            :value="today"
            :events="events"
            type="month"
            :style="{
                    backgroundColor: 'rgb(238,44,130)'
                    }"
          ></v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HelloWorld',
  data: () => ({
    today: new Date(),
    events: [
      {
        name: 'Weekly Meeting',
        start: '2022-06-23 09:00',
        end: '2022-06-23 10:00'
      },
      {
        name: 'Thomas\' Birthday',
        start: '2019-01-10'
      },
      {
        name: 'Mash Potatoes',
        start: '2019-01-09 12:30',
        end: '2019-01-09 15:30'
      }
    ]
  })
})
</script>
