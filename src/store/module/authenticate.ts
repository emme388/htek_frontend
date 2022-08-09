// @ts-nocheck
import config from '../../config/index'
import router from '../../router/index'
let AmazonCognitoIdentity = require('amazon-cognito-identity-js')

const state = {
  userPool: [],
  authDetails: '',
  userData: '',
  cognitoUser: null,
  tokens: {
    accessToken: '',
    idToken: '',
    refreshToken: ''
  },
  username: '',
  errcode: '',
  attributes: [],
  authenticated: false
}

const getters = {
  getStateAttributes (state) {
    return state.attributes
  },
  getIdentityToken (state) {
    return state.tokens.idToken
  },
  getUserName (state) {
    return state.username
  }
}

const mutations = {
  signOut (state) {
    state.cognitoUser.signOut()
    state.sessionToken = null
    state.authenticated = false
    state.username = ''
    state.userPool = []
  },
  setAttributes (state, attributes) {
    state.attributes = attributes
    state.username = state.attributes.filter(function (Obj) {
      return Obj.Name === 'email'
    })[0].Value
  },
  setUsername (state, payload) {
    state.username = payload
  },
  signIn (state) {
    state.authenticated = true
  },
  setUserPool (state) {
    state.userPool = new AmazonCognitoIdentity.CognitoUserPool(config.poolData)
  },
  setTokens (state, payload) {
    console.log(payload)
    state.tokens.accessToken = payload.getAccessToken().getJwtToken()
    state.tokens.idToken = payload.getIdToken().getJwtToken()
    state.tokens.refreshToken = payload.getRefreshToken().getToken()
  },
  setCognitoUser (state, payload) {
    state.cognitoUser = payload
  },
  setCognitoDetails (state, authData) {
    state.authDetails = new AmazonCognitoIdentity.AuthenticationDetails(authData)
    state.userData = { Username: authData.Username, Pool: state.userPool }
    state.cognitoUser = new AmazonCognitoIdentity.CognitoUser(state.userData)
  },
  setError (state, payload) {
    state.errcode = payload
  },
  clearError (state) {
    state.errcode = ''
  }
}

const actions = {
  signIn ({ state, commit, dispatch }, authData) {
    console.log("using new signIn method")
    console.log('pooldata', config.poolData)
    console.log('authData', authData)
    commit('clearError')
    commit('setUserPool')
    commit('setCognitoDetails', authData)
    console.log(state.cognitoUser.authenticateUser)
    state.cognitoUser.authenticateUser(state.authDetails, {
      onSuccess: (result) => {
        console.log('sign in success')
        commit('setTokens', result)
        commit('signIn')
        router.push('/createEvent')
        dispatch('getUserAttributes')
        dispatch('setLogoutTimer', 3600)
      },
      onFailure: (err) => {
        console.log('sign in failure')
        commit('setError', JSON.stringify(err))

      },
      newPasswordRequired: function(userAttributes, requiredAttributes) {
        console.log("User needs new password");
        console.log("UserAttributes: " + JSON.stringify(userAttributes));
        console.log("RequiredAttributes: " + JSON.stringify(requiredAttributes));
        let newPassword = prompt('A new password is required!');
        dispatch('newPassword', newPassword)
    },
    })
  },
  tryAutoSignIn ({ state, commit, dispatch }) {
    commit('setUserPool')
    let cognitoUser = state.userPool.getCurrentUser()
    if (cognitoUser != null) {
      commit('setCognitoUser', cognitoUser)
      state.cognitoUser.getSession(function (err, session) {
        if (err) {
          console.error(JSON.stringify(err))
        } else {
          commit('setTokens', session)
          commit('signIn')
          dispatch('getUserAttributes')
          dispatch('setLogoutTimer', 3600)
        }
      })
    }
  },
  getUserAttributes ({ commit}) {
    state.cognitoUser.getUserAttributes(function (err, attributes) {
      if (err) {
        console.error(JSON.stringify(err))
      } else {
        commit('setAttributes', attributes)
      }
    })
  },
  setLogoutTimer ({ state, commit, dispatch }, expirationTime) {
    setTimeout(() => {
      dispatch('signOut')
    }, expirationTime * 1000)
  },
  signOut ({ commit }) {
    commit('signOut')
    router.push('/about')
  },
  newPassword ({ state, commit, dispatch }, newPassword) {
    state.cognitoUser.completeNewPasswordChallenge(newPassword, [], {
      onSuccess: (result) => {
        console.log('new password success')
        commit('setTokens', result)
        commit('signIn')
        router.push('/createEvent')
        dispatch('getUserAttributes')
        dispatch('setLogoutTimer', 3600)
      },
      onFailure: (err) => {
        console.log('new password failure')
        commit('setError', JSON.stringify(err))
      }
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
