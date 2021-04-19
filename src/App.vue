<template>
    <suspense>
      <template #default>
        <div style="max-width: 1200px; margin: auto; width: 100%;">
          
            <div id="layout-2" class="a44-widget layout" ref="container">
                <slider-component/>
                <offers-component/>
            </div>

        </div>
  
     </template>
     
  </suspense>
</template>

<script>
require("./style.css")
import Slider from '@/components/Slider.vue';
import Offers from '@/components/Offers.vue';

import {  } from 'vue';

// import { useStore } from 'vuex';
export default{
  components: {
    "offers-component": Offers,
    "slider-component": Slider,
  },
  setup(){

    // const container = ref(null);
    
    
    console.log(1)
    // await store.dispatch("fetchOffers");
    console.log(2)
    
    return{
      // container
    }

  }

 
}
</script>

<style>
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
