<template>
    
    <div class="a44-offers" v-for="offer in sourceOffers" :key="offer.id">
   
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
    
    
</template>

<script>

import { computed, onMounted} from 'vue';
import { useStore } from 'vuex';
import mixinRating from "../assets/mixins/rating.js"

// import $ from "jquery";
export default {
  
  name: "offers",
props: {
    sourceOffers: Array
  },
  setup(props) {
    console.log(props)

  const store = useStore();
  const messages = computed(()=>store.state.messages);


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
        messages,
         ...mixinRating(),
      };
  },
  
};


</script>