<template>

    {{filteredOffers.length}}
    <div class="a44-offers" v-for="offer in filteredOffers" :key="offer.id">
   
      <div class='a44-offer pl promo' :data-id="offer.id" data-costs=''
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
  const communications = computed(()=>store.state.communications);

        
  const filteredOffers = computed(() => store.getters.filteredOffers());

  function alerts(){

    const $alert = $('<div />').addClass('a44-alert').html(typeof communications.value['No offers matching criteria'] !== 'undefined' ? communications.value['No offers matching criteria'] : 'No offers matching criteria').hide();
    const $promo = $('<div />').addClass('a44-promo').html(typeof communications.value['We also recommend loans with other parameters'] !== 'undefined' ? communications.value['We also recommend loans with other parameters'] : 'We also recommend loans with other parameters').hide();
    // const $freeAmount = $('[id^="#chck-free-amount-"');
    // let $category = 1; 
    //   if ($category == 1)
    // $freeAmount.change(filter);
    // else
    // $freeAmount.parent().remove();
    $alert.insertBefore($(".layout").children().last());
    $promo.insertBefore('.costs-info');
    filteredOffers.value.length > 0 ? $alert.hide(): $alert.show();

    if (filteredOffers.value.length <= 3) {
        if ($('.a44-offer.promo').length) {
            $('.a44-offer.promo').each(function() {
                if ($(this).css('display') == 'none')
                    $(this).insertAfter($promo).show();
            });
            $promo.show();
        }
    } else {
        $promo.hide();
    }
    const $sliderAmount = $('.amount-container input.costslider');
    const $sliderPeriod = $('.period-container input.costslider');

    const amount = parseInt($sliderAmount.val());
    const period = parseInt($sliderPeriod.val());

    store.commit("updateFilteres", { period, amount });

  }
  
  onMounted(()=>{
    // let tr = $('.translations').val(JSON.stringify(communications.value));
    // console.log(tr) 
    // rating(tr)
    // rating(communications.value)
    setTimeout(()=>{
        $('.rating').on('mousemove', ratingHover);
        $('.rating').on('mouseleave', ratingLeave);
        $(".rate").on('click', ratingClick)
    },2200)
    
     
  })

  onUpdated( () => {
    // let tr = $('.translations').val(JSON.stringify(communications.value));  
    // rating(tr)
    alerts()
  })
      
    

    // function rating(tr){    
        //  
    // }
    function ratingClick(e){
          let tr = $('.translations').val(JSON.stringify(communications.value));

        const elem = $(this);
            const fill = calculateFill(e, $(this).parents('.rating'));
            const rate = Math.ceil(fill / 100 * 5);
            setTimeout(function() {
                $.ajax({
                    url: 'https://widgets.aff44.com/vote?save_rate=' + elem.parents('.a44-offer').attr('data-id') + '&rate=' + rate,
                    dataType: 'jsonp',
                }).done(function(data) {
                    if (data.status === 'success') {
                        const new_rate = Number(data.new_rate);
                        elem.parents('.a44-offer').find('.offer-rate').html(new_rate.toFixed(1));
                        const vote_count = data.votes_count.toString();
                        const last_char = vote_count.slice(-1);
                        elem.parents('.a44-offer').find('.votes-count').html('(<b>' + data.votes_count + '</b> ' + (last_char == '1' ? (typeof tr['vote'] !== 'undefined' ? tr['vote'] : 'vote') : (['2', '3', '4'].includes(last_char) ? (typeof tr['votes'] !== 'undefined' ? tr['votes'] : 'votes') : (typeof tr['votes2'] !== 'undefined' ? tr['votes2'] : 'głosów'))) + ')');
                        elem.parents('.a44-offer').find('.rate').css('width', (new_rate.toFixed(1) / 5 * 100) + '%')
                    }
                });
            }, Math.random() * 300);
    }

    function ratingHover(e){
        const fill = calculateFill(e, $(this));
        $(this).find('.rate').css('width', round(fill, 20, 0) + '%');
    }

    function ratingLeave(){
        $(this).find('.rate').css('width', $(this).parents('.a44-offer').find('.offer-rate').html() / 5 * 100 + '%');
    }
    function calculateFill(e, container) {
      const startCoord = container.offset().left;
      const endCoord = container.offset().left + container.width();
      const cursorPosX = e.pageX;
      const relativeWidth = endCoord - startCoord;
      const relativeCursorPosX = cursorPosX - startCoord;
      const percentFilled = relativeCursorPosX / relativeWidth * 100;
      return percentFilled;
    }

    function round(number, increment, offset) {
      return Math.ceil((number - offset) / increment) * increment + offset;
    }
      return {
          filteredOffers
      };
  },
  
};


</script>

<style scoped>
</style>