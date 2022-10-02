<template>
<div class="wholeForm">
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="name"
            :counter="20"
            label="Namn på arr"
            color="#ffffff"
            required
            dark
            outlined
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Välj datum"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                dark
                color="#FFFFFF"
                outlined
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="menu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(date)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col
          cols="12"
          sm="5"
          md="4"
        >
          <v-menu
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="time"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="time"
                label="Välj tid"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
                dark
                color="#FFFFFF"
                outlined
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menu2"
              v-model="time"
              full-width
              @click:minute="$refs.menu2.save(time)"
            ></v-time-picker>
          </v-menu>
        </v-col>
        <v-col
          cols="12"
          md="12"
        >

          <v-textarea
            v-model="shortDesc"
            :counter="400"
            label="Kortare beskrivning av Arr"
            color="#ffffff"
            required
            dark
            outlined

          ></v-textarea>
        </v-col>

        <v-col
          cols="12"
          md="12"
        >
        <v-textarea
          v-model="desc"
          :counter="1200"
          label="Längre beskrivning av Arr"
          color="#ffffff"
          required
          dark
          outlined
        ></v-textarea>
        </v-col>

          <v-btn class="createButton" @click="createEvent">Skapa arr</v-btn>

      </v-row>
    </v-container>
  </v-form>
</div>
</template>

<script>

export default {
  methods: {
   async createEvent() {
      // POST request using fetch with async/await
     const payload = {
       name: this.name,
       desc: this.desc,
       shortDesc: this.shortDesc,
       date: this.fixedDate(new Date(this.date).toISOString(), this.time)
     }
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.$store.getters.getIdentityToken
        },
        body: JSON.stringify(payload)
      };
      const response = await fetch("https://a61zy252h4.execute-api.eu-north-1.amazonaws.com/dev/putEvent", requestOptions);
      const data = await response.json().then(this.$router.push('/'))
    },

    pushHome () {
      this.$router.push('/about')
    },

    fixedDate(date, time){
      return (date.substr(0, 11) + time + date.substr(17, 8))
    }
  },

  computed: {
    getUserName () {
      console.log(this.$store)
      return this.$store.getters.getUserName;
    },
  },

  data: () => ({
    valid: false,
    name: '',
    desc: '',
    shortDesc: '',
    date: '',
    menu2: false,
    menu: false
  })
}
</script>

<style>

.createButton {
  margin: 1px auto 30px auto;
}

.wholeForm {
  margin-top: 100px;
}
</style>

