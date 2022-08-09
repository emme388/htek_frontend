<template>
  <div class="signIn">
    <Signin
    class="sign"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Signin from '@/components/auth/Signin.vue'
export default {
  // this component is called SignIn but the refferd to one is called Signin with lowecase i
  // because otherwise the compiler freaks out
  name: 'SignIn',
  components: {
    Signin
  }
}
</script>

<style>

.sign {
  top: 20px;
}
</style>
