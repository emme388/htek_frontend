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
          transition="scale-transition"
          width="50"
        />

        <v-spacer></v-spacer>

        <v-btn to="/about" text>
          <span class="mr-2">H-kalender</span>
          <v-icon>mdi-calendar-month</v-icon>
        </v-btn>
        <v-btn href="https://htek.se/" text>
          <span class="mr-2">H-Sektionen</span>
          <v-icon>mdi-alpha-h-box</v-icon>
        </v-btn>

      </div>

      <v-spacer></v-spacer>

      <v-btn
        to="/signIn"
        text
      >
        <span class="mr-2">Kommitté-aktiv</span>
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
</style>
