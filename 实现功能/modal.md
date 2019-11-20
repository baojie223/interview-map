```my-modal.js
  import MyModal from './MyModal.vue'

export default {
  install(vue, options) {
    const Modal = vue.extend(MyModal)
    let modalVm
    let oldOptions
    vue.prototype.$modal = options => {
      if (JSON.stringify(options) !== oldOptions) {
        modalVm = new Modal({ propsData: options })
        modalVm.$mount()
      }
      oldOptions = JSON.stringify(options)
      return modalVm
    }
  }
}
```

```MyModal.vue
<template>
  <div>
    <div class="mask"></div>

    <div class="wrap" @click="close">
      <transition name="fade">
        <div v-if="visible" class="modal" :style="{ width: width }" @click.stop="() => void 0">
          <div class="content">
            <div class="header"></div>
            <div class="body">{{ content }}</div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    content: {
      type: String,
      default: 'content'
    },
    width: {
      type: String,
      default: '256px'
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    open() {
      document.querySelector('body').appendChild(this.$el)
      this.$nextTick(() => {
        this.visible = true
      })
    },
    close() {
      this.visible = false
      setTimeout(() => {
        document.querySelector('body').removeChild(this.$el)
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all .5s;
  top: 200px;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  top: 80%;
  height: 0;
}
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
}
.wrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
  padding: 200px;
}
.modal {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: 'tnum';
  position: absolute;
  left: 50%;
  // top: 100px;
  transform: translateX(-50%);
  width: auto;
  margin: 0 auto;
  padding-bottom: 24px;
  transition: all 0.3s;
  .content {
    position: relative;
    background-color: #fff;
    background-clip: padding-box;
    border: 0;
    border-radius: 4px;
    .body {
      padding: 24px;
      font-size: 14px;
      line-height: 1.5;
      word-wrap: break-word;
    }
  }
}
</style>

```

```main.js
  Vue.use(MyModal)
```
