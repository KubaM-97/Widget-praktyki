<template>

    <specific-offers-component :sourceOffers="filteredOffers" @xxx="aaa"/>

    
    <div class="a44-alert" v-if="showAlert">{{translations['No offers matching criteria']}}</div>
    <div class="a44-promo" v-if="showPromo">{{translations['We also recommend loans with other parameters']}}</div>


    <specific-offers-component v-if="showRemainingOffers" :sourceOffers="remainingOffers"/>
    
    <p class="costs-info">
      {{ translations["offers-params-info"] }}
    </p>
    
</template>

<script>

import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import SpecificOffers from "./SpecificOffers";

export default {
  
  name: "offers",
  components: {
    "specific-offers-component": SpecificOffers
  },

  async setup() {

      const showAlert = ref(false);
      const showPromo = ref(false);
      const showRemainingOffers = ref(false);
      const remainingOffers = ref([])

      const store = useStore();
      const translations = computed(()=>store.state.translations);
      const filteredOffers = computed(() => store.getters.filteredOffers());
      
      watch(filteredOffers, ()=>{
        manageAlertWindow()
        managePromoWindow()
      })

      function aaa(e){
        console.log(e.target)
      }
      await store.dispatch("fetchOffers");

      function manageAlertWindow(){
          filteredOffers.value.length > 0 ? showAlert.value = false: showAlert.value  = true;
      }

      function managePromoWindow(){
        
        showRemainingOffers.value = false;
        remainingOffers.value = [];

        if (filteredOffers.value.length <= 3) {
              
          showPromo.value = true;
          
          for(const offer of store.state.offers){
            if(!store.getters.filteredOffers().includes(offer)){
              remainingOffers.value.push(offer)
            }
          }
          showRemainingOffers.value = true;

        } else {
            showPromo.value = false
        }

      }

      return {
        aaa,
        showAlert,
        showPromo,
        filteredOffers,
        translations,
        showRemainingOffers,
        remainingOffers
      };
  },
  
};


</script>
