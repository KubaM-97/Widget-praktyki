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
                          <div class="rating">
                            <div class="rate" :style="{width: getRateInitWidth( offer.rate , offer.votes_count ) + '%'}"></div>
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
            *{{ translations["Minimal APR"] }} {{ rrso[offer.category].apr_min }}%, 
             {{ translations["maximal APR"] }} {{ rrso[offer.category].apr_max }}%
          </div>

          <div class="aclr"></div>

      </div>

    </div>
    
    
</template>

<script>

import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import mixinRating from "../assets/mixins/rating.js"
import $ from 'jquery'
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

        const { calculateFill, round } = mixinRating();

        function getRateInitWidth(rate, votes){
          const totalOfferRate =  rate * votes
          const totalPossibleRate =  5 * votes
          const percentFilled = totalOfferRate / totalPossibleRate * 100
          return percentFilled
        }
        
        onMounted(()=>{
          $('.rating').on('mousemove', function(e) {
              var fill = calculateFill(e, $(this));
              $(this).find('.rate').css('width', round(fill, 20, 0) + '%');
          });
          $('.rating').on('mouseleave', function() {
              $(this).find('.rate').css('width', $(this).parents('.a44-offer').find('.offer-rate').html() / 5 * 100 + '%');
          });
          
          
          $('.rate').on('click', function(e) {
            

            const elem = $(this);
            const fill = calculateFill(e, $(this).parents('.rating'));
            const rate = Math.ceil(fill / 100 * 5);
            setTimeout(function() {
                  $.ajax({
                      url: 'https://widgets.aff44.com/vote?save_rate=' + elem.parents('.a44-offer').attr('data-id') + '&rate=' + rate,
                      dataType: 'jsonp',
                  }).done(function(data) { 
                    // console.log(data)
                      if (data.status === 'success') {
                          const new_rate = Number(data.new_rate);

                          const offer_rate_container = elem.parents('.a44-offer').find('.offer-rate');
                          offer_rate_container.html(new_rate.toFixed(1));

                          const rate = elem.parents('.a44-offer').find('.rate')
                          rate.css('width', (new_rate.toFixed(1) / 5 * 100) + '%')

                          const votes_count_container = elem.parents('.a44-offer').find('.votes-count');
                          votes_count_container.html(getVotes_count_container(data))
                         
                    
                      }
                  });
            }, Math.random() * 300);

        })

        function getVotes_count_container(data){

          const vote_count = data.votes_count.toString();
          const last_char = vote_count.slice(-1);
          
          if( vote_count !== 1 && vote_count < 11 || vote_count > 14 ){

              switch(last_char){  

                  case '2':
                  case '3':
                  case '4':
                    return `(<b> ${data.votes_count} </b> ${getVoteSuffix('votes')} )`

                  default:
                    return `(<b> ${data.votes_count} </b> ${getVoteSuffix('votes2')} )`

              }

          }
          else{

              switch(last_char){  

                  case '1':
                    return `(<b> ${data.votes_count} </b> ${getVoteSuffix('votes')} )`

                  case '12':
                  case '13':
                  case '14':
                    return `(<b> ${data.votes_count} </b> ${getVoteSuffix('votes2')})`

                  default:
                    return `(<b> ${data.votes_count} </b> ${getVoteSuffix('votes2')} )`

              }

          }

        }

        function getVoteSuffix(vote_suffix){
          return typeof translations.value[vote_suffix] !== 'undefined' ? translations.value[vote_suffix] : 'votes';
        }

        })
        return {
          getRateInitWidth,
          translations,
          rrso,
          arr
        };

    },
  
};

</script>