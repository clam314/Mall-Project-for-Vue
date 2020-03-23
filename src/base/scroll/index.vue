<!-- 组件说明 -->
<template>
  <swiper :options='swiperOption' ref="mySwiper">
    <div class="mine-scroll-pull-down" v-if="pullDown">
      <me-loading :text="pullDownText" inline ref="pullDownLoading"></me-loading>
    </div>
    <swiper-slide>
      <slot></slot>
    </swiper-slide>
    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
  import {
    swiper,
    swiperSlide
  } from 'vue-awesome-swiper';
  import MeLoading from 'base/loading';
  import {
    PULL_DOWN_HEIGHT,
    PULL_DOWN_TEXT_INIT,
    PULL_DOWN_TEXT_START,
    PULL_DOWN_TEXT_ING,
    PULL_DOWN_TEXT_END,
    PULL_UP_HEIGHT,
    PULL_UP_TEXT_INIT,
    PULL_UP_TEXT_START,
    PULL_UP_TEXT_ING,
    PULL_UP_TEXT_END
  } from './config';

  export default {
    name: 'MeScroll',
    components: {
      swiperSlide,
      swiper,
      MeLoading
    },
    props: {
      scrollbar: {
        type: Boolean,
        default: true
      },
      data: {
        type: [Array, Object]
      },
      pullDown: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        pulling: false,
        pullDownText: PULL_DOWN_TEXT_INIT,
        swiperOption: {
          direction: 'vertical',
          slidesPerView: 'auto',
          freeMode: true,
          setWrapperSize: true,
          scrollbar: {
            el: this.scrollbar ? '.swiper-scrollbar' : null,
            hide: true
          },
          on: {
            sliderMove: this.scroll,
            touchEnd: this.touchEnd
          }
        }
      };
    },
    watch: {
      data() {
        this.update();
      }
    },
    mounted() {

    },
    methods: {
      update() {
        this.$refs.mySwiper && this.$refs.mySwiper.swiper.update();
      },

      scroll() {
        if (this.pulling) {
          return;
        }
        const swiper = this.$refs.mySwiper.swiper;
        if (swiper.translate > 0 && this.pullDown) {
          if (swiper.translate > PULL_DOWN_HEIGHT) {
            this.$refs.pullDownLoading.setLoadingText(PULL_DOWN_TEXT_START);
          } else {
            this.$refs.pullDownLoading.setLoadingText(PULL_DOWN_TEXT_INIT);
          }
        }
      },

      touchEnd() {
        if (this.pulling) {
          return;
        }
        const swiper = this.$refs.mySwiper.swiper;
        if (swiper.translate > 0 && this.pullDown) {
          this.pulling = true;
          swiper.allowTouchMove = false;
          swiper.setTransition(swiper.params.speed);
          swiper.setTranslate(PULL_DOWN_HEIGHT);
          swiper.params.virtualTranslate = true;
          this.$refs.pullDownLoading.setLoadingText(PULL_DOWN_TEXT_ING);
          this.$emit('pull-down', this.pullDownEnd);
        }
      },

      pullDownEnd() {
        this.pulling = false;
        const swiper = this.$refs.mySwiper.swiper;
        this.$refs.pullDownLoading.setLoadingText(PULL_DOWN_TEXT_END);
        swiper.params.virtualTranslate = false;
        swiper.allowTouchMove = true;
        swiper.setTransition(swiper.params.speed);
        swiper.setTranslate(0);
      }
    }
  }

</script>

<style lang='scss' scoped>
  .swiper-container {
    overflow: hidaden;
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    height: auto;
  }

  .mine-scroll-pull-down {
    position: absolute;
    left: 0;
    bottom: 100%;
    width: 100%;
    height: 80px;
  }

</style>
