<template>

  <div style="max-width: 1200px; margin: auto; width: 100%;">
      
      <div id="layout-2" class="a44-widget layout" ref="container">
          <slider-component/>
          <offers-component/>
      </div>

  </div>
 
</template>

<script>

import Slider from '@/components/Slider.vue';
import Offers from '@/components/Offers.vue';

import { onMounted, ref } from 'vue';

import { useStore } from 'vuex';
export default{
  components: {
    "offers-component": Offers,
    "slider-component": Slider,
  },
  setup(){

    const container = ref(null);
    
    window.addEventListener("resize", screen_size);

    function screen_size(){

        const containerWidth = container.value.parentNode.clientWidth;
        let containerSize = '';

        switch(true){
          case (containerWidth < 544):
            containerSize = 'a44-xs'
            break;
          case (containerWidth >= 544 && containerWidth < 768):
            containerSize = 'a44-sm'
            break;
          case (containerWidth  >= 768 && containerWidth < 992):
            containerSize = 'a44-md'
            break;
          case (containerWidth >= 992 && containerWidth < 1200):
            containerSize = 'a44-lg'
            break;
          default:
            containerSize = 'a44-xl'
            break;
        }
       
        container.value.className = "";
        container.value.classList.add('a44-widget','layout',containerSize);

    }


    const store = useStore();
    store.dispatch("fetchOffers");
    
    onMounted(()=>{
      screen_size();
    })

    return{
      container
    }

  }

 
}
</script>

<style>
</style>
