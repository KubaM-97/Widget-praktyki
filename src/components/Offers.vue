<template>

    <specific-offers-component :sourceOffers="filteredOffers"/>

    
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

  setup() {

    
      const store = useStore();
      const translations = computed(()=>store.state.translations);
      const filteredOffers = computed(() => store.getters.filteredOffers());
        
      const showAlert = ref(false);
      const showPromo = ref(false);
      const showRemainingOffers = ref(false);
      const remainingOffers = ref([])
      
      watch(filteredOffers, ()=>{
        manageAlertWindow()
        managePromoWindow()
      })

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
        filteredOffers,
        translations,
        showAlert,
        showPromo,
        showRemainingOffers,
        remainingOffers
      };
      
  },
  
};


</script>
<style scoped>
.a44-alert {
    border: 3px solid red;
    padding: 8px;
    border-radius: 5px;
    margin: auto;
    text-align: center;
    margin-bottom: 16px;
}

.a44-promo {
    border: 3px solid green;
    padding: 8px;
    border-radius: 5px;
    margin: auto;
    text-align: center;
    margin-bottom: 16px;
}
</style>
