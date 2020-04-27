<template>
  <div>
    <v-dialog v-model="repetitionDialog" max-width="400">
      <v-card class="pa-3" color="#4F5FB0">
        <ul>
          <li style="font-size:14px; color:white;">16分ごとに通知が届きます</li>
          <li style="font-size:14px; color:white;" class="mt-2">おやつ・なでる・スナップショットで1セット</li>
          <li style="font-size:14px; color:white;" class="mt-2">バトルで1セット</li>
          <li style="font-size:14px; color:white;" class="mt-2">おやつ・なでる・スナップショットから開始してください</li>
        </ul>
        <v-alert
          style="font-size:12px; color:black;"
          class="py-1 mt-3"
          color="#EFAD00"
          type="info"
        >開始すると大喜びになるまで通知が届き続けます(14回)</v-alert>
        <v-alert
          style="font-size:12px; color:black;"
          class="py-1"
          color="#EFAD00"
          type="info"
        >途中で解除ができないので時間に余裕のある時に行ってください</v-alert>
        <v-alert
          style="font-size:12px; color:black;"
          class="py-1"
          color="#EFAD00"
          type="info"
        >大喜びになるまで3時間45分ほどかかります</v-alert>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="setNotionRepetition" rounded depressed>開始</v-btn>
          <v-btn @click="repetitionDialog = false" dark rounded outlined depressed>閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="onceEachDialog" max-width="400">
      <v-card class="pa-3" color="#4F5FB0">
        <v-card color="#EFAD00" class="pa-2" flat>
          <ul>
            <li style="font-size:14px; color:black;">16分後に通知が届きます</li>
            <li style="font-size:14px; color:black;" class="mt-2">おやつ・なでる・スナップショットで1セット</li>
            <li style="font-size:14px; color:black;" class="mt-2">バトルで1セット</li>
            <li style="font-size:14px; color:black;" class="mt-2">おやつ・なでる・スナップショットから開始してください</li>
          </ul>
        </v-card>

        <v-card-actions class="mt-2">
          <v-spacer></v-spacer>
          <v-btn @click="setNotionOnceEach(0)" rounded depressed>開始</v-btn>
          <v-btn @click="onceEachDialog = false" dark rounded outlined depressed>閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="startDialog" max-width="400">
      <v-card class="pa-3" color="#4F5FB0">
        <v-row justify="center">
          <v-icon color="#EFAD00" size="120" style="center">mdi-checkbox-marked-circle-outline</v-icon>
        </v-row>
        <v-alert
          style="font-size:12px; color:black;"
          class="py-1 mt-3"
          color="#EFAD00"
          type="info"
        >16分後に通知が届きます</v-alert>
        <v-alert
          style="font-size:12px; color:black;"
          class="py-1"
          color="#EFAD00"
          type="info"
        >おやつ・なでる・スナップショットから開始してください</v-alert>
      </v-card>
    </v-dialog>
    <v-dialog v-model="otherStartDialog" max-width="400">
      <v-card class="pa-3" color="#4F5FB0">
        <v-row justify="center">
          <v-icon color="#EFAD00" size="120" style="center">mdi-checkbox-marked-circle-outline</v-icon>
        </v-row>
        <v-alert
          style="font-size:12px; color:black;"
          class="py-1 mt-3"
          color="#EFAD00"
          type="info"
        >16分後に通知が届きます</v-alert>
      </v-card>
    </v-dialog>
    <v-dialog v-model="battleStartDialog" max-width="400">
      <v-card class="pa-3" color="#4F5FB0">
        <v-row justify="center">
          <v-icon color="#EFAD00" size="120" style="center">mdi-checkbox-marked-circle-outline</v-icon>
        </v-row>
        <v-alert
          style="font-size:12px; color:black;"
          class="py-1 mt-3"
          color="#EFAD00"
          type="info"
        >16分後に通知が届きます</v-alert>
      </v-card>
    </v-dialog>
    <div :style="'margin-top: ' + getMarginTop + 'px'">
      <div v-show="isFirstSt">
        <v-row justify="center">
          <v-btn @click="repetitionDialog = true " color="#4F5FB0" dark rounded width="200px">繰り返し通知</v-btn>
        </v-row>
        <v-row justify="center" class="mt-10">
          <v-btn @click="onceEachDialog = true " color="#4F5FB0" dark rounded width="200px">1回ごとに通知</v-btn>
        </v-row>
      </div>
      <v-row justify="center" class="mt-5">
        <v-btn
          @click="setNotionOnceEach(1)"
          v-show="isStOne"
          color="#4F5FB0"
          dark
          rounded
          small
        >おやつ・なでる・スナップショット完了</v-btn>
      </v-row>
      <v-row justify="center" class="mt-5" v-show="isStTwo">
        <v-btn @click="setNotionOnceEach(2)" color="#4F5FB0" dark rounded width="200px">バトル完了</v-btn>
      </v-row>
      <v-row justify="center" class="mt-5" v-show="isStOneOrTwo">
        <v-btn @click="resetSt" color="#4F5FB0" outlined rounded width="100px">終了</v-btn>
      </v-row>
      <div v-if="isStEleven">
        <v-card flat color="#4F5FB0" dark class="pa-2">
          <v-card
            flat
            color="#EFAD00"
            style="color:black;"
            class="px-2"
          >{{getCreatedTime}}にバトル完了しました</v-card>
          <div class="mt-2 px-2">{{getFinishTime}}以降におやつ・なでる・スナップショットを実行してください</div>
        </v-card>
      </div>
      <div v-if="isStTwelve">
        <v-card flat color="#4F5FB0" dark class="pa-2">
          <v-card
            flat
            color="#EFAD00"
            style="color:black;"
            class="px-2"
          >{{getCreatedTime}}におやつ・なでる・スナップショットを完了しました</v-card>
          <div class="mt-2 px-2">{{getFinishTime}}以降にバトルしてください</div>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "@/plugins/firebase";
import firebase from "@firebase/app";
import { format } from "date-fns";
import { addMinutes } from "date-fns";

export default {
  data() {
    return {
      session: null,
      notionRepetition: null,
      notionOnceEach: null,
      whichNotionSt: null,
      notionSt: false,
      newWhichNotionSt: null,
      latestNotionOnceEach: null,
      repetitionDialog: false,
      startDialog: false,
      onceEachDialog: false,
      otherStartDialog: false,
      battleStartDialog: false
    };
  },
  mounted() {
    this.session = localStorage.getItem("key");
  },
  methods: {
    setNotionRepetition() {
      db.collection("notionRepetition")
        .doc(localStorage.getItem("key"))
        .set({
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          ref: localStorage.getItem("key")
        });
      this.repetitionDialog = false;
      setTimeout(() => {
        this.startDialog = true;
      }, 500);
      setTimeout(() => {
        this.startDialog = false;
      }, 5000);
    },
    setNotionOnceEach(st) {
      var status = st;
      if (st == 0) {
        status = 1;
      }
      db.collection("notionOnceEach")
        .doc(localStorage.getItem("key"))
        .set({
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          ref: localStorage.getItem("key"),
          whichNotion: status
        });
      this.onceEachDialog = false;

      if (st == 0) {
        setTimeout(() => {
          this.startDialog = true;
        }, 500);
        setTimeout(() => {
          this.startDialog = false;
        }, 5000);
      } else if (st == 1) {
        setTimeout(() => {
          this.otherStartDialog = true;
        }, 500);
        setTimeout(() => {
          this.otherStartDialog = false;
        }, 5000);
      } else if (st == 2)
        setTimeout(() => {
          this.battleStartDialog = true;
        }, 500);
      setTimeout(() => {
        this.battleStartDialog = false;
      }, 5000);
    },
    resetSt() {
      db.collection("whichNotionSt")
        .doc(localStorage.getItem("key"))
        .set({
          st: 0
        });
    }
  },
  watch: {
    whichNotionSt() {
      this.newWhichNotionSt = this.whichNotionSt.st;
    },
    notionOnceEach() {
      this.latestNotionOnceEach = this.notionOnceEach.createdAt;
    }
  },
  computed: {
    isFirstSt() {
      if (this.newWhichNotionSt == 0) {
        return true;
      } else {
        return false;
      }
    },
    isStOne() {
      if (this.newWhichNotionSt == 1) {
        return true;
      } else {
        return false;
      }
    },
    isStTwo() {
      if (this.newWhichNotionSt == 2) {
        return true;
      } else {
        return false;
      }
    },
    isStEleven() {
      if (this.newWhichNotionSt == 11) {
        return true;
      } else {
        return false;
      }
    },
    isStTwelve() {
      if (this.newWhichNotionSt == 12) {
        return true;
      } else {
        return false;
      }
    },
    isStOneOrTwo() {
      if (this.newWhichNotionSt == 1 || this.newWhichNotionSt == 2) {
        return true;
      } else {
        return false;
      }
    },
    getMarginTop() {
      return (window.parent.screen.height - 240) / 2;
    },
    getCreatedTime() {
      return format(new Date(this.latestNotionOnceEach.toDate()), "HH:mm");
    },
    getFinishTime() {
      return format(
        addMinutes(this.latestNotionOnceEach.toDate(), 16),
        "HH:mm"
      );
    }
  },
  firestore() {
    return {
      notionRepetition: db.collection("notionRepetition"),
      notionOnceEach: db
        .collection("notionOnceEach")
        .doc(localStorage.getItem("key")),
      whichNotionSt: db
        .collection("whichNotionSt")
        .doc(localStorage.getItem("key"))
    };
  }
};
</script>
<style>
</style>