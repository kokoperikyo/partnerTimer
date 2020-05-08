<template>
  <div class="content">
    <v-row>
      <v-col cols="3"></v-col>
      <v-col cols="6" align="center">
        <v-img
          width="280px"
          src="https://firebasestorage.googleapis.com/v0/b/partnertimer-46d47.appspot.com/o/iconForFirst.jpg?alt=media&token=d6c168d9-5f70-4793-a603-35506a1b0b29"
        ></v-img>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
  </div>
</template>
<script>
import { db } from "@/plugins/firebase";

export default {
  mounted() {
    if (localStorage.getItem("key") == null) {
      var len = 20;
      var str = "abcdefghijklmnopqrstuvwxyz";
      var strLen = str.length;
      var result = "";
      for (var i = 0; i < len; i++) {
        result += str[Math.floor(Math.random() * strLen)];
      }
      localStorage.setItem("key", result);
      db.collection("whichNotionSt")
        .doc(result)
        .set({
          st: 0
        });
      //スマホログインの場合はid渡してtopicに登録
      var ua = navigator.userAgent;
      if (ua.indexOf("Android") > 0) {
        window.appJsInterface.subscribeUid(result);
      } else if (window.innerWidth <= 1024) {
        window.webkit.messageHandlers.callbackHandler.postMessage(result);
      }
      setTimeout(() => {
        this.$router.push("/top");
      }, 3000);
    } else {
      this.$router.push("/top");
    }
  }
};
</script>
<style>
.content {
  margin-top: 200px;
}
</style>