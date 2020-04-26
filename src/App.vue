<template>
  <v-app>
    <v-content>
      <NavigationBar />
    </v-content>
  </v-app>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";

export default {
  name: "App",

  components: {
    NavigationBar
  },

  data: () => ({
    //
  })
};
</script>
