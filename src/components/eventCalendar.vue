<template>
  <v-row>
    <v-col>
      <v-sheet height="600" >
        <v-calendar
          @click:day="showEvent"
          @click:date="showEvent"
          :now="today"
          :value="today"
          color="primary"
        >
          <template v-slot:day="{ past, date }">
            <v-row
              class="fill-height"
            >
              <template v-if="events[date]">
                <div class="imgholder"
                id="imgholder">
                  <img
                    v-for="event in events[date]"
                    alt="logo"
                    class="logo"
                    :src=getImgString(event.image)
                    width="30%"
                  />
                </div>
              </template>
            </v-row>
          </template>
        </v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="true"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="330px"
            max-width="330px"
            flat
          >
          <div v-for="event in events[selectedDay]">

            <v-toolbar
              class="flex-grow-0"
              color='#f573ad'
              dark
              flat
            >
                <img :src=getImgString(event.image) alt="logo" width="13%"/>
                <v-toolbar-title v-html="event.name" class="toolbarTitle"></v-toolbar-title>
                <v-spacer></v-spacer>
                <div class= "eventTime">
                <v-card-text
                             v-text="event.date.substr(11, 5)"></v-card-text>
                </div>
            </v-toolbar>
            <v-card-text>
              <span v-html="event.shortDesc"></span>
            </v-card-text>
          </div>
          </v-card>
        </v-menu>
      </v-sheet>
      {{ getUserName }}
    </v-col>
  </v-row>
</template>

<script>
export default {
  async created () {
    const response = await fetch("https://a61zy252h4.execute-api.eu-north-1.amazonaws.com/dev/getEvents"
      + "?date=" + new Date().toISOString().substr(0, 7))
    this.events = await response.json();
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    test (date) {
      console.log(date)
    },
    getImgString (imgPath) {
      return imgPath
    },
    showEvent ({ nativeEvent, date }) {
      console.log(date, nativeEvent)
      const open = () => {
        this.selectedDay = date
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
  },

  computed: {
    getUserName() {
      console.log(this.$store)
      return this.$store.getters.getUserName;
    }
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data: () => ({
    today: new Date(),
    events: null,
    colors: ['#FFF'],
    category: ['Alla'],
    selectedDay: {},
    selectedElement: null,
  })
}
</script>

<style>

.eventToolbar {
  border: 5px dotted #ee2c82;
}

.eventTime {
  float: right;
  position: relative;
}

.imgholder {
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  width: 80%;
  height: 80%;
  justify-items: center;
  margin: auto;
  position: relative;
  bottom: 10px;
}

.logo {
  float: left;
  margin: auto;
}

.imgholder:hover {
  width: 88%;
}

.theme--light.v-calendar-weekly .v-calendar-weekly__head-weekday{
  border-right: rgb(238,44,130) 3px solid;
  border-bottom: rgb(238,44,130) 3px solid;
  color: #000000;
}
.theme--light.v-application {
  background: #ee2c82;
}

.theme--light.v-calendar-weekly .v-calendar-weekly__day {
  border-right: #ee2c82 3px solid;
  border-bottom: #ee2c82 3px solid;
}

.theme--light.v-btn {
  color: #ee2c82;
}

.row {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  margin: -14px;
}

.toolbarTitle {
  margin-left: 10px;
}

</style>
<!--
<v-card-text class="text-left"
                :style="{
                  backgroundColor: '#e0218a'
                }">hello</v-card-text>
-->
