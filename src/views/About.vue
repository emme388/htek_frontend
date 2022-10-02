<template>
  <div class="home">
    <v-card-text style="font-size:3em" class="text-center">H-sektionens kalender</v-card-text>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <h1>hello</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
