<!-- 组件说明 -->
<template>
  <swiper :options='swiperOption' ref="mySwiper">
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

  export default {
    name: 'MeScroll',
    components: {
      swiperSlide,
      swiper
    },
    props: {
      scrollbar: {
        type: Boolean,
        default: true
      },
      data: {
        type: [Array, Object]
      }
    },
    data() {
      return {
        swiperOption: {
          direction: 'vertical',
          sliderPerView: 'auto',
          freeMode: true,
          setWrapperSize: true,
          scrollbar: {
            el: this.scrollbar ? '.swiper-scrollbar' : null,
            hide: true
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
      console.log(this.$refs.mySwiper.swiper.height);

    },
    methods: {
      update() {
        console.log(this.data);
        console.log(this.$refs.mySwiper.swiper.$wrapperEl.css('height'));
        setTimeout(() => {
          this.$refs.mySwiper && this.$refs.mySwiper.swiper.update();
          console.log(this.$refs.mySwiper.swiper.$wrapperEl.css('height'));
        }, 8000);
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

</style>
