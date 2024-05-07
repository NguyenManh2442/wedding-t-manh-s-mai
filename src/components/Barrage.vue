<template>
  <div class="wedding-barrage" ref="barrage" :style="{ opacity: canStart ? 1 : 0 }">
    <div v-html="codeInStyleTag"></div>
    <p class="code barrage-0" ref="barrageFirst"
      :style="{ transform: 'translate(' + initialOffset + 'px)', top: '10px' }">
      <span class="mine">{{ form.name }}: {{ form.message }}</span>
      <span v-for="(item, index) in filterBarrage(guests, 0)" :key="index">{{ item.name }}: {{ item.message }}</span>
    </p>
    <p class="code barrage-1" ref="barrageSecond"
      :style="{ transform: 'translate(' + initialOffset + 'px)', top: '40px' }">
      <span v-for="(item, index) in filterBarrage(guests, 1)" :key="index">{{ item.name }}: {{ item.message }}</span>
    </p>
    <p class="code barrage-2" ref="barrageThird"
      :style="{ transform: 'translate(' + initialOffset + 'px)', top: '70px' }">
      <span v-for="(item, index) in filterBarrage(guests, 2)" :key="index">{{ item.name }}: {{ item.message }}</span>
    </p>
    <p class="code barrage-3" ref="barrageFourth"
      :style="{ transform: 'translate(' + initialOffset + 'px)', top: '100px' }">
      <span v-for="(item, index) in filterBarrage(guests, 3)" :key="index">{{ item.name }}: {{ item.message }}</span>
    </p>
    <div class="barrage-space"></div>
  </div>
</template>

<script>
/*global tcb*/
import { getDocs, collection, query, addDoc } from "firebase/firestore";
import db from "../mock/main.js";

export default {
  props: ['form', 'canStart'],
  data() {
    return {
      guests: [],
      animationStyle: '',
      initialOffset: 0,
      app: null,
    }
  },
  async created() {
    const snapshot = await getDocs(query(collection(db, 'wedding-posts')));
    const result = snapshot.docs.map(doc => doc.data());
    this.guests = result;
  },
  computed: {
    codeInStyleTag: function () {
      return `<style>${this.animationStyle}</style>`
    }
  },
  watch: {
    canStart(val) {
      if (val === true) {
        this.barrageAnimationStart()
      }
    },
    form() {
      this.setBarrage()
    }
  },
  mounted() {
    this.checkTcbLoaded()
  },
  methods: {
    barrageAnimationStart() {
      let barrageWidth = this.getWidth(this.$refs.barrage)
      let barrageWidthGroup = [
        this.getWidth(this.$refs.barrageFirst),
        this.getWidth(this.$refs.barrageSecond),
        this.getWidth(this.$refs.barrageThird),
        this.getWidth(this.$refs.barrageFourth)
      ]
      this.initialOffset = barrageWidth + 15
      barrageWidthGroup.map((item, index) => {
        this.animationStyle += `
            .barrage-${index}{
              animation: barrage-${index} ${item / 40}s linear infinite;
              -webkit-animation: barrage-${index} ${item / 40}s linear infinite;
            }
            @keyframes barrage-${index} {
              from {
                transform:translate3d(${barrageWidth + 15}px,0,0);
                -webkit-transform:translate3d(${barrageWidth + 15}px,0,0);
              }
              to {
                transform:translate3d(-${item + 15}px,0,0);
                -webkit-transform:translate3d(-${item + 15}px,0,0);
              }
            }`
      })
    },
    getWidth(ref) {
      return window.getComputedStyle(ref, null).width.replace('px', '') - 0
    },
    filterBarrage(guests, remainder) {
      if (guests) {
        return guests.filter((guest, index) => {
          if (index % 4 === remainder) {
            return guest
          }
        })
      }
    },
    checkTcbLoaded() {
      this.fetchBarrage()
    },
    fetchBarrage() {
    },
    setBarrage() {
      const colRef = collection(db, 'wedding-posts')
      // data to send
      const dataObj = {
        name: this.form.name,
        message: this.form.message
      }

      // create document and return reference to it
      addDoc(colRef, dataObj)
    },
  }
}
</script>

<style lang="less">
.wedding-barrage {
  position: relative;

  p {
    position: absolute;
    padding: 5px 0;
    white-space: nowrap;
    transition: all 0.6s linear;
    -webkit-transition: all 0.6s linear;

    span {
      padding: 0 15px;

      &.mine {
        color: #e6db74;
        padding: 4px 6px;
        border: 1px solid #e6db74;
      }
    }
  }

  .barrage-space {
    height: 180px;
  }
}
</style>