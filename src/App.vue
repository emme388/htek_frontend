<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Htek Logga"
          class="shrink mr-2"
          contain
          src="@/assets/Htek_logga.png"
          width="50"
        />

        <v-spacer></v-spacer>

        <v-btn to="/" text>
          <span class="mr-2 btn-text">H-kalender</span>
          <v-icon>mdi-calendar-month</v-icon>
        </v-btn>
        <v-btn href="https://htek.se/" text>
          <span class="mr-2 btn-text">H-Sektionen</span>
          <v-icon>mdi-alpha-h-box</v-icon>
        </v-btn>


      </div>

      <v-spacer></v-spacer>

      <v-btn
        v-if="getUserName.length > 0"
        @click="signOut"
        text
      >
        <span class="mr-2 btn-text">Logga ut</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>

      <v-btn
        @click="navAdmin"
        text
      >
        <span class="mr-2 btn-text">{{ displayName() }}</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
    <v-footer
    color="#ee2c82">
        <img class="footerLogo" src="https://htek.se/wp-content/uploads/2019/10/H-Styrets-logga_vit.png" alt="hstyret">
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
  created() {
    this.$store.dispatch('tryAutoSignIn')
  },
  computed: {
    getUserName () {
      console.log(this.$store)
      return this.$store.getters.getUserName;
    },
  },

  methods: {
    navAdmin (){
      if(this.getUserName.length > 0) {
        this.$router.push('/createEvent')
      }else {
        this.$router.push('/signIn')
      }
    },

    signOut (){
      this.$store.dispatch('signOut')
    },

    displayName (){
      if(this.getUserName.length > 0) {
        return (this.getUserName.split('@')[0])
      }else{
        return "Kommitté-aktiv"
      }
    }
  }
})
</script>

<style>
.footerLogo {
  margin: auto;
  width: 300px;
}
.footerHolder {
  background-color: #ee2c82;
}

.displayName {
  font-family: "Roboto", sans-serif;
  font-weight: 420;
  width: 60%;

}

@media only screen and (max-width: 600px) {
  .btn-text {
    display: none;
  }
}
</style>
