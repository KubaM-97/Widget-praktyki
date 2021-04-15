<template>

    <div class="a44-offers" v-for="offer in offers" :key="offer.id">
   
      <div class='a44-offer pl promo' :data-id="offer.id" data-costs 
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
                            <div class="rate" style=""></div>
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

import { computed, onMounted, onUpdated } from 'vue';
import { useStore } from 'vuex';

import $ from "jquery";
export default {
  
  name: "offers",

  setup() {
    
        const store = useStore();
        const input_hidden = computed(()=>store.state.input_hidden);
  onMounted(()=>{
    let tr = $('.translations').val(JSON.stringify(input_hidden.value));  
    rating(tr)
  })

  onUpdated(()=>{
    let tr = $('.translations').val(JSON.stringify(input_hidden.value));  
    rating(tr)
  })

      const offers = computed(() => store.state.offers);
      /* eslint-disable */
       function rating(){
      // STARS DISPLAY - START
                                $('.rating').on('mousemove', function(e) {
                                  // console.log(e)
                                  // console.log($(this))
                                    const fill = calculateFill(e, $(this));
                                    $(this).find('.rate').css('width', round(fill, 20, 0) + '%');
                                });
                                $('.rating').on('mouseleave', function() {
                                    $(this).find('.rate').css('width', $(this).parents('.a44-offer').find('.offer-rate').html() / 5 * 100 + '%');
                                });
                                // STARS DISPLAY - END
    

                                const rates = document.querySelectorAll(".rate");

                                rates.forEach(rate=>{
                                  rate.addEventListener("click", function(e){

                                    var elem = $(this);
                                    var fill = calculateFill(e, $(this).parents('.rating'));
                                    var rate = Math.ceil(fill / 100 * 5);
                                    var url = $(location).attr('href');
                                    setTimeout(function() {
                                        $.ajax({
                                            url: 'https://widgets.aff44.com/vote?save_rate=' + elem.parents('.a44-offer').attr('data-id') + '&rate=' + rate,
                                            dataType: 'jsonp',
                                        }).done(function(data) {
                                            if (data.status === 'success') {
                                                var new_rate = Number(data.new_rate);
                                                elem.parents('.a44-offer').find('.offer-rate').html(new_rate.toFixed(1));
                                                var vote_count = data.votes_count.toString();
                                                var last_char = vote_count.slice(-1);
                                                elem.parents('.a44-offer').find('.votes-count').html('(<b>' + data.votes_count + '</b> ' + (last_char == '1' ? (typeof tr['vote'] !== 'undefined' ? tr['vote'] : 'vote') : (['2', '3', '4'].includes(last_char) ? (typeof tr['votes'] !== 'undefined' ? tr['votes'] : 'votes') : (typeof tr['votes2'] !== 'undefined' ? tr['votes2'] : 'votes2'))) + ')');
                                                //console.log((new_rate.toFixed(1) / 5 * 100));
                                                elem.parents('.a44-offer').find('.rate').css('width', (new_rate.toFixed(1) / 5 * 100) + '%')
                                            }
                                        });
                                    }, Math.random() * 300);


                                  })
                                })

                                // // STARS CLICK - START
                                // $('.rate').on('click', function(e) {
                                //     // const elem = $(this);
                                //     // const fill = calculateFill(e, $(this).parents('.rating'));
                                //     // const rate = Math.ceil(fill / 100 * 5);
                                //     setTimeout(function() {
                                //         $.ajax({
                                //             url: 'https://widgets.aff44.com/vote?save_rate=' + elem.parents('.a44-offer').attr('data-id') + '&rate=' + rate,
                                //             dataType: 'jsonp',
                                //         }).done(function(data) {
                                //             if (data.status === 'success') {
                                //                 const new_rate = Number(data.new_rate);
                                //                 elem.parents('.a44-offer').find('.offer-rate').html(new_rate.toFixed(1));
                                //                 const vote_count = data.votes_count.toString();
                                //                 const last_char = vote_count.slice(-1);
                                //                 elem.parents('.a44-offer').find('.votes-count').html('(<b>' + data.votes_count + '</b> ' + (last_char == '1' ? (typeof tr['vote'] !== 'undefined' ? tr['vote'] : 'vote') : (['2', '3', '4'].includes(last_char) ? (typeof tr['votes'] !== 'undefined' ? tr['votes'] : 'votes') : (typeof tr['votes2'] !== 'undefined' ? tr['votes2'] : 'votes2'))) + ')');
                                //                 elem.parents('.a44-offer').find('.rate').css('width', (new_rate.toFixed(1) / 5 * 100) + '%')
                                //             }
                                //         });
                                //     }, Math.random() * 300);

                                // });
                                // // STARS CLICK - END

                               
                                function calculateFill(e, container) {


                                   var startCoord = container.offset().left;
                                  var endCoord = container.offset().left + container.width();
                                  var cursorPosX = e.pageX;
                                  var relativeWidth = endCoord - startCoord;
                                  var relativeCursorPosX = cursorPosX - startCoord;
                                  var percentFilled = relativeCursorPosX / relativeWidth * 100;
                                  // console.log(startCoord,endCoord, cursorPosX,relativeWidth,relativeCursorPosX,percentFilled)
                                  return percentFilled;


                                    // const startCoord = container.offsetLeft ;
                                    // const endCoord = container.offsetLeft + container.clientWidth;
                                    // const cursorPosX = e.pageX;
                                    // const relativeWidth = endCoord - startCoord;
                                    // const relativeCursorPosX = cursorPosX - startCoord;
                                    // const percentFilled = relativeCursorPosX / relativeWidth * 100;
                                    // console.log(container.offsetLef, endCoord, cursorPosX, relativeWidth, relativeCursorPosX, percentFilled)
                                    // return percentFilled;
                                }

                                function round(number, increment, offset) {
                                    return Math.ceil((number - offset) / increment) * increment + offset;
                                }
    }
    /* eslint-enable */
      return {
          offers
      };
  },
  
};


</script>

<style scoped>
</style>