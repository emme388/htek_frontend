<template>
  <app-wrapper>
    <transition appear name="fadeout">
      <v-card class="pa-2">
        <v-card-title primary-title>
          <div>
            <h4 class="headline mb-0">Logga in med Htek-mail</h4>
          </div>
            
        </v-card-title>
        <v-card-text>
          <v-alert v-if="pwSuccess" dismissible class="mb-4 mt-0" type="success">
            Lösenord ändrat!
          </v-alert>
          <v-alert outline type="error" dismissible class="mb-4 mt-0" v-model="showerr">
            {{ errmsg }}
            <v-btn v-if="resend" color="primary" flat small :to="'/resend'">Re-send Confirmation</v-btn>
          </v-alert>
          <v-form v-model="valid" ref="form">
            <v-text-field
              autocomplete="username"
              label="E-mail"
              v-model="email"
              :rules="[emailrules.required, emailrules.email]"
              outlined
              clear-icon="mdi-close-circle"
              required clearable>
            </v-text-field>
            <v-text-field
              autocomplete="current-password"
              v-model="password"
              :rules="passRules"
              label="Lösenord"
              hint="Minst 8 tecken"
              :append-icon="hidepw ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="() => (hidepw = !hidepw)"
              :type="hidepw ? 'password' : 'text'"
              outlined
              required>
            </v-text-field>
          </v-form>
          <v-btn
            block
            :loading="loading"
            @click.native="onSubmit()"
            :disabled="!valid"
            class="mt-3 mb-3 white--text"
            color="primary">
            Logga in
            <span slot="loader">Laddar...</span>
          </v-btn>
        </v-card-text>
        <v-card-actions class="ml-2 mb-2">
          <v-btn flat small :to="'/forgot'">Glömt lösenord?</v-btn>
        </v-card-actions>
      </v-card>
    </transition>
  </app-wrapper>
</template>

<script>
import wrapper from './wrapper'
import terms from './terms'

export default {
  components: {
    'app-wrapper': wrapper,
    'app-terms': terms
  },

  data: function () {
    return {
      pwSuccess: false,
      callback: false,
      showerr: false,
      resend: false,
      errmsg: '',
      username: '',
      valid: false,
      email: '',
      emailrules: {
        required: (value) => !!value || 'E-mail is required',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'E-mail must be valid'
        }
      },
      password: '',
      passRules: [
        (v) => !!v || 'Password is required',
        (v) => !v || v.length >= 8 || 'Password must be at least 8 characters'
      ],
      hidepw: true,
      loader: false,
      loading: false
    }
  },
  //fixa falsy värde, kolla så att parameter är "true" och inget annat
  created () {
    this.pwSuccess = this.$route.query.success 
  },

  computed: {
    errcode: function () {
      return this.$store.state.auth.errcode
    }
  },
  methods: {
    onSubmit () {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      console.log('sign in with: ' + this.email + ' ' + this.password)
      var authData = {
        Username: this.email,
        Password: this.password
      }
      console.log("heeeelo")
      this.$store.dispatch('signIn', authData)
    },
    getMessage: function () {
      return this.message
    }
  },
  watch: {
    errcode () {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      console.log('watched error code: ' + this.errcode)
      if (this.errcode !== '') {
        if (this.errcode === '"NotAuthorizedException"') {
          this.errmsg = 'Incorrect username or password'
        } else if (this.errcode === '"UserNotFoundException"') {
          this.errmsg = 'User not found'
        } else if (this.errcode === '"UserNotConfirmedException"') {
          this.$store.commit('setUsername', this.email)
          this.resend = true
          this.errmsg = 'User registration not confirmed'
        } else if (this.errcode === '"LimitExceededException"') {
          this.errmsg = 'Attempt limit exceeded, please try after some time'
        } else {
          this.errmsg = 'An error has occured!'
        }
        this.showerr = true
      } else {
        this.showerr = false
      }
      this[l] = false
      this.loader = null
    }
  }
}
</script>
<style scoped>
</style>
