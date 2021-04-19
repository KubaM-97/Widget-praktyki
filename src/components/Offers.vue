<template>

    <div class="a44-offers" v-for="offer in filteredOffers" :key="offer.id">
   
      <div class='a44-offer pl promo' :data-id="offer.id" :data-costs="offer.loando_slug"
        :data-minamount="offer.min_amount" :data-maxamount="offer.max_amount"
        :data-minperiod="offer.min_period" :data-maxperiod="offer.max_period" 
        :data-freeamount="offer.first_free_amount"
      >
        
          <div class="offer-details">

            <div class="offer-name-details">
              <div class="offer-logo">
                <img :src="offer.thumbnail" />
              </div>
              <div class="offer-rates">
                <div class="offer-rate">{{ offer.rate }}</div>
                <div class="offer-name-container">
                  <div class="offer-name">
                    {{ offer.display_name }}
                  </div>
                  <div class="offer-url">
                    {{ offer.domain }}
                  </div>
                </div>
                <div class="offer-rates-widget">
                  <div class="stars-container">
                    <div class="stars">
                      <div class="rank-rate">
                        <span>
                          <div class="rating" @mousemove="ratingHover" @mouseleave="ratingLeave">
                            <div class="rate" @click="ratingClick"></div>
                          </div>
                        </span>
                      </div>
                    </div>
                    <div class="votes-count">
                      (<b>{{ offer.votes_count }}</b> głosów)
                    </div>
                  </div>
                  <div class="likes-container">
                    <div class="likes">{LOANS-SOLD}</div>
                  </div>
                </div>
              </div>
              <div class="aclr"></div>
            </div>

            <div class="offer-params">
              <div class="offer-param-container">
                <div class="offer-param">
                  <div class="offer-param-name">Kwota / okres</div>
                  <div class="offer-param-value amount"> *1000 zł /12dni</div>
                </div>
              </div>
              <div class="offer-param-container">
                <div class="offer-param">
                  <div class="offer-param-name">KOSZT / ŁĄCZNIE</div>
                  <div class="offer-param-value installment">
                    <a href="#" style="color:#fff">Zobacz</a>
                  </div>
                  <div class="total"></div>
                </div>
              </div>
              <div class="offer-param-container">
                <div class="offer-param">
                  <div class="offer-param-name">RRSO</div>
                  <div class="offer-param-value apr">
                    <a href="#" style="color:#fff">Sprawdź</a>
                  </div>
                </div>
                <div class="aclr"></div>
              </div>
              <div class="aclr"></div>
              
            </div>

            <div class="offer-cta">
              <a href="#" class="cta-link" target="_blank">
                <span class="cta-icon"></span>
                <span class="cta-text">Weź pożyczkę</span>
              </a>
              <div class="aclr"></div>
            </div>
            <div class="aclr"></div>
          </div>
          
          <div class="offer-description">
            {{ offer.description }}
            <br>
            *Minimalne RRSO: 0%, maksymalne RRSO: 000000%
          </div>

          <div class="aclr"></div>

      </div>

    </div>

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
    
    
</template>

<script>

import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import mixinRating from "../assets/mixins/rating.js"

// import $ from "jquery";
export default {
  
  name: "offers",

  setup() {
    
  const showAlert = ref(false);
  const showPromo = ref(false);
  const promo_message = ref(null);

  const store = useStore();
  const messages = computed(()=>store.state.messages);
  const filteredOffers = computed(() => store.getters.filteredOffers());

  watch(filteredOffers, ()=>{
    manageAlertWindow()
    managePromoWindow()
  })

  function manageAlertWindow(){
      filteredOffers.value.length > 0 ? showAlert.value = false: showAlert.value  = true;
  }

  function managePromoWindow(){

            

    if (filteredOffers.value.length <= 3) {
        
        if (filteredOffers.value.length) {
            showPromo.value = true;
            const remainingOffers = []
            for(const key of store.state.offers){
              if(!store.getters.filteredOffers().includes(key)){
                remainingOffers.push(key)
              }
            }
            remainingOffers.forEach(offer => {
              promo_message.value.innnerHTML += offer
            })
            // console.log(promo_message.value)
            // promo_message.value.after(remainingOffers)
            // console.log(remainingOffers, promo_message.value)
        }
    } else {
        showPromo.value = false
    }
  }

  onMounted(()=>{
    // console.log(mixinRating().ratingHover)
    setTimeout(()=>{
        // $('.rating').on('mousemove', mixinRating.ratingHover);
        // $('.rating').on('mouseleave', mixinRating.ratingLeave);
        // $(".rate").on('click', mixinRating.ratingClick)
        // console.log(111)
        // $('.rating').trigger('mousemove');
        // console.log(222)
    },2200)
    
     
  })

      return {
        showAlert,
        showPromo,
        filteredOffers,
        messages,
        promo_message,
         ...mixinRating(),
      };
  },
  
};


</script>

<style scoped>
</style>