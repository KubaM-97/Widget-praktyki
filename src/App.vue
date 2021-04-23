<template>
  <div style="max-width: 1200px; margin: auto; width: 100%;">
    <div id="layout-2" class="a44-widget layout" ref="container">
      <suspense>
        <template #default>
          <div>
            <slider-component/>
            <offers-component/>
          </div>
        </template>
      </suspense>

    </div>
  </div>
</template>

<script>

import Slider from '@/components/Slider.vue';
import Offers from '@/components/Offers.vue';

import { onMounted, ref } from 'vue';

export default{
  components: {
    "offers-component": Offers,
    "slider-component": Slider,
  },
  setup(){

    const container = ref(null);
    
    window.addEventListener("resize", viewport_size);

    function viewport_size(){

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
    
    onMounted(()=>{
      viewport_size();
    })
    
    
    return{
      container
    }

  }

}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap');

.a44-widget {
    max-width: 1200px;
    width: 100%;
    margin: auto;
    font-family: "Open Sans";
    font-size: 10px;
    margin: auto;
}

.a44-widget * {
    box-sizing: border-box;
}

.a44-widget.a44-xs {
    max-width: 543px;
}

.a44-widget.a44-sm {
    max-width: 767px;
}

.a44-widget.a44-md {
    max-width: 991px;
}

.a44-widget.a44-lg {
    max-width: 1600px;
}

.a44-widget .aclr {
    clear: both;
}

.a44-widget .d-none {
    display: none;
}
</style>