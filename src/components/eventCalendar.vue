<template>
  <v-row class="rowCol">
    <v-col class="rowCol fixedPadding">
      <v-sheet height="600" class="backgroundSheet" >
        <v-calendar
          class="calendar"
          @click:date="showEvent"
          @click:day="showEvent"
          :weekdays="weekday"
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
                    width="33%"
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
            <v-card-actions >
              <v-btn v-if="getUserName.length > 0 && compUserName(event.host)"
                  icon
                  class="deleteButton"
                  @click="deleteEvent(event.date, event.id)"
                  color="#f573ad"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn
                  icon
                  class="deleteButton"
                  @click="moreInfo(event.yearMonth, event.id)"
                  color="#f573ad"
              >
                <v-icon>mdi-information</v-icon>
              </v-btn>
            </v-card-actions>
          </div>
          </v-card>
        </v-menu>
      </v-sheet>
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
      if(this.events[date] === undefined) {
        return;
      }
      console.log(nativeEvent)
      if(this.hackyClickCounter < 3) {
        setTimeout(() => {
          nativeEvent.path[0].click();
        }, 50);
        this.hackyClickCounter++;
      } else {
        this.hackyClickCounter = 0;
      }
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

    compUserName (eventHost){

        let user = this.getUserName;
        let userHost
        if (user.split('@').pop().split('.')[0] === 'hd') {
          userHost = 'hd'
        } else if(user.split('@').pop().split('.')[0] === 'pubf')  {
          userHost = 'pubf'
        } else {
          userHost = user.match(/\..+(?=@)/)[0].substring(1)
        }
        return userHost === eventHost;
    },

    async deleteEvent (date, id) {
      const payload = {
        yearMonth: date.substr(0, 7),
        id: id
      }
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.$store.getters.getIdentityToken
        },
        body: JSON.stringify(payload)
      };
      const response = await fetch("https://a61zy252h4.execute-api.eu-north-1.amazonaws.com/dev/deleteItem", requestOptions);
      const data = await response.json().then(location.reload());

    },

    moreInfo(yearMonth, id){
      
      this.$router.push("/event?yearMonth=" + yearMonth + "&uuid=" + id);

    }
    
  },



  computed: {
    getUserName() {
      return this.$store.getters.getUserName;
    }
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data: () => ({
    // it works with only new Date() but complains if it's not a string in this format
    today: new Date().toISOString().split("T")[0],
    events: null,
    colors: ['#FFF'],
    category: ['Alla'],
    selectedDay: {},
    selectedElement: null,
    weekday:  [1, 2, 3, 4, 5, 6, 0],
    hackyClickCounter: 0
  })
}
</script>

<style>

body {
  background-color: #ee2c82;
}

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

.rowCol {
  color: #ee2c82;
  background-color: #ee2c82;
}

.calendar {
  color: #ee2c82;
  background-color: #ee2c82;
}

.backgroundSheet {
  color: #ee2c82;
  background-color: #ee2c82;
}

.imgholder:hover {
  width: 90%;
  cursor: pointer;
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

.deleteButton {
  float: left;
}

.fixedPadding {
  padding: 14px 0px 0px 12px;
}

@media only screen and (max-width: 600px) {
  .imgholder {
    flex-direction: column;
    width: 100%;
    height: 60%;
  }
}
</style>
<!--
<v-card-text class="text-left"
                :style="{
                  backgroundColor: '#e0218a'
                }">hello</v-card-text>
-->
