<template>
  <div class="wedding-invitation" :class="{ 'invitation-bounce': canOpen }">
    <div class="invitation-container" :class="{ 'invitation-down': isOpening }">
      <div class="invitation-cover">
        <div class="cover-content" :class="{ 'invitation-up': isOpening }">
          <div class="content-inside">
            <img class="content-inside-photo" src="../images/photo.jpg">
            <p><b>Trân trọng kính mời!</b></p>
            <p>.......{{ nameInvitation }}.......</p>
            <p>Tới dự lễ thành hôn của chúng tôi!</p>
            <p><b>Tiến Mạnh 🐱 & 🐯 Sao Mai</b></p>
            <p>Vào lúc 15:00 ngày 07/09/2024</p>
            <p><b>{{ location }}</b></p>
            <p>{{ address }}</p>
            <div class="content-inside-bless">
              <br>
              <p>Gửi lời chúc tốt đẹp của bạn:</p>
              <input placeholder="Nhập tên bạn" @focus="isFocused = true" @blur="isFocused = false, hasEntered = false"
                v-model="form.name" ref="nameInput">
              <input placeholder="Viết lời chúc phúc của bạn" @keyup.enter="sendBarrage"
                @blur="isFocused = false, hasEntered = false" v-model="form.message" ref="wishInput">
              <div>
                <button @click="sendBarrage">Gửi lời chúc</button>
                <button @click="closeInvitation">Cancel</button>
              </div>
            </div>
          </div>
        </div>
        <div class="cover-inside-left" :class="{ 'opening': isOpening }"></div>
        <div class="cover-inside-right" :class="{ 'opening': isOpening }"></div>
        <img class="cover-inside-seal" src="../images/seal.png" @click="openInvitation"
          :class="{ 'invitation-flight': isOpening }">
      </div>
    </div>
  </div>
</template>

<script>
/*global moment*/

export default {
  props: ['canOpen'],
  data() {
    return {
      form: {
        name: '',
        message: '',
      },
      nameInvitation: 'Bạn',
      location: '',
      address: '',
      isOpening: false,
      isFocused: false,
      hasEntered: false,
      year: moment('2018-05-18').toNow(true)
    }
  },
  methods: {
    openInvitation() {
      this.isOpening = true
      const urlParams = new URLSearchParams(window.location.search);
      const name = urlParams.get('name');
      const location = urlParams.get('l');

      if (location) {
        if (location == 't') {
          this.location = "Tại tư gia nhà trai";
          this.address = "Chản Làng - Yên Sơn - Lục Nam - Bắc Giang";
        } else if (location == 'g') {
          this.location = "Tại tư gia nhà gái";
          this.address = "Nội Chùa - Yên Sơn - Lục Nam - Bắc Giang";
        }
      }
      if (name) {
        this.nameInvitation = name;
        this.form.name = name;
      }
    },
    closeInvitation() {
      this.isOpening = false
      setTimeout(() => {
        this.$emit('onClose')
      }, 660)
    },
    sendBarrage() {
      this.$nextTick(() => {
        this.hasEntered = true
        if (!this.form.message || !this.form.name) {
          return
        }
        this.isOpening = false
        this.$refs.nameInput.blur()
        this.$refs.wishInput.blur()
        setTimeout(() => {
          this.$emit('sendBarrage', this.form)
        }, 660)
      })
    }
  }
}
</script>

<style lang="less">
.wedding-invitation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 30px 20px;
  padding-top: 60px;
  z-index: 4;
  transform: scale(0.05);
  -webkit-transform: scale(0.05);
  opacity: 0;
  transition: transform 0.8s cubic-bezier(.26, 1.84, .39, .61), opacity 0.5s linear;
  -webkit-transition: -webkit-transform 0.8s cubic-bezier(.26, 1.84, .39, .61), opacity 0.5s linear;
  background-size: 100%;
  overflow: hidden;

  &.invitation-bounce {
    opacity: 1;
    transform: scale(1);
    -webkit-transform: scale(1);
  }

  .invitation-container {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s cubic-bezier(0.4, 0, 1, 1);
    -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.4, 0, 1, 1);

    &.invitation-down {
      transform: translateY(20px);
      -webkit-transform: translateY(20px);
    }

    .invitation-cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #D65047;
      border-radius: 10px;
      perspective: 500px;
      box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.15);

      .cover-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 10px 20px;
        transition: transform 0.6s cubic-bezier(0.4, 0, 1, 1);
        -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.4, 0, 1, 1);

        &.invitation-up {
          transform: translateY(-60px);
          -webkit-transform: translateY(-60px);
        }

        .content-inside {
          height: 100%;
          padding: 20px;
          color: #a9895d;
          background-color: #FFF1DE;
          text-align: center;
          overflow: auto;

          .content-inside-photo {
            width: 100%;
            margin-bottom: 10px;
            padding: 5px;
            border: 1px solid #f7debb;
          }

          p {
            margin-top: 0;
            margin-bottom: 5px;
          }

          .content-inside-bless {
            input {
              width: 100%;
              height: 35px;
              margin-bottom: 10px;
              outline: none;
              border: none;
              border-bottom: 1px solid #f7debb;
              color: #a9895d;
              background: transparent;

              &::-webkit-input-placeholder {
                color: #E8D1B1;
                font-size: 12px;
              }

              &::-moz-placeholder {
                color: #E8D1B1;
                font-size: 12px;
              }

              &:-ms-input-placeholder {
                color: #E8D1B1;
                font-size: 12px;
              }

              &:-moz-placeholder {
                color: #E8D1B1;
                font-size: 12px;
              }
            }

            >div {
              display: flex;

              button {
                width: 100%;
                height: 35px;
                color: #a9895d;
                background: #f7debb;
                border: none;
                outline: none;

                &:disabled {
                  opacity: 0.8;
                }

                &:first-child {
                  margin-right: 10px;
                  flex: 1;
                }

                &:last-child {
                  width: 60px;
                  border: 1px solid #f7debb;
                  background: transparent;
                }
              }
            }
          }
        }
      }

      .cover-inside-left {
        position: absolute;
        left: 0;
        top: 0;
        width: 70%;
        height: 100%;
        border-radius: 10px;
        background-color: #D65047;
        box-shadow: 5px 0 10px rgba(0, 0, 0, 0.2);
        z-index: 6;
        transition: transform 0.5s;
        -webkit-transition: -webkit-transform 0.5s;
        transform-origin: 0 50%;
        -webkit-transform-origin: 0 50%;

        &.opening {
          transform: rotate3d(0, 1, 0, -140deg);
          -webkit-transform: rotate3d(0, 1, 0, -140deg);
        }
      }

      .cover-inside-right {
        position: absolute;
        right: 0;
        top: 0;
        width: 40%;
        height: 100%;
        border-radius: 10px;
        background-color: #D65047;
        box-shadow: -5px 0 10px rgba(0, 0, 0, 0.2);
        z-index: 5;
        transition: transform 0.5s;
        -webkit-transition: -webkit-transform 0.5s;
        transform-origin: 100% 50%;
        -webkit-transform-origin: 100% 50%;

        &.opening {
          transform: rotate3d(0, 1, 0, 140deg);
          -webkit-transform: rotate3d(0, 1, 0, 140deg);
        }
      }

      .cover-inside-seal {
        position: absolute;
        left: 70%;
        bottom: 125px;
        width: 80px;
        height: 80px;
        margin-left: -40px;
        z-index: 7;
        transform-origin: 50% 50%;
        -webkit-transform-origin: 50% 50%;
        transition: all 0.8s cubic-bezier(0.4, 0, 1, 1);
        -webkit-transition: all 0.8s cubic-bezier(0.4, 0, 1, 1);

        &.invitation-flight {
          opacity: 0;
        }
      }
    }
  }
}
</style>
