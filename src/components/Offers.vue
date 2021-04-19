<template>

    <specificOffers-component :sourceOffers="filteredOffers"/>

    <p class="costs-info">
      *Powyższe wartości są mają charakter orientacyjny i nie stanowią oferty w rozumieniu art. 66 Kodeksu Cywilnego. 
      Aby potwierdzić koszt pożyczki kliknij na "Weź pożyczkę". 
      Minimalna kwota pożyczki zaczyna się od 100 zł, a maksymalna do 60000 zł. 
      Minimalne RRSO: 0%, maksymalne RRSO: 323667%
    </p>
    
    <teleport to="body">
        <div class="a44-alert" v-if="showAlert">{{messages['No offers matching criteria']}}</div>
        <div ref="promo_message" class="a44-promo" v-if="showPromo">{{messages['We also recommend loans with other parameters']}}</div>
    </teleport>

    <specificOffers-component v-if="showRemainingOffers" :sourceOffers="remainingOffers"/>
    
    
</template>

<script>

import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import SpecificOffers from "./SpecificOffers";

export default {
  
  name: "offers",
  components: {
    "specificOffers-component": SpecificOffers
  },

  async setup() {

      const showAlert = ref(false);
      const showPromo = ref(false);
      const showRemainingOffers = ref(false);
      const promo_message = ref(null);
      const remainingOffers = ref([])

      const store = useStore();
      const messages = computed(()=>store.state.messages);
      const filteredOffers = computed(() => store.getters.filteredOffers());

      // console.log()

      
      watch(filteredOffers, ()=>{
        manageAlertWindow()
        managePromoWindow()
      })

      await store.dispatch("fetchOffers");

      function manageAlertWindow(){
          filteredOffers.value.length > 0 ? showAlert.value = false: showAlert.value  = true;
      }

      function managePromoWindow(){

        remainingOffers.value = [];

        if (filteredOffers.value.length <= 3) {
            
            if (filteredOffers.value.length) {
              
                showPromo.value = true;
               
                for(const offer of store.state.offers){
                  if(!store.getters.filteredOffers().includes(offer)){
                    remainingOffers.value.push(offer)
                  }
                }
                showRemainingOffers.value = true;
            }
        } else {
            showPromo.value = false
        }

      }

      return {
        showAlert,
        showPromo,
        filteredOffers,
        messages,
        promo_message,
        showRemainingOffers,
        remainingOffers
      };
  },
  
};


</script>
