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
                          <div class="rating" ref="aa" @mousemove="ratingHover" @mouseleave="ratingLeave">
                            <div class="rate" :style="{ width: calculateFill() + '%' }" @click="ratingClick"></div>
                            <!-- <div class="rate" :style="{ width: calculateFill($event.currentTarget) + '%' }" @click="ratingClick"></div> -->
                          </div>
                        </span>
                      </div>
                    </div>
                    <div class="votes-count">
                      (<b>{{ offer.votes_count }}</b> {{ translations.votes2 }})
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
                  <div class="offer-param-name"> {{ translations["Amount / period"] }} </div>
                  <div class="offer-param-value amount"> *1000{{ arr.currency }} / 12{{arr.suffix }}</div>
                </div>
              </div>
              <div class="offer-param-container">
                <div class="offer-param">
                  <div class="offer-param-name"> {{ translations["COST / TOTAL"] }} </div>
                  <div class="offer-param-value installment">
                    <a href="#" style="color:#fff">Zobacz</a>
                  </div>
                  <div class="total"></div>
                </div>
              </div>
              <div class="offer-param-container">
                <div class="offer-param">
                  <div class="offer-param-name"> {{ translations.APR }} </div>
                  <div class="offer-param-value apr">
                    <a href="#" style="color:#fff">Sprawdź</a>
                  </div>
                </div>
                <div class="aclr"></div>
              </div>
              <div class="aclr"></div>
              
            </div>

            <div class="offer-cta">
              <a :href="offer.link" class="cta-link" target="_blank">
                <span class="cta-icon"></span>
                <span class="cta-text"> {{ translations["Take a loan"] }} </span>
              </a>
              <div class="aclr"></div>
            </div>
            <div class="aclr"></div>
          </div>
          
          <div class="offer-description">
            {{ offer.description }}
            <br>
            * {{ translations["Minimal APR"] }} {{ rrso[offer.category].apr_min }}%, 
              {{ translations["maximal APR"] }} {{ rrso[offer.category].apr_max }}%
          </div>

          <div class="aclr"></div>

      </div>

    </div>
    
    
</template>

<script>

import { computed } from 'vue';
import { useStore } from 'vuex';
import mixinRating from "../assets/mixins/rating.js"

export default {
  
    name: "offers",
    props: {
        sourceOffers: Array
    },

    setup() {

        const store = useStore();
        const translations = computed(()=>store.state.translations);
        const rrso = computed(()=>store.state.rrso);
        const arr = computed(()=>store.state.arr);
        // console.log(rrso.value[1])
        // function minRRSO(){

        //   // Minimal APR
        // }

        return {
          translations,
          rrso,
          arr,
          ...mixinRating(),
        };

    },
  
};


</script>